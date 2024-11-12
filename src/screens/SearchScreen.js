import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { api } from "../services/api";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import PokemonCard from "../components/PokemonCard";

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load Pokemon types on component mount
  useEffect(() => {
    loadTypes();
    loadAllPokemon();
  }, []);

  // Filter Pokemon when search query or type changes
  useEffect(() => {
    filterPokemon();
  }, [searchQuery, selectedType, pokemon]);

  const loadTypes = async () => {
    try {
      const response = await api.getPokemonTypes();
      setTypes(response.results);
    } catch (error) {
      console.error("Error loading types:", error);
      setError("Failed to load Pokemon types");
    }
  };

  const loadAllPokemon = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load first 151 Pokemon for better performance
      const response = await api.getPokemonList(0, 151);

      // Fetch detailed information for each Pokemon
      const detailedPokemon = await Promise.all(
        response.results.map(async (item) => {
          const details = await api.getPokemonDetail(item.name);
          return details;
        })
      );

      setPokemon(detailedPokemon);
    } catch (error) {
      console.error("Error loading Pokemon:", error);
      setError("Failed to load Pokemon data");
    } finally {
      setLoading(false);
    }
  };

  const filterPokemon = () => {
    let filtered = [...pokemon];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (selectedType) {
      filtered = filtered.filter((p) =>
        p.types.some((t) => t.type.name === selectedType)
      );
    }

    setFilteredPokemon(filtered);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const navigateToDetail = (pokemon) => {
    navigation.navigate("Detail", { pokemon });
  };

  if (loading && !pokemon.length) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search by name..."
      />

      <FilterBar
        types={types}
        selectedType={selectedType}
        onSelectType={handleTypeSelect}
      />

      <FlatList
        data={filteredPokemon}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} onPress={navigateToDetail} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No Pokemon found matching your criteria
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

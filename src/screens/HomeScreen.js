// src/screens/HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { api } from "../services/api";
import PokemonCard from "../components/PokemonCard";
// import SearchBar from "../components/SearchBar";

export default function HomeScreen({ navigation }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async (loadMore = false) => {
    if (loading) return;

    try {
      setLoading(true);
      const currentOffset = loadMore ? offset : 0;
      const response = await api.getPokemonList(currentOffset);

      // Fetch detailed information for each Pokemon
      const detailedPokemon = await Promise.all(
        response.results.map(async (item) => {
          const details = await api.getPokemonDetail(item.name);
          return details;
        })
      );

      if (loadMore) {
        setPokemon([...pokemon, ...detailedPokemon]);
        setOffset(currentOffset + 20);
      } else {
        setPokemon(detailedPokemon);
        setOffset(20);
      }
    } catch (error) {
      console.error("Error loading Pokemon:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadPokemon();
  };

  const handleLoadMore = () => {
    loadPokemon(true);
  };

  const navigateToDetail = (pokemon) => {
    navigation.navigate("Detail", { pokemon });
  };

  const navigateToSearch = () => {
    navigation.navigate("Search");
  };

  const navigateToFavorites = () => {
    navigation.navigate("Favorites");
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={navigateToFavorites}
      >
        <Text style={styles.headerButtonText}>Favorites ★</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerButton} onPress={navigateToSearch}>
        <Text style={styles.headerButtonText}>Search 🔍</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={pokemon}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} onPress={navigateToDetail} />
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={() =>
          loading && <ActivityIndicator style={styles.loader} size="large" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
  },
  headerButtonText: {
    fontWeight: "bold",
  },
  loader: {
    padding: 20,
  },
});

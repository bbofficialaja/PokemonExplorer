// src/screens/DetailScreen.js
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useFavorites } from "../contexts/FavoriteContext";

const { width } = Dimensions.get("window");

export default function DetailScreen({ route }) {
  const { pokemon } = route.params;
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const toggleFavorite = () => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  const renderTypes = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Types</Text>
      <View style={styles.typeContainer}>
        {pokemon.types.map((type, index) => (
          <View key={index} style={styles.typeBox}>
            <Text style={styles.typeText}>{type.type.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Stats</Text>
      {pokemon.stats.map((stat, index) => (
        <View key={index} style={styles.statRow}>
          <Text style={styles.statName}>
            {stat.stat.name.replace("-", " ").toUpperCase()}
          </Text>
          <View style={styles.statBarContainer}>
            <View
              style={[
                styles.statBar,
                { width: `${(stat.base_stat / 255) * 100}%` },
              ]}
            />
            <Text style={styles.statValue}>{stat.base_stat}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAbilities = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Abilities</Text>
      <View style={styles.abilityContainer}>
        {pokemon.abilities.map((ability, index) => (
          <View key={index} style={styles.abilityBox}>
            <Text style={styles.abilityText}>
              {ability.ability.name.replace("-", " ")}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
          }}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Text style={styles.favoriteButtonText}>
            {isFavorite(pokemon.id)
              ? "★ Remove from Favorites"
              : "☆ Add to Favorites"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>

        <View style={styles.basicInfo}>
          <Text style={styles.infoText}>Height: {pokemon.height / 10}m</Text>
          <Text style={styles.infoText}>Weight: {pokemon.weight / 10}kg</Text>
        </View>

        {renderTypes()}
        {renderStats()}
        {renderAbilities()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: "contain",
  },
  favoriteButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  favoriteButtonText: {
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  basicInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  typeBox: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 15,
    margin: 5,
  },
  typeText: {
    color: "white",
    fontWeight: "bold",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statName: {
    width: 120,
    fontSize: 12,
    fontWeight: "bold",
  },
  statBarContainer: {
    flex: 1,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  statBar: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#2196F3",
  },
  statValue: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  abilityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  abilityBox: {
    backgroundColor: "#9C27B0",
    padding: 8,
    borderRadius: 15,
    margin: 5,
  },
  abilityText: {
    color: "white",
    fontWeight: "bold",
  },
});

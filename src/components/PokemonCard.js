// src/components/PokemonCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useFavorites } from "../contexts/FavoriteContext";

export default function PokemonCard({ pokemon, onPress }) {
  const { isFavorite } = useFavorites();

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(pokemon)}>
      <Image
        style={styles.image}
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
        }}
      />
      <View style={styles.info}>
        <Text style={styles.name}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        {pokemon.types && (
          <View style={styles.typeContainer}>
            {pokemon.types.map((type, index) => (
              <Text key={index} style={styles.type}>
                {type.type.name}
              </Text>
            ))}
          </View>
        )}
        {isFavorite(pokemon.id) && <Text style={styles.favorite}>★</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 8,
    flexDirection: "row",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  type: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  favorite: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "gold",
    fontSize: 24,
  },
});

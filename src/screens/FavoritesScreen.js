// src/screens/FavoritesScreen.js
import React from "react";
import { View, FlatList, Text, StyleSheet, Animated } from "react-native";
import { useFavorites } from "../contexts/FavoriteContext";
import PokemonCard from "../components/PokemonCard";

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();

  const navigateToDetail = (pokemon) => {
    navigation.navigate("Detail", { pokemon });
  };

  if (!favorites.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Favorites Yet!</Text>
        <Text style={styles.emptyText}>
          Start adding Pokemon to your favorites by tapping the star icon on
          their details page.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <Animated.View>
            <PokemonCard pokemon={item} onPress={navigateToDetail} />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
});

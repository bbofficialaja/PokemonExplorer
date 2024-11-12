import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const TYPE_COLORS = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export default function FilterBar({ types, selectedType, onSelectType }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[styles.typeButton, !selectedType && styles.selectedType]}
          onPress={() => onSelectType(null)}
        >
          <Text style={styles.typeText}>All</Text>
        </TouchableOpacity>

        {types.map((type) => (
          <TouchableOpacity
            key={type.name}
            style={[
              styles.typeButton,
              { backgroundColor: TYPE_COLORS[type.name] || "#999" },
              selectedType === type.name && styles.selectedType,
            ]}
            onPress={() => onSelectType(type.name)}
          >
            <Text style={styles.typeText}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  typeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
  },
  selectedType: {
    borderWidth: 2,
    borderColor: "#000",
  },
  typeText: {
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

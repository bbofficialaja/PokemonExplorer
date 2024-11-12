// src/contexts/FavoriteContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from storage on app start
  useEffect(() => {
    loadFavorites();
  }, []);

  // Load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  // Save favorites to AsyncStorage
  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  // Add pokemon to favorites
  const addFavorite = async (pokemon) => {
    const newFavorites = [...favorites, pokemon];
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  // Remove pokemon from favorites
  const removeFavorite = async (pokemonId) => {
    const newFavorites = favorites.filter(
      (pokemon) => pokemon.id !== pokemonId
    );
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  // Check if pokemon is in favorites
  const isFavorite = (pokemonId) => {
    return favorites.some((pokemon) => pokemon.id === pokemonId);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

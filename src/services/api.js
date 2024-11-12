// src/services/api.js
const BASE_URL = "https://pokeapi.co/api/v2";
export const api = {
  // Get Pokemon list with pagination
  getPokemonList: async (offset = 0, limit = 20) => {
    try {
      const response = await fetch(
        `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
      throw error;
    }
  },

  // Get Pokemon details by name or ID
  getPokemonDetail: async (nameOrId) => {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching Pokemon detail:", error);
      throw error;
    }
  },

  // Get Pokemon types for filtering
  getPokemonTypes: async () => {
    try {
      const response = await fetch(`${BASE_URL}/type`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching Pokemon types:", error);
      throw error;
    }
  },
};

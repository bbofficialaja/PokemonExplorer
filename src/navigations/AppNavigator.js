// src/navigation/AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  DetailScreen,
  SearchScreen,
  FavoritesScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Pokemon Explorer" }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({
          title: route.params?.pokemon?.name?.toUpperCase() || "Pokemon Detail",
        })}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search Pokemon" }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "My Favorites" }}
      />
    </Stack.Navigator>
  );
}

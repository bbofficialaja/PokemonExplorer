// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { FavoriteProvider } from "./src/contexts/FavoriteContext";
import AppNavigator from "./src/navigations/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <FavoriteProvider>
        <AppNavigator />
      </FavoriteProvider>
    </NavigationContainer>
  );
}

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import React from "react";
import { useAssets } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";

export default function App() {
  const [assets] = useAssets([require("./profile.jpeg")]);
  const [loaded] = Font.useFonts(Ionicons.font);

  if (!assets || !loaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}

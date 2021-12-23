import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Asset, useAssets } from "expo-asset";
import { Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [assets] = useAssets([require("./profile.jpeg")]);
  const [loaded] = Font.useFonts(Ionicons.font);

  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return <Text>Hello World</Text>;
}

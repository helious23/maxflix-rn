import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Movies = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    onPress={() => navigate("Stack", { screen: "Two" })}
  >
    <Text>Movies</Text>
  </TouchableOpacity>
);

export default Movies;

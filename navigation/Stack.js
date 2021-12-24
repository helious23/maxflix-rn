import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";
import colors from "../colors";

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>Go to Two</Text>
  </TouchableOpacity>
);

const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Go to Three</Text>
  </TouchableOpacity>
);

const ScreenThree = ({ navigation: { setOptions } }) => (
  <TouchableOpacity onPress={() => setOptions({ title: "Hello" })}>
    <Text>Change Title</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: colors.ORANGE,
      animation: "slide_from_right",
      presentation: "modal",
    }}
  >
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} options={{}} />
  </NativeStack.Navigator>
);

export default Stack;

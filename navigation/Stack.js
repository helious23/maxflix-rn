import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../colors";
import { Detail } from "../screens/Detail";

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: colors.ORANGE,
      animation: "slide_from_right",
    }}
  >
    <NativeStack.Screen name="Detail" component={Detail} />
  </NativeStack.Navigator>
);
export default Stack;

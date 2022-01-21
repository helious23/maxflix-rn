import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Detail } from "../screens/Detail";
import { ThemeConsumer } from "styled-components";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <NativeStack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,

            headerStyle: {
              backgroundColor: theme.mainBgColor,
            },
            headerTitleStyle: {
              color: theme.textColor,
            },
            animation: "slide_from_right",
          }}
        >
          <NativeStack.Screen name="Detail" component={Detail} />
        </NativeStack.Navigator>
      )}
    </ThemeConsumer>
  );
};
export default Stack;

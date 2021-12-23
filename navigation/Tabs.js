import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import colors from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? colors.NAVY : "white",
        },
        tabBarActiveTintColor: isDark ? colors.ORANGE : colors.NAVY,
        tabBarInactiveTintColor: isDark ? colors.DARK_GREY : colors.LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? colors.NAVY : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : colors.NAVY,
        },
      }}
    >
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="TV" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;

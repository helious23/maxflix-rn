import React from "react";
import { Ionicons } from "@expo/vector-icons";
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
      sceneContainerStyle={{
        backgroundColor: isDark ? colors.NAVY : "white",
      }}
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
        tabBarLabelStyle: {
          marginBottom: 3,
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={"film-outline"}
                color={color}
                size={focused ? 29 : size}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={"tv-outline"}
              color={color}
              size={focused ? 29 : size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={focused ? 29 : size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { ThemeConsumer } from "styled-components";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <Tab.Navigator
          // initialRouteName="Search"
          sceneContainerStyle={{
            backgroundColor: theme.mainBgColor,
          }}
          screenOptions={{
            tabBarStyle: {
              backgroundColor: theme.mainBgColor,
            },
            // headerShadowVisible: false,
            tabBarActiveTintColor: theme.tabBarLableColor,
            tabBarInactiveTintColor: theme.tabBarInactiveColor,
            headerStyle: {
              backgroundColor: theme.mainBgColor,
            },
            headerTitleStyle: {
              color: theme.textColor,
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
      )}
    </ThemeConsumer>
  );
};

export default Tabs;

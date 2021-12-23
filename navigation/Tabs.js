import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="TV"
    screenOptions={{
      tabBarLabelPosition: "below-icon",
      tabBarActiveTintColor: "orange",
      tabBarInactiveTintColor: "blue",
      tabBarActiveBackgroundColor: "red",
      tabBarInactiveBackgroundColor: "yellow",
      tabBarStyle: { backgroundColor: "skyblue" },
    }}
  >
    <Tab.Screen
      name="Movies"
      component={Movies}
      options={{
        headerStyle: {
          backgroundColor: "skyblue",
        },
        headerTitleStyle: {
          color: "tomato",
        },
        headerRight: () => (
          <View>
            <Text>Hello</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="TV"
      component={Tv}
      options={{
        tabBarBadge: "new",
        tabBarBadgeStyle: {
          backgroundColor: "skyblue",
          color: "red",
        },
      }}
    />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;

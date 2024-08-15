import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import * as Screens from "../screens/index"; // Assuming this includes MainPage
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const BottomTab = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="homes"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          height: 100,
        },
      }}
    >
      <Tab.Screen
        name="Contacts"
        component={Screens.ContactsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pill" color={color} size={size} />
          ),
          tabBarLabel: "Medication"
        }}
      />
      <Tab.Screen
        name="Add"
        component={Screens.HomeScreen} // Assuming you have a screen for adding items
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
          ),
          tabBarLabel: "Add"
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={Screens.GpsScreen} // Assuming this is for a scheduling feature
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock-outline" color={color} size={size} />
          ),
          tabBarLabel: "Schedule"
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import React from "react";
import { PlantsProvider } from "@/context/PlantsContext";

const ProfileLayout: React.FC = () => {
  return (
    <PlantsProvider>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#565656",
          tabBarStyle: {
            backgroundColor: colors.primary,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="gardens"
          options={{
            title: "Gardens",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="nature" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="plants"
          options={{
            title: "Plants",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="local-florist" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="sensors"
          options={{
            title: "Sensors",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="sensors" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </PlantsProvider>
  );
};

export default ProfileLayout;

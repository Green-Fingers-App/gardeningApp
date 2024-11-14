import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import React from "react";
import { PlantsProvider } from "@/context/GardensAndPlantsContext";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { useAuth } from "@/context/AuthContext";

const ProfileLayout: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primaryDefault,
        },
        tabBarActiveTintColor: colors.bgLight,
        tabBarInactiveTintColor: colors.textPrimary,
        tabBarStyle: {
          backgroundColor: colors.primaryDefault,
        },
        headerRight: () => (
          <View>
            <Text>Hello, {user?.email}</Text>
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => router.push("/profilePage")}
            >
              <MaterialIcons
                name="account-circle"
                size={24}
                color={colors.bgLight}
              />
            </TouchableOpacity>
          </View>
        ),
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
  );
};

export default ProfileLayout;

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  headerText: {
    color: colors.bgLight,
    marginRight: 8,
    fontSize: 14,
  },
  profileButton: {
    marginLeft: 8,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -30 }],
  },
  addButton: {
    height: 60,
    width: 60,
    backgroundColor: colors.secondaryDefault,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});

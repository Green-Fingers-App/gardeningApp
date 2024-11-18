import { Tabs, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import React, { useEffect, useState } from "react";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { useAuth } from "@/context/AuthContext";
import AddMenu from "@/components/AddMenu";

const ProfileLayout: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { fetchPlants, fetchGardens, fetchAllPlants } = useGardensAndPlants();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    fetchPlants("a", "hallo");
    fetchGardens("a", "hello");
    fetchAllPlants();
  }, []);

  return (
    <>
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
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => toggleMenu()}>
          <MaterialIcons name={menuOpen ? "close" : "add"} size={45} />
        </TouchableOpacity>
      </View>
      {menuOpen && <AddMenu />}
    </>
  );
};

export default ProfileLayout;

const styles = StyleSheet.create({
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: "50%",
  },
  addButton: {
    height: 60,
    width: 60,
    backgroundColor: colors.secondaryDefault,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    transform: [{ translateX: -30 }],
    transitionDuration: "200ms",
  },
});

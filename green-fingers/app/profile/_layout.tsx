import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import AddMenu from "@/components/AddMenu";
import colors from "@/constants/colors";

const ProfileLayout: React.FC = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { fetchPlants, fetchGardens, fetchAllPlants } = useGardensAndPlants();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      fetchPlants();
      fetchGardens();
      fetchAllPlants();
      console.log("Fetching plants and gardens");
    }
  }, [isLoggedIn, user?.id]);

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
            <View style={styles.headerRight}>
              <Text style={styles.headerText}>
                {isLoggedIn ? `Hello, ${user?.email}` : "Welcome"}
              </Text>
              {isLoggedIn && (
                <TouchableOpacity
                  style={styles.profileButton}
                  onPress={() => router.push("/profilePage")}
                >
                  <MaterialIcons
                    name="account-circle"
                    size={24}
                    color={colors.bgLight}
                  />
                </TouchableOpacity>
              )}
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
      {isLoggedIn && (
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={toggleMenu}>
            <MaterialIcons name={menuOpen ? "close" : "add"} size={45} />
          </TouchableOpacity>
        </View>
      )}
      {menuOpen && <AddMenu />}
    </>
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

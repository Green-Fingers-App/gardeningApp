import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { useMoistureSensors } from "@/context/MoistureSensorContext";
import AddMenu from "@/components/AddMenu";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";

const ProfileLayout: React.FC = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { fetchUserGardens } = useGardensAndPlants();
  const { fetchAllSensors } = useMoistureSensors();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      fetchUserGardens();
      fetchAllSensors();
    }
  }, [isLoggedIn, user?.id]);

  return (
    <>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primaryDefault,
          },
          tabBarLabelStyle: textStyles.tabLabel,
          headerTitleStyle: [textStyles.h3, styles.title],
          headerTintColor: colors.bgLight,
          tabBarActiveTintColor: colors.bgLight,
          tabBarInactiveTintColor: colors.textPrimary,
          tabBarStyle: {
            backgroundColor: colors.primaryDefault,
          },
          headerRight: () => (
            <View style={styles.headerRight}>
              <Text style={[textStyles.bodyMedium, { color: colors.bgLight }]}>
                {isLoggedIn ? `Hello, ${user?.username}` : "Welcome"}
              </Text>
              {isLoggedIn && (
                <TouchableOpacity
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
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="calendar-month" color={color} size={size} />
            ),
          }}
        />
      </Tabs>


      {isLoggedIn && (
        <>
          {menuOpen && <AddMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />}

          <View style={styles.addButtonContainer} />

          <TouchableOpacity style={styles.addButton} onPress={toggleMenu}>
            <MaterialIcons
              name={menuOpen ? "close" : "add"}
              size={45}
              color={colors.primaryDefault}
            />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default ProfileLayout;

const styles = StyleSheet.create({
  title: {
    color: colors.bgLight,
  },
  headerRight: {
    flexDirection: "row",
    alignContent: "center",
    marginRight: 8,
    gap: 4,
  },
  addButtonContainer: {
    position: "absolute",
    height: 90,
    width: 90,
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -45 }, { translateY: -28 }],
    backgroundColor: colors.primaryDefault,
    borderRadius: 100,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  addButton: {
    position: "absolute",
    bottom: 60,
    left: "50%",
    transform: [{ translateX: -30 }],
    zIndex: 1000,
    height: 60,
    width: 60,
    backgroundColor: colors.bgLight,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 10,
  },
});

import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  const { fetchPlants } = useGardensAndPlants();

  useEffect(() => {
    const handleFetchAndNavigate = async () => {
      if (!user) {
        router.replace("/landingpage");
      } else {
        router.replace("/profile/home");
      }
    };

    if (!loading) {
      handleFetchAndNavigate();
    }
  }, [loading, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after a delay
    }, 1);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.pageContainer}>
        <ActivityIndicator size="large" />
      </View>
      </ImageBackground>
    );
  }

  return null;
};

export default Index;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
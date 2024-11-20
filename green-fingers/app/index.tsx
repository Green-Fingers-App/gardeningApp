import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
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
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
};

export default Index;

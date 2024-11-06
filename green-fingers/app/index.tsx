import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // This effect will fire every time 'user' changes
    console.log("User in useEffect:", user); // Log the user state

    if (!loading) {
      if (!user) {
        router.replace("/profile/home");
      } else {
        router.replace("/profile/home");
      }
    }
  }, [loading, user]); // Added loading to dependencies

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup the timer on unmount
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

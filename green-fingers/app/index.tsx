import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const index = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isAuthenticated = false;

  useEffect(() => {
    // Simulate checking the authentication status
    setTimeout(() => {
      setLoading(false);
      if (!isAuthenticated) {
        router.replace("/(auth)/login");
      } else {
        router.replace("/profile");
      }
    }, 1000); // Simulate a loading delay
  }, [isAuthenticated]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default index;

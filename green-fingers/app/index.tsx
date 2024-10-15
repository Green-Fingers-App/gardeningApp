import { View, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const index = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (user) {
        router.replace("/(auth)/login");
      } else {
        router.replace("/profile");
      }
    }, 1000);
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default index;

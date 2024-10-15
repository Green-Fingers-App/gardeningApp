import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";

const home = () => {
  const { user } = useAuth();
  return (
    <View>
      <Text>home</Text>
      <Text>{user?.username}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  background: {},
});

import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import Background from "@/components/Background";
const home = () => {
  const { user, logout } = useAuth();
  return (
    <View>
      <Background />
      <Text>home</Text>
      <Text>{user?.username}</Text>
      <Text>{user?.email}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  background: {},
});

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
const Home = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Button
        onPress={() => router.push("/profile/home/plantexplorer")}
        text="Plant Explorer"
      />
      <Button onPress={logout} text="Logout" type="secondary" />
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 16,
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

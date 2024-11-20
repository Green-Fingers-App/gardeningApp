import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
const Home = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/profile/home/plantexplorer")}
      >
        <Text style={styles.buttonText}>Explore Plants</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
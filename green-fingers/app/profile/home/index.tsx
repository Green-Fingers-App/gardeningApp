import { View, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import colors from "@/constants/colors";
const Home = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <Button
        onPress={() => router.push("/profile/home/plantexplorer")}
        text="Plant Explorer"
        type="primary"
        iconName="magnify"
      />
      <Button
        onPress={logout}
        text="Logout"
        type="secondary"
        iconName="logout"
      />
    </View>
    </ImageBackground>
  );
};
export default Home;
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
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

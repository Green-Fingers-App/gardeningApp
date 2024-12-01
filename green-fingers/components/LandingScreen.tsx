import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LandingSVG from "@/components/LandingSVG";
import Button from "./Button";
import { useRouter } from "expo-router";

const LandingScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <LandingSVG />
      <View style={styles.buttonContainer}>
        <Button
          text="Log In"
          type="primary"
          onPress={() => router.push("/login")}
        />
        <Button
          text="Sign Up"
          type="secondary"
          onPress={() => router.push("/signup")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cbddd1",
    zIndex: 20,
  },
  buttonContainer: {
    width: "80%",
    marginTop: 20,
    gap: 10,
    position: "absolute",
    bottom: "20%",
  },
});

export default LandingScreen;

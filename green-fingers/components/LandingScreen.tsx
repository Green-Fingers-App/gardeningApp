import React from "react";
import { View, StyleSheet } from "react-native";
import LandingSVG from '@/app/LandingSVG';
import Button from "./Button";

const LandingScreen = () => (
  <View style={styles.container}>
    <LandingSVG />
    <View style={styles.buttonContainer}>
      <Button
        text="Log In"
        type="primary"
        onPress={() => console.log("Log In Pressed")}
      />
      <Button
        text="Sign Up"
        type="secondary"
        onPress={() => console.log("Sign Up Pressed")}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cbddd1",
  },
  buttonContainer: {
    width: "80%", 
    marginTop: 20,
    gap: 10, 
  },
});

export default LandingScreen;

import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const LoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#457D58" />
    <Text style={styles.text}>Loading your experience...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default LoadingScreen;
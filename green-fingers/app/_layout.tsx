import React, { useState, useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { PlantsProvider } from "@/context/PlantsContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Font from "expo-font";
import LoadingScreen from "@/components/LoadingScreen";

const loadFonts = () => Font.loadAsync({
  "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  "Montserrat-Italic-Regular": require("../assets/fonts/Montserrat-Italic.ttf"),
  "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
  "Montserrat-Italic-Medium": require("../assets/fonts/Montserrat-MediumItalic.ttf"),
});

const RootLayout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setFontsLoaded(true))
      .catch(console.warn);
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PlantsProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
      </PlantsProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
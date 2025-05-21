import React, { useState, useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { PlantsProvider } from "@/context/GardensAndPlantsContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Font from "expo-font";
import LoadingScreen from "@/components/LoadingScreen";
import { CalendarProvider } from "@/context/CalendarContext";
import { ToastProvider } from "@/context/ToastContext";
import { MoistureSensorProvider } from "@/context/MoistureSensorContext";
import { SocketProvider } from "@/context/SocketProvider";


const loadFonts = () =>
  Font.loadAsync({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Italic-Regular": require("../assets/fonts/Montserrat-Italic.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Italic-Medium": require("../assets/fonts/Montserrat-MediumItalic.ttf"),
  });

const RootLayout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => {
        setFontsLoaded(true);
      })
      .catch(console.warn);
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <AuthProvider>
          <PlantsProvider>
            <CalendarProvider>
              <MoistureSensorProvider>
                <SocketProvider>
                  <Stack screenOptions={{ headerShown: false }} />
                </ SocketProvider>
              </MoistureSensorProvider>
            </CalendarProvider>
          </PlantsProvider>

        </AuthProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;

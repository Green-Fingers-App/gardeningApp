import { AuthProvider } from "@/context/AuthContext";
import { PlantsProvider } from "@/context/PlantsContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
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

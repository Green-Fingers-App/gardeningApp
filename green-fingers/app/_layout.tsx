import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
};

export default RootLayout;

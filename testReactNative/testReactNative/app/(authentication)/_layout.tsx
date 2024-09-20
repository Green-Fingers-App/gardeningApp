import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "Sign Up",
        }}
      />
      <Stack.Screen
        name="forgotpassword"
        options={{
          headerTitle: "Forgot Password",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;

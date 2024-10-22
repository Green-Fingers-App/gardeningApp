import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "@/components/Input";
import Button from "@/components/Button";
import colors from "@/constants/colors";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

interface InputValues {
  email: string;
  password: string;
}

type InputErrors = Partial<Record<keyof InputValues, string>>;

export default function App() {
  const [inputValues, setInputvalues] = useState<InputValues>({
    email: "",
    password: "",
  });

  const [inputErrors, setInputErrors] = useState<InputErrors>({});

  const handleChange = (name: keyof InputValues, value: string): void => {
    setInputvalues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleErrorMessage = (name: keyof InputValues, text?: string): void => {
    setInputErrors((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };

  // Validate inputs and log the user in
  const validate = async (): Promise<void> => {
    const { email, password } = inputValues;

    if (!email) {
      handleErrorMessage("email", "Please enter your email");
      return;
    }

    if (!password) {
      handleErrorMessage("password", "Please enter your password");
      return;
    }

    try {
      // Firebase login
      await signInWithEmailAndPassword(auth, email, password);
      
      // Redirect to profile/home on successful login
      router.replace("/profile/home");
    } catch (error) {
      // Handle Firebase login errors
      handleErrorMessage("email", "Invalid email or password");
      handleErrorMessage("password", "Invalid email or password");
      console.error("Login error:", error);
    }
  };

  // Log the current user to console for debugging
  useEffect(() => {
    const currentUser = auth.currentUser;
    console.log("Logged-in user:", currentUser);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.background, { width: "100%", height: "100%" }]}>
        <Text style={styles.title}>Green Fingers</Text>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Login</Text>
          <Input
            iconName="account"
            label="Username"
            placeholder="Enter your email"
            autoFocus={true}
            onChangeText={(text) => handleChange("email", text)}
            error={inputErrors.email}
            onFocus={() => handleErrorMessage("email", undefined)}
          />
          <Input
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(text) => handleChange("password", text)}
            error={inputErrors.password}
            onFocus={() => handleErrorMessage("password", undefined)}
          />
          <View style={styles.buttonContainer}>
            <Button text="Login" onPress={validate} iconName="login" />
            <Button
              text="Sign Up"
              onPress={() => router.push("/(auth)/signup")}
              bgColor={colors.backGroundSecondary}
              textColor="black"
            />
          </View>
          <Text>Forgot Password?</Text>
          <Link href={"/(auth)/forgotpassword"}>
            <Text>Click Here</Text>
          </Link>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
    gap: 12,
    opacity: 0.8,
  },
  contentTitle: {
    color: "#BCBCBC",
    fontSize: 26,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    fontSize: 55,
    color: "#ABABAB",
    position: "absolute",
    top: 30,
  },
});

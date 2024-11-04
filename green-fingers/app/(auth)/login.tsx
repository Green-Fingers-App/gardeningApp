import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "@/components/Input";
import Button from "@/components/Button";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/firebase/firebaseConfig";

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
      // await signInWithEmailAndPassword(auth, email, password);

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
    // const currentUser = auth.currentUser;
    // console.log("Logged-in user:", currentUser);
    console.log("Logged-in user");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <Text style={textStyles.h1}>WELCOME BACK</Text>
        <Text style={textStyles.h3}>Log in Now</Text>
        <View style={styles.content}>
          <View style={styles.loginFormContainer}>
            <View style={styles.inputFieldContainer}>
              <Input
                iconName="account"
                label="Email"
                placeholder="Enter your email"
                autoFocus
                onChangeText={(text) => handleChange("email", text)}
                error={inputErrors.email}
                onFocus={() => handleErrorMessage("email", undefined)}
              />
              <Input
                iconName="lock-outline"
                label="Password"
                placeholder="Enter your password"
                password
                secureTextEntry={true}
                onChangeText={(text) => handleChange("password", text)}
                error={inputErrors.password}
                onFocus={() => handleErrorMessage("password", undefined)}
              />
            </View>
            <Button 
              text="Login"
              onPress={validate}
              iconName="login"
            />
            <Button 
              type="tertiary" 
              text="Forgot Password?"
              onPress={() => router.push("/forgotpassword")}
            />
          </View>
          <View style={styles.signUpContainer}>
            <Text>Don't have an account?</Text>
            <Button
                type="secondary"
                text="Sign Up"
                onPress={() => router.push("/signup")}
            />
          </View>
        </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.bgLight,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 32,
    paddingBottom: 0,
    gap: 40,
    width: "100%",
    height: "100%",
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondaryDefault,
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 40,
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 320,
    gap: 48,
  },
  inputFieldContainer: {
    flexDirection: "column",
    gap: 8,
    width: "100%",
  },
  loginFormContainer: {
    flexDirection: "column",
    gap: 32,
    width: "100%",
  },
  signUpContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    width: "100%",
  }
});

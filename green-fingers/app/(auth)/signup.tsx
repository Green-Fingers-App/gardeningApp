import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext"; // Import useAuth
import Input from "@/components/Input";
import Button from "@/components/Button";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import { SignUpData } from "@/api/auth";
import { useToast } from "@/context/ToastContext";

interface InputValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type InputErrors = Partial<Record<keyof InputValues, string>>;

export default function Signup() {
  const { signup } = useAuth();
  const [inputValues, setInputValues] = useState<InputValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { showToast } = useToast();

  const [inputErrors, setInputErrors] = useState<InputErrors>({});

  const handleChange = (name: keyof InputValues, value: string): void => {
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleErrorMessage = (name: keyof InputValues, text?: string): void => {
    setInputErrors((prevState) => ({
      ...prevState,
      [name]: text,
    }))
  }

  const validateAndSignup = async () => {
    const { username, email, password, confirmPassword } = inputValues;
    if (!username) {
      handleErrorMessage("username", "Please enter a username");
      return;
    }

    if (!email) {
      handleErrorMessage("email", "Please enter a email");
      return;
    }

    if (password !== confirmPassword) {
      handleErrorMessage("password", "Passwords do not match!");
      handleErrorMessage("confirmPassword", "Passwords do not match!");
      return;
    }

    try {
      await signup(inputValues);
    } catch (error) {
      showToast('error', (error as Error).message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={textStyles.h1}>TAKE CARE OF YOUR PLANTS WITH EASE</Text>
      <Text style={textStyles.h3}>Sign Up Now</Text>
      <View style={styles.content}>
        <View style={styles.signUpFormContainer}>
          <View style={styles.inputFieldContainer}>
            <Input
              label="Username"
              placeholder="Username"
              iconName="account-outline"
              autoFocus
              onChangeText={(text) => handleChange("username", text)}
              error={inputErrors.username}
              onFocus={() => handleErrorMessage("username", undefined)}
              value={inputValues.username}
            />
            <Input
              label="Email"
              placeholder="Email"
              iconName="email-outline"
              onChangeText={(text) => handleChange("email", text)}
              error={inputErrors.email}
              onFocus={() => handleErrorMessage("email", undefined)}
              value={inputValues.email}
            />
            <Input
              label="Password"
              placeholder="Password"
              iconName="lock-outline"
              password={true}
              onChangeText={(text) => handleChange("password", text)}
              error={inputErrors.password}
              onFocus={() => handleErrorMessage("password", undefined)}
              value={inputValues.password}
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm Password"
              iconName="lock-outline"
              password={true}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              error={inputErrors.confirmPassword}
              onFocus={() => handleErrorMessage("confirmPassword", undefined)}
              value={inputValues.confirmPassword}
            />
          </View>
          <Button
            text="Sign Up"
            onPress={validateAndSignup}
            style={{ width: "100%" }}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text>Already have an account?</Text>
          <Button
            text="Login"
            type="secondary"
            onPress={() => router.push("/login")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  signUpFormContainer: {
    flexDirection: "column",
    gap: 32,
    width: "100%",
  },
  loginContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    width: "100%",
  },
});

import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext"; // Import useAuth
import Input from "@/components/Input";
import Button from "@/components/Button";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import { SignUpData } from "@/api/auth";

const Signup = () => {
  const { signup, authError } = useAuth();
  const [inputValues, setInputValues] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [error, setError] = useState<string | null>(null);

  type InputFieldName = keyof typeof inputValues;

  const handleChange = (name: InputFieldName, value: string): void => {
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateAndSignup = async () => {
    const { email, password, confirmPassword, username } = inputValues;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError(null);
    await signup({ email, password, username } as SignUpData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={textStyles.h1}>TAKE CARE OF YOUR PLANTS WITH EASE</Text>
      <Text style={textStyles.h3}>Sign Up Now</Text>
      <View style={styles.content}>
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        {authError && <Text style={{ color: "red" }}>{authError}</Text>}
        <View style={styles.signUpFormContainer}>
          <View style={styles.inputFieldContainer}>
            <Input
              label="Username"
              placeholder="Username"
              iconName="account-outline"
              onChangeText={(text) => handleChange("username", text)}
              value={inputValues.username}
            />
            <Input
              label="Email"
              placeholder="Email"
              iconName="email-outline"
              onChangeText={(text) => handleChange("email", text)}
              value={inputValues.email}
            />
            <Input
              label="Password"
              placeholder="Password"
              iconName="lock-outline"
              password={true}
              onChangeText={(text) => handleChange("password", text)}
              value={inputValues.password}
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm Password"
              iconName="lock-outline"
              password={true}
              onChangeText={(text) => handleChange("confirmPassword", text)}
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

export default Signup;

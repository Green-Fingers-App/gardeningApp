import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "../../components/Input";
import { useAuth } from "@/context/AuthContext";

export default function App() {
  const [inputValues, setInputvalues] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  type InputFieldName = keyof typeof inputValues;

  const [inputErrors, setInputErrors] = useState<{
    [key in InputFieldName]?: string;
  }>({});

  const { login, user } = useAuth();

  const handleChange = (name: InputFieldName, value: string): void => {
    setInputvalues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleErrorMessage = (name: InputFieldName, text?: string): void => {
    setInputErrors((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };

  const validate = async (): Promise<void> => {
    if (!inputValues.email) {
      handleErrorMessage("email", "Please enter your email");
      return;
    }

    if (!inputValues.password) {
      handleErrorMessage("password", "Please enter your password");
      return;
    }

    try {
      const response = await login(inputValues.email, inputValues.password);
      router.replace("/profile/home");
    } catch (error) {
      handleErrorMessage("email", "Invalid email or password");
      handleErrorMessage("password", "Invalid email or password");
      console.error("Login error:", error);
    }
  };

  useEffect(() => console.log("this is a use effect" + user), [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.background, { width: "100%", height: "100%" }]}>
        <Text style={styles.title}>Green Fingers</Text>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Login</Text>
          <Input
            iconName="account"
            label="Username"
            placeholder="Enter your username"
            autoFocus={true}
            onChangeText={(text) => handleChange("email", text)}
            error={inputErrors.email}
            onFocus={() => {
              handleErrorMessage("email", undefined);
            }}
          />
          <Input
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(text) => handleChange("password", text)}
            password
            error={inputErrors.password}
            onFocus={() => handleErrorMessage("password", undefined)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                validate();
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => router.push("/(auth)/signup")}
            >
              <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
            </TouchableOpacity>
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
  loginButton: {
    backgroundColor: "#A9A9A9",
    paddingVertical: 10,
    paddingHorizontal: 40,
    opacity: 1,
  },
  signUpButton: {
    backgroundColor: "#DEDEDE",
    paddingHorizontal: 40,
    paddingVertical: 10,
    opacity: 1,
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

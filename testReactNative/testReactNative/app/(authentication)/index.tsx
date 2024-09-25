import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import Input from "../components/Input";

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputValues.email,
        inputValues.password
      );
      console.log("User logged in:", userCredential.user);
      router.push("/home");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/login-background.jpg")}
        style={[styles.background, { width: "100%", height: "100%" }]}
        resizeMode="cover"
      >
        <Text style={styles.title}>Green Fingers</Text>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Login</Text>
          <Input
            label="Email"
            placeholder="Enter your email"
            autoFocus={true}
            onChangeText={(text) => handleChange("email", text)}
            error={inputErrors.email}
            onFocus={() => {
              handleErrorMessage("email", undefined);
            }}
          />
          <Input
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
              onPress={() => validate()}
            >
              <Text style={{ fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => router.push("/signup")}
            >
              <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text>Forgot Password?</Text>
          <Link href={"/forgotpassword"}>
            <Text>Click Here</Text>
          </Link>
        </View>
      </ImageBackground>
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
    backgroundColor: "#FA7070",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    opacity: 1,
  },
  signUpButton: {
    backgroundColor: "#fff3c7",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 8,
    opacity: 1,
  },
  contentTitle: {
    color: "#FA7070",
    fontSize: 26,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    fontSize: 55,
    color: "#AADBC5",
    position: "absolute",
    top: 30,
  },
});

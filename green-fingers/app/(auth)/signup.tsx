import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router, Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Input from "@/components/Input";
import Button from "@/components/Button";
import colors from "@/constants/colors";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

const Signup = () => {
  const [inputValues, setInputValues] = useState<{
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  type InputFieldName = keyof typeof inputValues;

  const handleChange = (name: InputFieldName, value: string): void => {
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    const { email, confirmEmail, password, confirmPassword } = inputValues;

    if (email !== confirmEmail) {
      setError("Emails do not match!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError(null);

    try {
      // Firebase signup
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/profile/home");
    } catch (error) {
      console.error("Error during signup: ", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.background, { width: "100%", height: "100%" }]}>
        <Text style={styles.title}>Green Fingers</Text>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Sign Up</Text>

          {/* Display error if any */}
          {error && <Text style={{ color: "red" }}>{error}</Text>}

          <Input
            label="Email"
            placeholder="Email"
            iconName="email-outline"
            onChangeText={(text) => handleChange("email", text)}
          />
          <Input
            label="Confirm Email"
            placeholder="Confirm Email"
            iconName="email-outline"
            onChangeText={(text) => handleChange("confirmEmail", text)}
          />
          <Input
            label="Password"
            placeholder="Password"
            iconName="lock-outline"
            password={true}
            onChangeText={(text) => handleChange("password", text)}
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            iconName="lock-outline"
            password={true}
            onChangeText={(text) => handleChange("confirmPassword", text)}
          />
          <Button
            text="Sign Up"
            onPress={handleSignup}
            bgColor={colors.secondary}
            style={{ width: "100%" }}
          />

          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Text>Login</Text>
          </TouchableOpacity>
          <Text>Forgot Password?</Text>
          <Link href={"/(auth)/forgotpassword"}>
            <Text>Click Here</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

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

export default Signup;

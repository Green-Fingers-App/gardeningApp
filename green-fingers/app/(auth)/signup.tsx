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

const Signup = () => {
  const [show, setShow] = useState<boolean>(false);
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

  type InputFieldName = keyof typeof inputValues;

  const handleSignup = async () => {
    const { email, confirmEmail, password, confirmPassword } = inputValues;

    // Check if emails match
    if (email !== confirmEmail) {
      alert("Emails do not match!");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.background, { width: "100%", height: "100%" }]}>
        <Text style={styles.title}>Green Fingers</Text>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Sign Up</Text>
          <Input label="Email" placeholder="Email" iconName="email-outline" />
          <Input label="Username" placeholder="Username" iconName="account" />
          <Input
            label="Password"
            placeholder="Password"
            iconName="lock-outline"
            password={true}
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            iconName="lock-outline"
            password={true}
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

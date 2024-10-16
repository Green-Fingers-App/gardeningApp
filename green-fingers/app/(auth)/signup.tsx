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

  const handleChange = (name: InputFieldName, value: string) => {
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleShow = () => {
    setShow(!show);
  };

  // Firebase signup function with email verification, email verify before login not implemented

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
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
            <Text>Sign Up</Text>
          </TouchableOpacity>

          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Text>Login</Text>
          </TouchableOpacity>
          <Text>Forgot Password?</Text>
          <Link href={"/(auth)forgotpassword"}>
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
  loginButton: {
    backgroundColor: "#FA7070",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    opacity: 1,
  },
  signUpButton: {
    backgroundColor: "#CCCCCC",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 8,
    opacity: 1,
    width: "100%",
    textAlign: "center",
  },
  inputField: {
    borderColor: "#fec7b4",
    borderWidth: 2,
    borderRadius: 4,
    width: "90%",
    paddingLeft: 5,
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

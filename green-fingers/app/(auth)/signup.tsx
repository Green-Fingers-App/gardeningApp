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
import textStyles from "@/constants/textStyles";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/firebase/firebaseConfig";

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
      // await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/profile/home");
    } catch (error) {
      console.error("Error during signup: ", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={textStyles.h1}>TAKE CARE OF YOUR PLANTS WITH EASE</Text>
      <Text style={textStyles.h3}>Sign Up Now</Text>
        <View style={styles.content}>
          {/* Display error if any */}
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          <View style={styles.signUpFormContainer}>
            <View style={styles.inputFieldContainer}>
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
            </View>
            <Button
              text="Sign Up"
              onPress={handleSignup}
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
  }
});

export default Signup;

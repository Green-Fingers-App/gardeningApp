import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { router, Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

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

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User account created:", userCredential.user);

      // Send email verification
      await sendEmailVerification(userCredential.user);
      alert("A verification email has been sent. Please check your inbox.");

      // Where do we send em?
      router.push("/home");

    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing up:", error.message);
        alert(error.message);
      } else {
        console.error("Error signing up:", error);
        alert("An error occurred while signing up. Please try again.");
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
          <Text style={styles.contentTitle}>Sign Up</Text>
          <TextInput
            placeholder="Email"
            style={styles.inputField}
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            placeholder="Confirm Email"
            style={styles.inputField}
            onChangeText={(text) => handleChange("confirmEmail", text)}
          />
          <View style={{ position: "relative", width: "90%" }}>
            <TextInput
              placeholder="Password"
              secureTextEntry={!show}
              style={[styles.inputField, { width: "100%" }]}
              onChangeText={(text) => handleChange("password", text)}
            />
            <Pressable
              onPress={toggleShow}
              style={{ position: "absolute", right: 4, alignSelf: "center" }}
            >
              {show ? (
                <Icon name="eye-slash" size={20} color={"#999"} />
              ) : (
                <Icon name="eye" size={20} color={"#999"} />
              )}
            </Pressable>
          </View>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!show}
            style={styles.inputField}
            onChangeText={(text) => handleChange("confirmPassword", text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignup}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text>Login</Text>
          </TouchableOpacity>
          <Text>Forgot Password?</Text>
          <Link href={"/forgotpassword"}>
            <Text>Click Here</Text>
          </Link>
        </View>
      </ImageBackground>
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
    backgroundColor: "#fff3c7",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 8,
    opacity: 1,
  },
  inputField: {
    borderColor: "#fec7b4",
    borderWidth: 2,
    borderRadius: 4,
    width: "90%",
    paddingLeft: 5,
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

export default Signup;

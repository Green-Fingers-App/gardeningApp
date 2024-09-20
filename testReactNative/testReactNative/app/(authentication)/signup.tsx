import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { router, Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

const signup = () => {
  const [show, setShow] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<{
    username: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
  }>({
    username: "",
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
            placeholder="Username"
            autoFocus={true}
            style={styles.inputField}
            onChangeText={(text) => handleChange("username", text)}
          />
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
            <TouchableOpacity style={styles.loginButton}>
              <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => router.push("/signup")}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
    flex: 1, // Ensure full screen
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  content: {
    alignItems: "center", // Centers content horizontally
    justifyContent: "center", // Centers content vertically
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

export default signup;

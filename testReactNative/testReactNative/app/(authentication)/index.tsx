import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [count, setCount] = useState<number>(0);

  const incrementCount = (): void => {
    setCount(count + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/login-background.jpg")} // Make sure this path is correct
        style={[styles.background, { width: "100%", height: "100%" }]} // Add width and height
        resizeMode="cover" // Optional: Ensures the image covers the whole background
      >
        <Text style={styles.title}>Green Fingers</Text>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Login</Text>
          <TextInput
            placeholder="Username"
            autoFocus={true}
            style={styles.inputField}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.inputField}
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

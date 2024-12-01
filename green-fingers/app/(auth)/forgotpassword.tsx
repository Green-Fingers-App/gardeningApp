import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Input from "../../components/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { router } from "expo-router";

const forgotpasswordPage = () => {
  const inputValues = {};

  type InputFieldNames = keyof typeof inputValues;

  return (
    <SafeAreaView style={styles.content}>
      <Text>
        Please enter your email, if you got an account with us, an email will be
        send to your email adress
      </Text>
      <Input
        label="Email"
        iconName="email-outline"
        placeholder="Enter your email"
      />
      <View style={styles.buttonsContainer}>
        <Button text="Send" iconName="send" type="primary" />
        <Button
          text="Return to Login"
          onPress={() => router.push("/(auth)/login")}
          iconName="arrow-left"
          type="secondary"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "column",
  },
  buttonsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 8,
  },
});

export default forgotpasswordPage;

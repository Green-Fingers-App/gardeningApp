import { View, Text } from "react-native";
import React from "react";
import Input from "../../components/Input";
import { SafeAreaView } from "react-native-safe-area-context";

const forgotpasswordPage = () => {
  const inputValues = {};

  type InputFieldNames = keyof typeof inputValues;

  return (
    <SafeAreaView>
      <Text>
        Please enter your email, if you got an account with us, an email will be
        send to your email adress
      </Text>
      <Input
        label="Email"
        iconName="email-outline"
        placeholder="Enter your email"
      />
    </SafeAreaView>
  );
};

export default forgotpasswordPage;

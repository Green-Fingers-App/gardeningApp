import { View, Text } from "react-native";
import React from "react";
import Input from "../components/Input";

const forgotpasswordPage = () => {
  const inputValues = {};

  type InputFieldNames = keyof typeof inputValues;

  return (
    <View>
      <Input
        label="Email"
        iconName="email-outline"
        placeholder="Enter your email"
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        iconName="lock-outline"
        password
      />
    </View>
  );
};

export default forgotpasswordPage;

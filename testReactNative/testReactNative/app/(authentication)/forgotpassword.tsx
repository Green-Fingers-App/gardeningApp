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
    </View>
  );
};

export default forgotpasswordPage;

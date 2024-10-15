import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <View>
      <Text>index</Text>
      <Link href={"/profile/home"}>Go To User Page</Link>
    </View>
  );
};

export default index;

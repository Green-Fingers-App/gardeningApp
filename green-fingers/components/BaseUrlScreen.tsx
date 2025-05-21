import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useBaseUrl } from "@/context/BaseUrlContext";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import Input from "@/components/Input";
import Button from "@/components/Button";

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const BaseUrlScreen = () => {
  const [input, setInput] = useState("");
  const { updateBaseUrl } = useBaseUrl();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!isValidUrl(input)) {
      Alert.alert("Invalid URL", "Please enter a valid URL.");
      return;
    }
    await updateBaseUrl(input);
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={textStyles.h2}>🌿 Welcome to GreenFingers</Text>
        <Text style={[textStyles.body, styles.infoText]}>
          Please enter the backend URL to continue:
        </Text>

        <Input
          label="Backend URL"
          placeholder="Backend URL..."
          value={input}
          onChangeText={setInput}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Button text="Save and Continue" onPress={handleSubmit} style={styles.button} />
      </View>
    </View>
  );
};

export default BaseUrlScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    gap: 16,
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  infoText: {
    color: colors.textSecondary,
  },
  button: {
    marginTop: 12,
  },
});

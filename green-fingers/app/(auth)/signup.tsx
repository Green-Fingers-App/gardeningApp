import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/Input";
import Button from "@/components/Button";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import { useToast } from "@/context/ToastContext";
import useForm from "@/hooks/useForm";
import { signUpValidator } from "@/utils/validators";

export default function Signup() {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const { values, errors, handleChange, setErrors } = useForm(
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    signUpValidator
  );

  const handleSignUp = async () => {
    const updatedErrors = signUpValidator.validateAll(values);
    if (Object.keys(updatedErrors).length > 0) {
      setErrors(updatedErrors);
      return;
    }
    try {
      await signup(values);
    } catch (error) {
      showToast("error", (error as Error).message || "Sign up failed.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={textStyles.h1}>TAKE CARE OF YOUR PLANTS WITH EASE</Text>
      <Text style={textStyles.h3}>Sign Up Now</Text>
      <View style={styles.content}>
        <View style={styles.signUpFormContainer}>
          <View style={styles.inputFieldContainer}>
            <Input
              label="Username"
              placeholder="Username"
              iconName="account-outline"
              autoFocus
              onChangeText={(text) => {
                handleChange("username", text);
              }}
              error={errors.username}
              onFocus={() => {
                setErrors({ ...errors, username: undefined });
              }}
              value={values.username}
            />
            <Input
              label="Email"
              placeholder="Email"
              iconName="email-outline"
              onChangeText={(text) => {
                handleChange("email", text);
              }}
              error={errors.email}
              onFocus={() => {
                setErrors({ ...errors, email: undefined });
              }}
              value={values.email}
            />
            <Input
              label="Password"
              placeholder="Password"
              iconName="lock-outline"
              password={true}
              onChangeText={(text) => {
                handleChange("password", text);
              }}
              error={errors.password}
              onFocus={() => {
                setErrors({ ...errors, password: undefined });
              }}
              value={values.password}
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm Password"
              iconName="lock-outline"
              password={true}
              onChangeText={(text) => {
                handleChange("confirmPassword", text);
              }}
              error={errors.confirmPassword}
              onFocus={() => {
                setErrors({ ...errors, confirmPassword: undefined });
              }}
              value={values.confirmPassword}
            />
          </View>
          <Button
            text="Sign Up"
            onPress={handleSignUp}
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
}

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
  },
});

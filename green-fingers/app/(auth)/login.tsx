import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/Input";
import Button from "@/components/Button";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import { useToast } from "@/context/ToastContext";
import useForm from "@/hooks/useForm";
import { loginValidator } from "@/utils/validators";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { handleChange, errors, values, setErrors } = useForm(
    {
      email: "",
      password: "",
    },
    loginValidator
  );

  const handleLogin = async () => {
    const updatedErrors = loginValidator.validateAll(values);
    if (Object.keys(updatedErrors).length > 0) {
      setErrors(updatedErrors);
      return;
    }
    try {
      await login(values);
    } catch (error) {
      showToast("error", (error as Error).message || "Login failed.");
    }
  };

  const { showToast } = useToast();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={textStyles.h1}>WELCOME BACK</Text>
      <Text style={textStyles.h3}>Log in Now</Text>
      <View style={styles.content}>
        <View style={styles.loginFormContainer}>
          <View style={styles.inputFieldContainer}>
            <Input
              iconName="account"
              label="Email"
              placeholder="Enter your email"
              onChangeText={(text) => {
                handleChange("email", text);
              }}
              error={errors.email}
              value={values.email}
              onFocus={() => {
                setErrors({ ...errors, email: undefined });
              }}
            />
            <Input
              iconName="lock-outline"
              label="Password"
              placeholder="Enter your password"
              password
              secureTextEntry={true}
              onChangeText={(text) => {
                handleChange("password", text);
              }}
              error={errors.password}
              value={values.password}
              onFocus={() => {
                setErrors({ ...errors, password: undefined });
              }}
            />
          </View>
          <Button
            text="Login"
            onPress={() => handleLogin()}
            iconName="login"
            testID="login-button"
          />
          <Button
            type="tertiary"
            text="Forgot Password?"
            onPress={() => {
              router.push("/forgotpassword");
            }}
          />
        </View>
        <View style={styles.signUpContainer}>
          <Text>Don't have an account?</Text>
          <Button
            type="secondary"
            text="Sign Up"
            onPress={() => {
              router.push("/signup");
            }}
            testID="signup-button"
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default LoginForm;

// Styles
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
  loginFormContainer: {
    flexDirection: "column",
    gap: 32,
    width: "100%",
  },
  signUpContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    width: "100%",
  },
});

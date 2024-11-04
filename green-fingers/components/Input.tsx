import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

type InputState = "default" | "focused" | "disabled" | "success" | "warning" | "error";

interface InputProps extends TextInputProps {
  label: string;
  iconName?: MaterialCommunityIconName;
  iconSize?: number;
  success?: string;
  warning?: string;
  error?: string;
  password?: boolean;
  onFocus?: () => void;
}


const Input: React.FC<InputProps> = ({
  label,
  iconName,
  iconSize = 16,
  success,
  warning,
  error,
  password = false,
  onFocus,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputState, setInputState] = useState<InputState>("default");
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  useEffect(() => {
    if (error) {
      setInputState("error");
    } else if (warning) {
      setInputState("warning");
    } else if (success) {
      setInputState("success");
    } else if (isFocused) {
      setInputState("focused");
    } else {
      setInputState("default");
    }
  }, [error, warning, success, isFocused]);

  const getInputStyles = () => {
    switch (inputState) {
      case "disabled":
        return {
          inputStyle: [styles.defaultInput, styles.disabledInput],
          textColor: colors.textMuted,
        };
      case "success":
        return {
          inputStyle: [styles.defaultInput, styles.successInput],
          textColor: colors.textSuccess,
        };
      case "warning":
        return {
          inputStyle: [styles.defaultInput, styles.warningInput],
          textColor: colors.textWarning,
        };
      case "error":
        return {
          inputStyle: [styles.defaultInput, styles.errorInput],
          textColor: colors.textError,
        };
      case "focused":
        return {
          inputStyle: [styles.defaultInput, styles.focusedInput],
          textColor: colors.textPrimary,
        };
      case "default":
      default:
        return {
          inputStyle: styles.defaultInput,
          textColor: colors.textSecondary,
        };
    }
  };

  const {inputStyle, textColor} = getInputStyles();
  
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputFieldContainer}>
        <Text style={[textStyles.label, { color: textColor }]}>{label}</Text>
        <View style={inputStyle}>
          {iconName && (
            <MaterialCommunityIcons
              name={iconName}
              size={iconSize}
              color={textColor}
            />
          )}
          <TextInput
            {...props}
            style={{ flex: 1, color: textColor }}
            onFocus={() => {
              onFocus?.();
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={password && hidePassword}
            autoCorrect={false}
          />
          {password && (
            <MaterialCommunityIcons
              name={hidePassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={colors.textSecondary}
              onPress={() => setHidePassword(!hidePassword)}
            />
          )}
        </View>
      </View>
      {success && <Text style={[textStyles.caption, { color: colors.textSuccess }]}>{success}</Text>}
      {warning && <Text style={[textStyles.caption, { color: colors.textWarning }]}>{warning}</Text>}
      {error && <Text style={[textStyles.caption, { color: colors.textError }]}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    gap: 0,
    width: "100%",
  },
  inputFieldContainer: {
    flexDirection: "column",
    gap: 2,
    width: "100%",
  },
  defaultInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderColor: colors.textSecondary,
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
  },
  focusedInput: {
    borderColor: colors.primaryDefault,
    borderWidth: 2,
  },
  disabledInput: {
    backgroundColor: colors.greyMedium,
    borderColor: colors.textMuted,
  },
  successInput: {
    backgroundColor: colors.bgSuccess,
    borderColor: colors.textSuccess,
    borderWidth: 1,
  },
  warningInput: {
    backgroundColor: colors.bgWarning,
    borderColor: colors.textWarning,
    borderWidth: 1,
  },
  errorInput: {
    backgroundColor: colors.bgError,
    borderColor: colors.textError,
    borderWidth: 1,
  },
});

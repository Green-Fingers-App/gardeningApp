import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacityProps,
  Pressable,
} from "react-native";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import React from "react";

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

type ButtonType = "primary" | "secondary" | "tertiary";
type ButtonState = "default" | "disabled";

interface ButtonProps extends TouchableOpacityProps {
  iconName?: MaterialCommunityIconName;
  text: string;
  iconSize?: number;
  type?: ButtonType;
  buttonState?: ButtonState;
}

const Button: React.FC<ButtonProps> = ({
  iconName,
  text,
  iconSize = 16,
  type = "primary",
  buttonState = "default",
  style,
  ...props
}) => {
  const getButtonStyles = () => {
    switch (type) {
      case "secondary":
        return {
          buttonStyle: [styles.secondaryButton, buttonState === "disabled" && styles.secondaryDisabled],
          pressedStyle: styles.secondaryPressed,
          textColor: buttonState === "disabled" ? colors.textMuted : colors.primaryDefault,
        };
      case "tertiary":
        return {
          buttonStyle: [styles.tertiaryButton, buttonState === "disabled" && styles.tertiaryDisabled],
          pressedStyle: { textColor: colors.primaryDark },
          textColor: buttonState === "disabled" ? colors.textMuted : colors.primaryDefault,
        };
      case "primary":
      default:
        return {
          buttonStyle: [styles.primaryButton, buttonState === "disabled" && styles.primaryDisabled],
          pressedStyle: styles.primaryPressed,
          textColor: buttonState === "disabled" ? colors.textMuted : colors.bgLight,
        };
    }
  };

  const { buttonStyle, pressedStyle, textColor } = getButtonStyles();

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        pressed && pressedStyle,
        style,
      ]}
      disabled={buttonState === "disabled"}
      {...props}
    >
      <View style={styles.content}>
        {iconName && (
          <MaterialCommunityIcons
            name={iconName}
            size={iconSize}
            color={textColor}
          />
        )}
        <Text style={[textStyles.button, { color: textColor }, type === "tertiary" && styles.tertiaryText]}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  primaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.primaryDefault,
    width: "100%",
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.secondaryDefault,
    borderColor: colors.primaryDefault,
    borderWidth: 1,
    width: "100%",
  },
  tertiaryButton: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  tertiaryText: {
    textDecorationLine: "underline",
  },
  primaryDisabled: {
    backgroundColor: colors.greyLight,
  },
  secondaryDisabled: {
    backgroundColor: colors.greyLight,
    borderColor: colors.textMuted,
  },
  tertiaryDisabled: {
    color: colors.textMuted,
  },
  primaryPressed: {
    backgroundColor: colors.primaryDark,
  },
  secondaryPressed: {
    backgroundColor: colors.secondaryDark,
  },
});

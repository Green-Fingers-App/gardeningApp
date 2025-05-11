import { ActivityIndicator, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;
type ButtonType = "primary" | "secondary" | "tertiary";
type ButtonState = "default" | "disabled" | "loading";

interface ButtonProps {
  iconName?: MaterialCommunityIconName;
  iconSize?: number;
  text: string;
  type?: ButtonType;
  buttonState?: ButtonState;
  onPress?: () => void;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  iconName,
  iconSize = 16,
  text,
  type = "primary",
  buttonState = "default",
  onPress,
  style,
}) => {
  const isDisabled = buttonState === "disabled" || buttonState === "loading";

  const getButtonStyle = (): ViewStyle => {
    switch (type) {
      case "secondary":
        return {
          ...styles.buttonBase,
          backgroundColor: colors.secondaryDefault,
          borderColor: colors.primaryDefault,
          borderWidth: 1,
        };
      case "tertiary":
        return {
          ...styles.buttonBase,
          backgroundColor: "transparent",
        };
      case "primary":
      default:
        return {
          ...styles.buttonBase,
          backgroundColor: colors.primaryDefault,
        };
    }
  };

  const getPressedStyle = (): ViewStyle => {
    if (type === "primary") return { backgroundColor: colors.primaryDark };
    if (type === "secondary") return { backgroundColor: colors.secondaryDark };
    return {}; // Tertiary has no background
  };

  const getTextColor = (): string => {
    if (buttonState === "disabled" || buttonState === "loading") return colors.textMuted;
    if (type === "primary") return colors.bgLight;
    return colors.primaryDefault;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        getButtonStyle(),
        pressed && getPressedStyle(),
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      onPress={onPress}
    >
      <View style={styles.content}>
        {buttonState === "loading" && (
          <ActivityIndicator
            size="small"
            color={getTextColor()}
            style={{ marginRight: 8 }}
          />
        )}
        {iconName && buttonState !== "loading" && (
          <MaterialCommunityIcons
            name={iconName}
            size={iconSize}
            color={getTextColor()}
          />
        )}
        <Text
          style={[
            textStyles.button,
            { color: getTextColor() },
            type === "tertiary" && styles.tertiaryText,
          ]}
        >
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
    justifyContent: "center",
    gap: 8,
  },
  buttonBase: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "100%",
  },
  disabled: {
    backgroundColor: colors.greyLight,
  },
  tertiaryText: {
    textDecorationLine: "underline",
  },
});

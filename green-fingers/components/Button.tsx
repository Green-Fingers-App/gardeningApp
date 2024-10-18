import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import colors from "@/constants/colors";
import React from "react";

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface ButtonProps extends TouchableOpacityProps {
  iconName?: MaterialCommunityIconName;
  text: string;
  iconSize?: number;
  iconColor?: string;
  textColor?: string;
  bgColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  iconName,
  text,
  iconSize = 24,
  iconColor = "#fff",
  textColor = "#fff",
  bgColor = colors.backGroundPrimary,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }, style]}
      {...props}
    >
      <View style={styles.content}>
        {iconName && (
          <MaterialCommunityIcons
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={[styles.icon, { marginRight: iconSize * 0.4 }]}
          />
        )}
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row", // Ensure layout direction
    alignItems: "center", // Center vertically
    justifyContent: "center", // Center horizontally
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

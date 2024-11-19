import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/constants/colors";

interface OptionsMenuProps {
  options: { label: string; onPress: () => void }[];
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ options }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        style={styles.iconButton}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
      {visible && (
        <View style={styles.menu}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                option.onPress();
                setVisible(false);
              }}
            >
              <Text style={styles.menuText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default OptionsMenu;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 8,
    top: 8,
    borderColor: colors.primaryDefault,
    borderWidth: 1,
  },
  iconButton: {
    padding: 8,
  },
  menu: {
    backgroundColor: colors.bgCard,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
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
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setVisible(false)}
        >
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
        </Pressable>
      </Modal>
    </View>
  );
};

export default OptionsMenu;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  iconButton: {
    padding: 8,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",

  },
  menu: {
    position: "absolute",
    top: 110,
    right: 24,
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
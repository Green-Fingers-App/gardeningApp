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
import textStyles from "@/constants/textStyles";
import colors from "@/constants/colors";

interface OptionMenuProps {
  options: { label: string; onPress: () => void }[];
}

const OptionMenu: React.FC<OptionMenuProps> = ({ options }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setVisible(!visible);
        }}
        style={styles.iconButton}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color={colors.primaryDefault}
        />
      </TouchableOpacity>
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => {
            setVisible(false);
          }}
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
                <Text style={[textStyles.h4, { color: colors.primaryDefault, textDecorationStyle: "solid", textDecorationLine: "underline" }]}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default OptionMenu;

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
    backgroundColor: colors.backDrop,
  },
  menu: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    top: 110,
    right: 24,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryDefault,
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
    paddingHorizontal: 12,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
});

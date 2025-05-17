import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";

interface DropDownOption {
  value: number;
  label: string;
}

interface DropDownProps {
  label: string;
  placeholder: string;
  options: DropDownOption[];
  onSelect: (value: number) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  label,
  placeholder,
  options,
  onSelect,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<DropDownOption | null>(
    null
  );
  const slideAnim = React.useRef(new Animated.Value(0)).current;


  const MAX_VISIBLE_ITEMS = 5;
  const ITEM_HEIGHT = 32;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animatedHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(options.length, MAX_VISIBLE_ITEMS) * ITEM_HEIGHT],
  });

  const handleSelect = (value: number) => {
    const selected = options.find((option) => option.value === value);
    if (selected) {
      setSelectedOption(selected);
      onSelect(value);
      toggleMenu();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[textStyles.label, styles.label]}>{label}</Text>
      <Pressable
        onPress={toggleMenu}
        style={[
          styles.inputContainer,
          menuOpen ? styles.focusedInput : styles.defaultInput,
        ]}
      >
        <Text style={[textStyles.body, styles.selectedText]}>
          {selectedOption?.label || placeholder}
        </Text>
        <MaterialCommunityIcons
          name={!menuOpen ? "menu-down" : "menu-up"}
          size={20}
          color={colors.textSecondary}
        />
      </Pressable>

      <Animated.View style={{ maxHeight: animatedHeight, overflow: "hidden", borderColor: colors.primaryDefault, borderWidth: 1, borderRadius: 8 }}>
        {menuOpen && (
          <FlatList
            data={options}
            keyExtractor={(item) => item.value.toString()}
            initialNumToRender={MAX_VISIBLE_ITEMS}
            getItemLayout={(_, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            style={{ maxHeight: MAX_VISIBLE_ITEMS * ITEM_HEIGHT }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  handleSelect(item.value);
                }}
                style={styles.optionContainer}
              >
                <Text style={[textStyles.body, styles.optionText]}>
                  {item.label}
                </Text>
              </Pressable>
            )}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 5,
    color: colors.textPrimary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  defaultInput: {
    borderColor: colors.textSecondary,
  },
  focusedInput: {
    borderColor: colors.primaryDefault,
  },
  selectedText: {
    flex: 1,
    color: colors.textPrimary,
  },
  optionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
    backgroundColor: colors.white,
  },
  optionText: {
    color: colors.textPrimary,
  },
});

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface InputProps extends TextInputProps {
  label: string;
  iconName?: MaterialCommunityIconName;
  error?: string;
  password?: boolean;
  onFocus?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  iconName,
  error,
  password,
  onFocus,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hidePassWord, setHidePassword] = useState<boolean>(true);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? "#AA1111" : isFocused ? "#99DBC5" : "#999999",
          },
        ]}
      >
        {iconName && (
          <MaterialCommunityIcons
            name={iconName}
            size={25}
            color="88B9A3"
            style={{ paddingRight: 15 }}
          />
        )}
        <TextInput
          {...props}
          style={{ flex: 1 }}
          onFocus={() => {
            if (onFocus) {
              onFocus();
            }
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          autoCorrect={false}
          secureTextEntry={password ? hidePassWord : false}
        />
        {password && (
          <MaterialCommunityIcons
            name={hidePassWord ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={"#88B9A3"}
            onPress={() => setHidePassword(!hidePassWord)}
          />
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#EEE",
    height: 55,
    borderWidth: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  error: {
    color: "#AA1111",
  },
  label: {
    color: "#999",
    fontSize: 14,
    marginVertical: 5,
  },
});

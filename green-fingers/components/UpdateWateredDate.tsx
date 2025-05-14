import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { ChangeEvent, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const UpdateWateredDate = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");

  const handleChange = (text: string) => {
    // Remove non-digit characters
    let cleaned = text.replace(/[^\d]/g, "");

    // Limit to 6 digits (DDMMYY)
    if (cleaned.length > 6) cleaned = cleaned.slice(0, 6);

    setDate((prev) => {
      const isAdding = cleaned.length > prev.replace(/[^\d]/g, "").length;

      let formatted = "";
      for (let i = 0; i < cleaned.length; i++) {
        formatted += cleaned[i];
        // Only insert '/' if typing forward
        if (isAdding && (i === 1 || i === 3) && i !== cleaned.length - 1) {
          formatted += "/";
        }
      }

      return formatted;
    });
  };

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        onPress={() => {
          setOpen(!open);
        }}
      >
        <MaterialCommunityIcons name="clock-edit-outline" size={20} />
      </TouchableOpacity>
      {open && (
        <View style={styles.menuContent}>
          <TextInput
            placeholder="DD/MM/YYYY"
            value={date}
            style={styles.input}
            onChangeText={handleChange}
          />
        </View>
      )}
    </View>
  );
};

export default UpdateWateredDate;

const styles = StyleSheet.create({
  menuContainer: {
    position: "relative",
    marginLeft: 10,
    zIndex: 10, // Ensure it's on top of other elements
  },
  menuContent: {
    position: "absolute",
    bottom: 25,
    right: -65, // Position below the icon
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android shadow
    width: 150,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
  },
});

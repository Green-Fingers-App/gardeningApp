import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { useToast } from "@/context/ToastContext";

interface UpdateWateredDateProps {
  plantId: number;
}

const UpdateWateredDate: React.FC<UpdateWateredDateProps> = ({ plantId }) => {
  const monthRef = useRef<TextInput>(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const { showToast } = useToast();

  const { singleUpdateWateredDate } = useGardensAndPlants();

  const handleChange = (key: keyof typeof date, text: string) => {
    let filtered = text.replace(/\D/g, "");

    if (key === "day" && filtered.length === 2) {
      monthRef.current?.focus();
    }

    if (key === "month" && filtered.length > 2) {
      filtered = filtered.substring(0, 2);
    }

    if (key === "month" && Number(filtered) > 12) {
      filtered = "12";
    }

    if (key === "year" && filtered.length > 4) {
      filtered = filtered.substring(0, 4);
    }

    const updatedDate = { ...date, [key]: Number(filtered) };
    setDate(updatedDate);
  };

  const handleFocus = (key: keyof typeof date) => {
    setDate({ ...date, [key]: "" });
  };

  const handleSave = async () => {
    const dateString = `${date.year}-${date.month}-${date.day}`;
    const error = await singleUpdateWateredDate(plantId, dateString);
    if (!error) {
      showToast("success", "Watering date updated.");
      setOpen(false);
      return;
    }
    showToast("error", `${error.error}`);
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
            placeholder="dd"
            value={date.day.toString()}
            style={[styles.input, { width: 25 }]}
            onChangeText={(text) => {
              handleChange("day", text);
            }}
            keyboardType="numeric"
            onFocus={() => {
              handleFocus("day");
            }}
          />
          <Text>/</Text>
          <TextInput
            ref={monthRef}
            placeholder="mm"
            keyboardType="numeric"
            style={[styles.input, { width: 25 }]}
            value={date.month.toString()}
            onChangeText={(text) => {
              handleChange("month", text);
            }}
            onFocus={() => {
              handleFocus("month");
            }}
          />
          <Text>/</Text>
          <TextInput
            placeholder="yyyy"
            keyboardType="numeric"
            style={[styles.input, { width: 50 }]}
            value={date.year.toString()}
            onChangeText={(text) => {
              handleChange("year", text);
            }}
            onFocus={() => {
              handleFocus("year");
            }}
          />
          <TouchableOpacity onPress={handleSave}>
            <MaterialCommunityIcons name={"check"} size={15} />
          </TouchableOpacity>
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
    zIndex: 800, // Ensure it's on top of other elements
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  input: {
    height: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 4,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
  },
});

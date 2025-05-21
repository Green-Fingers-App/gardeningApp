import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { AddGarden } from "@/types/models";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import colors from "@/constants/colors";

interface AddPlantOptionProps {
  setGardenChosen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPlantOption: React.FC<AddPlantOptionProps> = ({ setGardenChosen }) => {
  const { createGarden } = useGardensAndPlants();

  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleNameChange = (text: string) => setName(text);
  const handleLocationChange = (text: string) => setLocation(text);

  const isAddGardenDisabled = !name || !location;

  const { user } = useAuth();

  const handleAddGarden = () => {
    if (!name || !location || !user) return;

    const addGarden: AddGarden = {
      name,
      location,
      userId: user.id,
    };

    // Call the createPlant function to save to the database
    createGarden(addGarden);

    // Reset state after adding
    setGardenChosen(false);
    setName("");
    setLocation("");
  };

  return (
    <View style={[styles.menuOption, { gap: 8 }]}>
      <Input
        label="Name"
        placeholder="Name..."
        iconName="nature"
        value={name}
        onChangeText={handleNameChange}
      />
      <Input
        label="Location"
        placeholder="Location..."
        value={location}
        onChangeText={handleLocationChange}
      />
      <Button
        text="Add garden"
        type="primary"
        iconName="plus"
        onPress={handleAddGarden}
        buttonState={isAddGardenDisabled ? "disabled" : "default"}
      />
    </View>
  );
};

export default AddPlantOption;

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    position: "absolute",
    bottom: 70,
    width: "95%",
    margin: "2.5%",
    paddingBottom: 16,
  },
  optionContainer: {
    flexDirection: "column",
    gap: 8,
    padding: 8,
  },
  menuOption: {
    padding: 8,
    fontSize: 18,
    color: colors.textPrimary,
  },
});

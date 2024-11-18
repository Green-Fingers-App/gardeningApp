import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import Input from "./Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";
import DropDown from "./DropDown";
import PlantSearch from "./PlantSearch";
import { CatalogPlant } from "@/types/plantTypes";
import { AddPlant } from "@/types/models";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { usePlants } from "@/hooks/usePlants";

const AddMenu = () => {
  const { gardens } = useGardensAndPlants();
  const { createPlant } = usePlants();

  // Transform gardens into options for the dropdown
  const gardenOptions = gardens.map((garden) => ({
    value: garden.id,
    label: garden.location,
  }));

  const [plantChosen, setPlantChosen] = useState(false);
  const [nickName, setNickName] = useState<string>("");
  const [selectedGarden, setSelectedGarden] = useState<string>("");
  const [selectedPlant, setSelectedPlant] = useState<CatalogPlant | null>(null);

  // Handle toggling menus
  const togglePlantMenu = () => setPlantChosen(!plantChosen);

  // Handle updates to inputs
  const handlePlantSelection = (plant: CatalogPlant) => setSelectedPlant(plant);
  const handleNickNameChange = (text: string) => setNickName(text);
  const handleGardenSelect = (gardenId: string) => setSelectedGarden(gardenId);

  // Determine if the Add Plant button should be disabled
  const isAddPlantDisabled = !nickName || !selectedGarden || !selectedPlant;

  // Handle the "Add Plant" action
  const handleAddPlant = () => {
    if (!selectedPlant || !selectedGarden || !nickName) return;

    const addPlant: AddPlant = {
      nickName,
      garden_id: selectedGarden,
      catalogPlant_id: selectedPlant.id || "",
      name: selectedPlant.name,
      type: selectedPlant.type,
      water_frequency: selectedPlant.water_frequency,
      water_amount: selectedPlant.water_amount,
      temperature: selectedPlant.temperature,
      humidity: selectedPlant.humidity,
      light: selectedPlant.light,
      soil_type: selectedPlant.soil_type,
      fertilizer_type: selectedPlant.fertilizer_type,
      fertilizer_frequency: selectedPlant.fertilizer_frequency,
    };
    createPlant(addPlant);
    setPlantChosen(!plantChosen);
  };

  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuHeaderContainer}>
        <Text style={textStyles.h3}>
          {plantChosen ? (
            <Pressable onPress={() => setPlantChosen(false)}>
              <Text style={textStyles.h3}>
                <MaterialCommunityIcons name="arrow-left" size={20} /> Add Plant
              </Text>
            </Pressable>
          ) : (
            "Add"
          )}
        </Text>
      </View>
      {!plantChosen ? (
        <View style={styles.optionContainer}>
          <Button 
            text="Plant"
            iconName="flower"
            type="tertiary"
            onPress={togglePlantMenu}
          />
          <Button 
            text="Garden"
            iconName="nature"
            type="tertiary"
          />
        </View>
      ) : (
        <View style={[styles.menuOption, { gap: 8 }]}>
          <PlantSearch onSelectPlant={handlePlantSelection} />
          <Input
            label="Nickname"
            placeholder="Nickname..."
            iconName="flower"
            value={nickName}
            onChangeText={handleNickNameChange}
          />
          <DropDown
            label="Select a Garden"
            placeholder="Choose a garden..."
            options={gardenOptions}
            onSelect={handleGardenSelect}
          />
          <Button
            text="Add plant"
            type="primary"
            iconName="plus"
            onPress={handleAddPlant}
            buttonState={isAddPlantDisabled ? "disabled" : "default"}
          />
        </View>
      )}
    </View>
  );
};

export default AddMenu;

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
  menuHeaderContainer: {
    backgroundColor: colors.primaryDefault,
    width: "100%",
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.bgLight,
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
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import Input from "./Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";
import DropDown from "./DropDown";
import PlantSearch from "./PlantSearch";
import { CatalogPlant, AddUserPlant } from "@/types/models";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { useAuth } from "@/context/AuthContext";

const AddMenu = () => {
  const { gardens, addGarden } = useGardensAndPlants();
  const { createPlant } = usePlants();

  // Garden dropdown options
  const gardenOptions = gardens.map((garden) => ({
    value: garden.id,
    label: garden.location,
  }));

  const [menuMode, setMenuMode] = useState<"none" | "plant" | "garden">("none"); // Toggle between modes
  const [gardenName, setGardenName] = useState<string>("");
  const [gardenLocation, setGardenLocation] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [selectedGarden, setSelectedGarden] = useState<string>("");
  const [selectedPlant, setSelectedPlant] = useState<CatalogPlant | null>(null);

  // Handle switching between menus
  const toggleMenu = (mode: "none" | "plant" | "garden") => setMenuMode(mode);

  // Reset inputs
  const resetInputs = () => {
    setGardenName("");
    setGardenLocation("");
    setNickName("");
    setSelectedGarden("");
    setSelectedPlant(null);
    setMenuMode("none");
  };

  // Add Garden Logic
  const handleAddGarden = async () => {
    if (!gardenName.trim() || !gardenLocation.trim()) return;

    try {
      await addGarden(gardenName, gardenLocation);
      resetInputs();
    } catch (error) {
      console.error("Error adding garden:", error);
    }
  };

  // Add Plant Logic
  const handleAddPlant = async () => {
    if (!selectedPlant || !selectedGarden || !nickName.trim()) return;

    const addPlant: AddPlant = {
      nickName,
      garden_id: selectedGarden,
      catalogPlant_id: selectedPlant.id || "",
      userId: user?.id || -1,
      name: selectedPlant.name,
      blooming: selectedPlant.blooming,
      waterFrequency: selectedPlant.waterFrequency,
      harvest: selectedPlant.harvest,
      sunLight: selectedPlant.sunLight,
      temperature: selectedPlant.temperature,
      size: selectedPlant.size,
      fertilizerType: selectedPlant.fertilizerType,
      planting: selectedPlant.planting,
      wateredDate: "",
      plantedDate: "",
      feededDate: "",
      moistureLevel: "Optimal",
      sunlightLevel: "Optimal",
      harvested: false,
    };

    try {
      await createPlant(addPlant); // Save plant to Firestore
      resetInputs();
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  // Determine button states
  const isAddGardenDisabled = !gardenName.trim() || !gardenLocation.trim();
  const isAddPlantDisabled = !nickName || !selectedGarden || !selectedPlant;

  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuHeaderContainer}>
        <Text style={textStyles.h3}>
          {menuMode !== "none" ? (
            <Pressable onPress={() => toggleMenu("none")}>
              <Text style={textStyles.h3}>
                <MaterialCommunityIcons name="arrow-left" size={20} /> Add
              </Text>
            </Pressable>
          ) : (
            "Add"
          )}
        </Text>
      </View>

      {/* Main Menu */}
      {menuMode === "none" && (
        <View style={styles.optionContainer}>
          <Button
          <Button
            text="Plant"
            iconName="flower"
            type="tertiary"
            onPress={() => toggleMenu("plant")}
          />
          <Button
            text="Garden"
            iconName="nature"
            type="tertiary"
            onPress={() => toggleMenu("garden")}
          />
        </View>
      )}

      {/* Garden Menu */}
      {menuMode === "garden" && (
        <View style={[styles.menuOption, { gap: 8 }]}>
          <Input
            label="Garden Name"
            placeholder="Enter garden name..."
            iconName="nature"
            value={gardenName}
            onChangeText={setGardenName}
          />
          <Input
            label="Location"
            placeholder="Enter garden location..."
            iconName="map-marker"
            value={gardenLocation}
            onChangeText={setGardenLocation}
          />
          <Button
            text="Add Garden"
            type="primary"
            iconName="plus"
            onPress={handleAddGarden}
            buttonState={isAddGardenDisabled ? "disabled" : "default"}
          />
        </View>
      )}

      {/* Plant Menu */}
      {menuMode === "plant" && (
        <View style={[styles.menuOption, { gap: 8 }]}>
          <PlantSearch onSelectPlant={setSelectedPlant} />
          <Input
            label="Nickname"
            placeholder="Nickname..."
            iconName="flower"
            value={nickName}
            onChangeText={setNickName}
          />
          <DropDown
            label="Select a Garden"
            placeholder="Choose a garden..."
            options={gardenOptions}
            onSelect={setSelectedGarden}
          />
          <Button
            text="Add Plant"
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


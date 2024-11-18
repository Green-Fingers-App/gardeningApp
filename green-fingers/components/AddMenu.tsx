import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import Input from "./Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";
import DropDown from "./DropDown";
import PlantSearch from "./PlantSearch";
import { Plant } from "@/types/plantTypes";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";

const AddMenu = () => {
  const { gardens } = useGardensAndPlants();

  const gardenOptions = gardens.map((garden) => ({
    value: garden.id,
    label: garden.location,
  }));

  const [plantChosen, setPlantChosen] = useState(false);
  const [gardenChosen, setGardenChosen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  
  const toggleGardenMenu = () => {
    setGardenChosen(!gardenChosen);
  };

  const togglePlantMenu = () => {
    setPlantChosen(!plantChosen);
  };

  const handlePlantSelection = (plant: Plant) => {
    setSelectedPlant(plant);
  };

  const handleGardenSelect = (gardenId: string) => {
    console.log("Selected Garden ID:", gardenId);
  };

  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuHeaderContainer}>
        <Text style={styles.titleText}>
          {!plantChosen && !gardenChosen ? (
            "Add"
          ) : plantChosen ? (
            <Pressable onPress={() => setPlantChosen(!plantChosen)}>
              <Text style={styles.titleText}>
                <MaterialCommunityIcons name="arrow-left" size={20} /> Add Plant
              </Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => setGardenChosen(!gardenChosen)}>
              <Text style={styles.titleText}>
                <MaterialCommunityIcons name="arrow-left" size={20} /> Add
                Garden
              </Text>
            </Pressable>
          )}
        </Text>
      </View>
      {!plantChosen && !gardenChosen && (
        <View style={{}}>
          <Pressable onPress={() => togglePlantMenu()}>
            <Text style={styles.menuOption}>Plant</Text>
          </Pressable>
          <Pressable onPress={() => toggleGardenMenu()}>
            <Text style={styles.menuOption}>Garden</Text>
          </Pressable>
        </View>
      )}
      {plantChosen && (
        <View style={[styles.menuOption, { gap: 8 }]}>
          <PlantSearch onSelectPlant={handlePlantSelection} />
          <Input label="Nickname" placeholder="Nickname..." iconName="flower" />
          <DropDown 
            label="Select a Garden"
            placeholder="Choose a garden..."
            options={gardenOptions}
            onSelect={handleGardenSelect}
          />
          <Button text="Add plant" type="primary" iconName="plus" />
        </View>
      )}
      {gardenChosen && (
        <View style={[styles.menuOption, { gap: 8 }]}>
          <Input
            label="Garden Name"
            iconName="nature"
            placeholder="Garden Name..."
          />
          <Button type="primary" text="Add Garden" iconName="plus" />
        </View>
      )}
    </View>
  );
};

export default AddMenu;

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    position: "absolute",
    bottom: 70,
    width: "95%",
    margin: "2.5%",
  },
  menuHeaderContainer: {
    backgroundColor: colors.primaryDefault,
    width: "100%",
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  menuOption: {
    padding: 8,
    fontSize: 18,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { CatalogPlant } from "@/types/models";
import PlantCard from "@/components/PlantCard";
import colors from "@/constants/colors";
const PlantExplorerPage = () => {
  const { fetchAllPlants, databasePlants } = useGardensAndPlants();
  const [plants, setPlants] = useState<CatalogPlant[]>([]);
  useEffect(() => {
    const fetchPlantsData = async () => {
      try {
        await fetchAllPlants();
        setPlants(databasePlants);
      } catch (error) {
        console.error("Error fetching plant catalog:", error);
      }
    };
    fetchPlantsData();
  }, [fetchAllPlants, databasePlants]);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Plant Explorer",
          headerStyle: { backgroundColor: colors.primaryDefault },
        }}
      />
      <View style={styles.pageContainer}>
        {plants.map((plant, index) => (
          <PlantCard
            key={index}
            plant={plant}
            onPress={() => console.log(`Selected plant: ${plant.name.commonName}`)}
          />
        ))}
      </View>
    </>
  );
};
export default PlantExplorerPage;
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});
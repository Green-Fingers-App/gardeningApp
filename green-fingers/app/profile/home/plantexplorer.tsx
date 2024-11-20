import { View, StyleSheet, ScrollView } from "react-native";
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
    console.log("im fetching");
    const fetchPlantsData = async () => {
      try {
        fetchAllPlants();
        setPlants(databasePlants);
      } catch (error) {
        console.error("Error fetching plant catalog:", error);
      }
    };
    fetchPlantsData();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Plant Explorer",
          headerStyle: { backgroundColor: colors.primaryDefault },
        }}
      />
      <ScrollView style={{ backgroundColor: colors.bgLight }}>
        <View style={styles.pageContainer}>
          {plants.map((plant, index) => (
            <PlantCard key={index} plant={plant} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default PlantExplorerPage;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 16,
    gap: 8,
    marginTop: 8,
  },
});

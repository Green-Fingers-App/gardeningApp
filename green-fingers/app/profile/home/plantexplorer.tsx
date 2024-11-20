import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { CatalogPlant } from "@/types/models";
import PlantCard from "@/components/PlantCard";
import colors from "@/constants/colors";
import ExplorerSearch from "@/components/ExplorerSearch";

const PlantExplorerPage = () => {
  const { fetchAllPlants, databasePlants } = useGardensAndPlants();
  const [plants, setPlants] = useState<CatalogPlant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<CatalogPlant[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log("im fetching:", plants);
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
      <ExplorerSearch
        plants={plants}
        filteredPlants={filteredPlants}
        setFilteredPlants={setFilteredPlants}
      />
      <ScrollView style={{ backgroundColor: colors.bgLight }}>
        <View style={styles.pageContainer}>
          {filteredPlants.length === 0
            ? plants.map((plant, index) => (
                <PlantCard
                  key={index}
                  plant={plant}
                  onPress={() => router.push(`/profile/home/${plant.id}`)}
                />
              ))
            : filteredPlants.map((plant, index) => (
                <PlantCard
                  key={index}
                  plant={plant}
                  onPress={() => router.push(`/profile/home/${plant.id}`)}
                />
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

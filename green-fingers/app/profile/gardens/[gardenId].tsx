import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { Garden, UserPlant } from "@/types/models";
import PlantCard from "@/components/PlantCard";
import colors from "@/constants/colors";

const GardenDetailPage = () => {
  const { gardenId } = useLocalSearchParams();
  const { fetchGardenPlants, fetchGardenDetail } = useGardensAndPlants();
  const [plants, setPlants] = useState<UserPlant[] | undefined>(undefined);
  const [garden, setGarden] = useState<Garden | undefined>(undefined);

  useEffect(() => {
    const fetchGardenData = async () => {
      try {
        const fetchedGarden = fetchGardenDetail(gardenId?.toString());
        const fetchedPlants = fetchGardenPlants(gardenId?.toString());
        setGarden(fetchedGarden);
        setPlants(fetchedPlants);
      } catch (error) {
        console.error("Error fetching garden details or plants:", error);
      }
    };

    if (gardenId) {
      fetchGardenData();
    }
  }, [gardenId]);

  return (
    <>
      <Stack.Screen
        options={{
          title: garden?.name || "Garden Details",
          headerStyle: { backgroundColor: colors.primaryDefault },
        }}
      />
      <View style={styles.pageContainer}>
        {plants?.map((plant, index) => (
          <PlantCard plant={plant} key={index} />
        ))}
      </View>
    </>
  );
};

export default GardenDetailPage;

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "center",
    flex: 1,
    gap: 8,
    marginTop: 8,
  },
});

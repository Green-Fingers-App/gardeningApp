import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { UserPlant } from "@/types/models";
import PlantCard from "@/components/PlantCard";

const GardenDetailPage = () => {
  const { gardenId } = useLocalSearchParams();
  const { fetchGardenPlants } = useGardensAndPlants();
  const [plants, setPlants] = useState<UserPlant[] | undefined>(undefined);

  useEffect(() => {
    const fetchedPlants = fetchGardenPlants(gardenId.toString());
    setPlants(fetchedPlants);
  }, []);

  return (
    <View style={styles.pageContainer}>
      {plants?.map((plant, index) => (
        <PlantCard plant={plant} key={index} />
      ))}
    </View>
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

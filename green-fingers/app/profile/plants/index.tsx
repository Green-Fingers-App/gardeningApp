import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import PlantCard from "@/components/PlantCard";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { UserPlant } from "@/types/models";
import { useRouter } from "expo-router";

const Plants = () => {
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const { plants: contextPlants } = useGardensAndPlants();
  const router = useRouter();

  useEffect(() => {
    setPlants(contextPlants);
  }, [contextPlants]);

  return (
    <View style={styles.pageContainer}>
      {plants.map((plant, index) => (
        <PlantCard
          plant={plant}
          key={index}
          onPress={() => router.push(`profile/plants/${plant.id}`)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    gap: 8,
    marginTop: 8,
    alignItems: "center",
  },
});

export default Plants;

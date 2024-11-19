import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import PlantCard from "@/components/PlantCard";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { UserPlant } from "@/types/models";

const Plants = () => {
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const { plants: contextPlants } = useGardensAndPlants();

  useEffect(() => {
    setPlants(contextPlants);
  }, [contextPlants]);

  return (
    <View style={styles.pageContainer}>
      {plants.map((plant, index) => (
        <PlantCard plant={plant} key={index} />
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

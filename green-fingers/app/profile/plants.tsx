import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import PlantCard from "@/components/PlantCard";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";

const Plants = () => {
  const { plants, fetchPlants } = useGardensAndPlants();

  useEffect(() => fetchPlants(1, "a"));
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

import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { usePlants } from "@/context/PlantsContext";
import PlantCard from "@/components/PlantCard";

const plants = () => {
  const { plants, fetchPlants } = usePlants();

  useEffect(() => {
    fetchPlants(1, "a");
  }, []);
  return (
    <View style={{ gap: 8, flex: 1, alignItems: "center" }}>
      {plants.map((plant, index) => (
        <PlantCard plant={plant} key={index} />
      ))}
    </View>
  );
};

export default plants;

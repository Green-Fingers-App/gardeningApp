import { View } from "react-native";
import React, { useEffect, useState } from "react";
import GardenCard from "@/components/GardenCard";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";

const gardens: React.FC = () => {
  const { gardens, fetchGardens } = useGardensAndPlants();

  useEffect(() => fetchGardens("a", "b"), []);
  return (
    <View style={{ flex: 1, gap: 8, marginTop: 8, marginHorizontal: "2.5%" }}>
      {gardens.map((garden, index) => (
        <GardenCard key={index} garden={garden} />
      ))}
    <View style={{ flex: 1, gap: 8, marginTop: 8, marginHorizontal: "2.5%" }}>
      {gardens.map((garden, index) => (
        <GardenCard key={index} garden={garden} />
      ))}
    </View>
  );
};

export default gardens;

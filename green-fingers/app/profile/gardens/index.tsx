import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Garden } from "@/types/models";
import { gardens as importGardens } from "@/dummyData/dummyData";
import GardenCard from "@/components/GardenCard";

const gardens: React.FC = () => {
  const [gardens, setGardens] = useState<Garden[]>([]);

  useEffect(() => setGardens(importGardens), []);
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

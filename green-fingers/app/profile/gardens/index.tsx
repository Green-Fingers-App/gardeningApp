import { View, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import GardenCard from "@/components/GardenCard";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";

const Gardens: React.FC = () => {
  const { gardens } = useGardensAndPlants();

  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.pageContainer}>
        {gardens.map((garden, index) => (
          <GardenCard key={index} garden={garden} />
        ))}
      </View>
    </ImageBackground>
  );
};

export default Gardens;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    margin: 8,
    gap: 8,
    marginTop: 8,
  },
});
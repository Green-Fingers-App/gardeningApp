import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
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
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.pageContainer}>
        {plants.map((plant, index) => (
          <PlantCard plant={plant} key={index} />
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  pageContainer: {
    flex: 1,
    gap: 8,
    marginTop: 8,
    alignItems: "center",
  },
});

export default Plants;

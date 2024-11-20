import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
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
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.pageContainer}>
        {plants.map((plant, index) => (
          <PlantCard 
            plant={plant} 
            key={index}
            onPress={() => router.push(`profile/plants/${plant.id}`)}
          />
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    gap: 8,
    marginTop: 8,
    alignItems: "center",
  },
});

export default Plants;

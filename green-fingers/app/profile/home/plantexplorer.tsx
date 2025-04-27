import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { CatalogPlant } from "@/types/models";
import PlantCard from "@/components/PlantCard";
import colors from "@/constants/colors";
import ExplorerSearch from "@/components/ExplorerSearch";

const PlantExplorerPage = () => {
  const { fetchCatalogPlants, databasePlants } = useGardensAndPlants();
  const [plants, setPlants] = useState<CatalogPlant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<CatalogPlant[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log("im fetching:", plants);
    const fetchPlantsData = async () => {
      try {
        fetchCatalogPlants();
        setPlants(databasePlants);
      } catch (error) {
        console.error("Error fetching plant catalog:", error);
      }
    };
    fetchPlantsData();
  }, []);

  return (
    <>
      <ImageBackground
        source={require("../../../assets/images/background.png")}
        style={styles.backgroundImage}
      >
        <Stack.Screen
          options={{
            title: "Plant Explorer",
            headerStyle: { backgroundColor: colors.primaryDefault },
          }}
        />
        <ExplorerSearch
          plants={plants}
          filteredPlants={filteredPlants}
          setFilteredPlants={setFilteredPlants}
        />
        <ScrollView>
          <View style={styles.pageContainer}>
            {filteredPlants.length === 0
              ? plants.map((plant, index) => (
                  <PlantCard
                    key={index}
                    plant={plant}
                    onPress={() => router.push(`/profile/home/${plant.id}`)}
                  />
                ))
              : filteredPlants.map((plant, index) => (
                  <PlantCard
                    key={index}
                    plant={plant}
                    onPress={() => router.push(`/profile/home/${plant.id}`)}
                  />
                ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default PlantExplorerPage;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    padding: 16,
    gap: 8,
    marginTop: 8,
  },
});

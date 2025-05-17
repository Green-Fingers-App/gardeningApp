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
    const fetchPlantsData = async () => {
      try {
        fetchCatalogPlants();
        setPlants(databasePlants);
      } catch (error) {
        console.error("Error fetching plant catalog:", error);
      }
    };
    void fetchPlantsData();
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
            headerStyle: { backgroundColor: colors.bgLight },
            headerTintColor: colors.primaryDefault,
          }}
        />
        <View style={styles.searchContainer} >
          <ExplorerSearch
            plants={plants}
            filteredPlants={filteredPlants}
            setFilteredPlants={setFilteredPlants}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
  searchContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: colors.bgLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryDefault,
    borderTopWidth: 1,
    borderTopColor: colors.primaryDefault,
  },
  scrollContainer: {
    paddingBottom: 104,
    padding: 8,
    alignItems: "stretch",
    gap: 8,
  },
});

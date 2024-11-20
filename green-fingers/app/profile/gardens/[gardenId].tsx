import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { Garden, UserPlant } from "@/types/models";
import PlantCard from "@/components/PlantCard";
import colors from "@/constants/colors";
import OptionMenu from "@/components/OptionMenu";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";

const GardenDetailPage = () => {
  const { gardenId } = useLocalSearchParams();
  const { fetchGardenPlants, fetchGardenDetail } = useGardensAndPlants();
  const [plants, setPlants] = useState<UserPlant[] | undefined>(undefined);
  const [garden, setGarden] = useState<Garden | undefined>(undefined);
  const { deleting, handleDeleteEntity } = useDeleteEntity("Garden");

  const options = [
    { label: "Edit", onPress: () => console.log("Edit garden") },
    { label: "Delete", onPress: () => garden && handleDeleteEntity({ id: garden.id, name: garden.name }) },
  ]

  useEffect(() => {
    const fetchGardenData = async () => {
      try {
        const fetchedGarden = fetchGardenDetail(gardenId?.toString());
        const fetchedPlants = fetchGardenPlants(gardenId?.toString());
        setGarden(fetchedGarden);
        setPlants(fetchedPlants);
      } catch (error) {
        console.error("Error fetching garden details or plants:", error);
      }
    };

    if (gardenId) {
      fetchGardenData();
    }
  }, [gardenId]);

  return (
    <>
      <Stack.Screen
        options={{
          title: garden?.name || "Garden Details",
          headerStyle: { backgroundColor: colors.primaryDefault, },
          headerRight: () => <OptionMenu options={options} />,
        }}
      />
      {garden && !deleting ? (
        <View style={styles.pageContainer}>
          {plants?.map((plant, index) => (
            <PlantCard plant={plant} key={index} />
          ))}
        </View>
      ) : deleting ? (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="small" color="#457D58" />
          <Text> Deleting... </Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      
    </>
  );
};

export default GardenDetailPage;

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "center",
    flex: 1,
    gap: 8,
    marginTop: 8,
  },
});

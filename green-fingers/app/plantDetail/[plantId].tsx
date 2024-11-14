import { Text, SafeAreaView } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { UserPlant } from "@/types/models";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import Accordion from "@/components/Accordion";
import AccordionItem from "@/components/AccordionItem";

const PlantDetailPage = () => {
  const { plantId } = useLocalSearchParams();
  const { fetchPlantDetail } = useGardensAndPlants();
  const [plant, setPlant] = useState<UserPlant | null>(null);
  const router = useRouter();

  useEffect(() => {
    const newPlant = fetchPlantDetail(plantId.toString());
    if (newPlant) {
      setPlant(newPlant);
    }
  }, [plantId]); // Add plantId as dependency

  return (
    <>
      <Stack.Screen
        options={{
          title: plant?.plant.name.commonName || "Plant Details",
          headerLeft: () => (
            <MaterialCommunityIcons
              name="arrow-left"
              size={25}
              onPress={() => router.back()}
            />
          ),
          headerStyle: {
            backgroundColor: colors.primaryDefault,
          },
        }}
      />
      {plant ? (
        <SafeAreaView>
          <Accordion>
            <AccordionItem title="Status">
              <Text>Last watered: {plant.wateredDate}</Text>
              <Text>Last fed: {plant.feededDate}</Text>
            </AccordionItem>
            <AccordionItem title="Overview">
              <Text>Common name: {plant.plant.name.commonName}</Text>
              <Text>Scientific name: {plant.plant.name.scientificName}</Text>
              <Text>
                Blooming: {plant.plant.blooming.start} till{" "}
                {plant.plant.blooming.end}
              </Text>
              <Text>
                Harvest:
                {plant.plant.harvest
                  ? `${plant.plant.harvest.start} till ${plant.plant.harvest.end}`
                  : "This plant cannot be harvest"}
              </Text>
            </AccordionItem>
            <AccordionItem title="Sensors">
              <Text style={{ color: "black" }}>Blap</Text>
            </AccordionItem>
          </Accordion>
        </SafeAreaView>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default PlantDetailPage;

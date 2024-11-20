import { Text, SafeAreaView } from "react-native";
import { Text, SafeAreaView } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { UserPlant } from "@/types/models";
import colors from "@/constants/colors";
import Accordion from "@/components/Accordion";
import AccordionItem from "@/components/AccordionItem";
import OptionsMenu from "@/components/OptionMenu";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";

const PlantDetailPage = () => {
  const { plantId } = useLocalSearchParams();
  const { fetchPlantDetail } = useGardensAndPlants();
  const [plant, setPlant] = useState<UserPlant | null>(null);
  const { deleting, handleDeleteEntity } = useDeleteEntity("Plant");

  const options = [
    { label: "Edit", onPress: () => console.log("Edit plant") },
    { label: "Delete", onPress: () => plant && handleDeleteEntity({ id: plant.id, name: plant.nickName}) },
  ];

  useEffect(() => {
    const newPlant = fetchPlantDetail(plantId.toString());
    if (newPlant) {
      setPlant(newPlant);
    }
  }, [plantId]);

  return (
    <>
      <Stack.Screen
        options={{
          title: plant?.name.commonName || "Plant Details",
          headerStyle: {
            backgroundColor: colors.primaryDefault,
          },
          headerRight: () => {
            return <OptionsMenu options={options} />;
          },
        }}
      />
      {plant && !deleting ? (
        <SafeAreaView>
          <Image
            source={{
              uri: "https://www.istockphoto.com/de/foto/orange-gerbera-flower-head-macro-top-view-gm2111424340-566975557",
            }}
            style={{ width: "100%", height: 100 }}
          />
          <Accordion>
            <AccordionItem title="Status">
              <Text>Last watered: {plant.wateredDate}</Text>
              <Text>Last fed: {plant.feededDate}</Text>
            </AccordionItem>
            <AccordionItem title="Overview">
              <Text>Common name: {plant.name.commonName}</Text>
              <Text>Scientific name: {plant.name.scientificName}</Text>
              <Text>
                Blooming: {plant.blooming.start} till {plant.blooming.end}
              </Text>
              <Text>
                Harvest:
                Harvest:
                {plant.plant.harvest
                  ? `${plant.plant.harvest.start} till ${plant.plant.harvest.end}`
                  : "This plant cannot be harvest"}
              </Text>
              <Text>Fertilizer type: {plant.fertilizerType}</Text>
              <Text>Water Frequency: {plant.waterFrequency}</Text>
              <Text>Sunlight requirement: {plant.sunLight}</Text>
            </AccordionItem>
            <AccordionItem title="Sensors">
              <Text style={{ color: "black" }}>No sensors available</Text>
            </AccordionItem>
          </Accordion>
        </SafeAreaView>
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

export default PlantDetailPage;

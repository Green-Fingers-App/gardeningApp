import { View, Text, SafeAreaView } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { usePlants } from "@/context/PlantsContext";
import { UserPlant } from "@/types/models";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import Accordion from "@/components/Accordion";
import AccordionItem from "@/components/AccordionItem";

const PlantDetailPage = () => {
  const { plantId } = useLocalSearchParams();
  const { fetchPlantDetail } = usePlants();
  const [plant, setPlant] = useState<UserPlant | null>(null);
  const router = useRouter();

  useEffect(() => {
    const newPlant = fetchPlantDetail(Number(plantId));
    if (newPlant) {
      setPlant(newPlant);
    }
  }, [plantId]); // Add plantId as dependency

  return (
    <>
      <Stack.Screen
        options={{
          title: plant?.plant.name.commonName || "Plant Details", // Fallback title
          headerLeft: () => (
            <MaterialCommunityIcons
              name="arrow-left"
              size={25}
              onPress={() => router.back()}
            />
          ),
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
      <SafeAreaView>
        <Accordion>
          <AccordionItem title="Status">
            <Text>hello</Text>
          </AccordionItem>
          <AccordionItem title="Overview">
            <Text>bloop plaaaaappppp</Text>
          </AccordionItem>
          <AccordionItem title="Sensors">
            <Text style={{ color: "black" }}>Blap</Text>
          </AccordionItem>
        </Accordion>
      </SafeAreaView>
    </>
  );
};

export default PlantDetailPage;

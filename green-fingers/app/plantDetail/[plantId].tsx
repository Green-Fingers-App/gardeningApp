import { View, Text } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { usePlants } from "@/context/PlantsContext";
import { UserPlant } from "@/types/models";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/constants/colors";

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
  }, []);
  return (
    <>
      <Stack.Screen
        options={{
          title: plant?.plant.name.commonName,
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
      <View>
        <Text>{plant?.feededDate}</Text>
      </View>
    </>
  );
};

export default PlantDetailPage;

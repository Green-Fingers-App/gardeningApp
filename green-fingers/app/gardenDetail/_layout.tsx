import colors from "@/constants/colors";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { Garden, UserPlant } from "@/types/models";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const GardenDetailLayout = () => {
  const { gardenId } = useLocalSearchParams();
  const { fetchGardenDetail } = useGardensAndPlants();
  const [garden, setGarden] = useState<Garden | undefined>(undefined);
  const [plants, setPlants] = useState<UserPlant | undefined>(undefined);

  useEffect(() => {
    const fetchedGarden = fetchGardenDetail(gardenId.toString());
    setGarden(fetchedGarden);
  });

  return (
    <Stack>
      <Stack.Screen
        name="[gardenId]"
        options={{
          headerStyle: { backgroundColor: colors.primaryDefault },
          title: garden?.location,
        }}
      />
    </Stack>
  );
};

export default GardenDetailLayout;

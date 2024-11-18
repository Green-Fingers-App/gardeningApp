import colors from "@/constants/colors";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { Garden } from "@/types/models";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const GardenDetailLayout = () => {
  const { gardenId } = useLocalSearchParams();
  const { fetchGardenDetail } = useGardensAndPlants();
  const [garden, setGarden] = useState<Garden | undefined>(undefined);

  useEffect(() => {
    if (gardenId) {
      const fetchedGarden = fetchGardenDetail(gardenId.toString());
      setGarden(fetchedGarden);
    }
  }, [gardenId, fetchGardenDetail]);

  return (
    <Stack>
      <Stack.Screen
        name="[gardenId]"
        options={{
          headerStyle: { backgroundColor: colors.primaryDefault },
          title: garden?.name || "Garden Details",
        }}
      />
    </Stack>
  );
};

export default GardenDetailLayout;

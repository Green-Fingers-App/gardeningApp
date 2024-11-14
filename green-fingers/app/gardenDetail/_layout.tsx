import colors from "@/constants/colors";
import { Stack, useLocalSearchParams } from "expo-router";

const GardenDetailLayout = () => {
  const { gardenId } = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen
        name="[gardenId]"
        options={{
          headerStyle: { backgroundColor: colors.primaryDefault },
          title: gardenId.toString(),
        }}
      />
    </Stack>
  );
};

export default GardenDetailLayout;

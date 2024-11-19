import { Stack } from "expo-router";

const GardenDetailLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[gardenId]" />
    </Stack>
  );
};

export default GardenDetailLayout;

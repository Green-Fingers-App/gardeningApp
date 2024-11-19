import { Stack } from "expo-router";

export default function PlantsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[plantId]" />
    </Stack>
  );
}

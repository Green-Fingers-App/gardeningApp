import { Stack } from "expo-router";

export default function SensorsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[sensorId]" />
    </Stack>
  );
}

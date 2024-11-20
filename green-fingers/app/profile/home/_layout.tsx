import { Stack } from "expo-router";
const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="plantexplorer" />
      <Stack.Screen name="[catalogPlantId]" />
    </Stack>
  );
};
export default HomeLayout;

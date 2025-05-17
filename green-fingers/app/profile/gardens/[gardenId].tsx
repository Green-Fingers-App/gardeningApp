import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { Garden, UserPlant } from "@/types/models";
import PlantCard from "@/components/PlantCard";
import colors from "@/constants/colors";
import OptionMenu from "@/components/OptionMenu";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";
import EntityEditModal from "@/components/EntityEditModal";

const GardenDetailPage = () => {
  const { gardenId } = useLocalSearchParams();
  const { fetchGardenPlants, fetchGardenDetail, updateUserGarden } =
    useGardensAndPlants();
  const [plants, setPlants] = useState<UserPlant[] | undefined>(undefined);
  const [garden, setGarden] = useState<Garden | undefined>(undefined);
  const { deleting, handleDeleteEntity } = useDeleteEntity("Garden");
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    name: "",
  });
  const router = useRouter();

  const options = [
    { label: "Edit", onPress: () => setEditing(true) },
    {
      label: "Delete",
      onPress: () => {
        console.log("Button Pressed, garden: ", garden);
        garden && handleDeleteEntity({ id: garden.id, name: garden.name });
      },
    },
  ];

  const handleChange = (key: string, value: string | number) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditValues({ name: "" });
  };

  const handleSave = async () => {
    const updatedGarden = await updateUserGarden(
      parseInt(gardenId.toString(), 10),
      editValues
    );
    setGarden(updatedGarden);
    setEditValues({ name: "" });
    setEditing(false);
    router.replace(`/profile/gardens/${gardenId}`);
  };

  useEffect(() => {
    const fetchGardenData = async () => {
      try {
        const fetchedGarden = fetchGardenDetail(gardenId?.toString());
        const fetchedPlants = fetchGardenPlants(gardenId?.toString());
        setGarden(fetchedGarden);
        setPlants(fetchedPlants);
      } catch (error) {
        console.error("Error fetching garden details or plants:", error);
      }
    };

    if (gardenId) {
      fetchGardenData();
    }
  }, [gardenId]);

  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <Stack.Screen
        options={{
          title: garden?.name || "Garden Details",
          headerStyle: { backgroundColor: colors.bgLight },
          headerTintColor: colors.primaryDefault,
          headerRight: () => <OptionMenu options={options} />,
        }}
      />
      {garden && !deleting ? (
        <View style={styles.pageContainer}>
          {plants?.map((plant, index) => (
            <PlantCard
              plant={plant}
              key={index}
              onPress={() => router.push(`/profile/plants/${plant.id}`)}
            />
          ))}
        </View>
      ) : deleting ? (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="small" color="#457D58" />
          <Text> Deleting... </Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <EntityEditModal
        visible={editing}
        entityName="Garden"
        fields={[{ key: "name", label: "Name", type: "text" }]}
        values={editValues}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />
    </ImageBackground>
  );
};

export default GardenDetailPage;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  pageContainer: {
    alignItems: "center",
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.primaryDefault,
    backgroundColor: colors.white,
    gap: 8,
    paddingTop: 16,
  },
});

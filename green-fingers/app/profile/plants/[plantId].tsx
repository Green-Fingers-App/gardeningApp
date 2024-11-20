import {
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { UserPlant } from "@/types/models";
import colors from "@/constants/colors";
import Accordion from "@/components/Accordion";
import AccordionItem from "@/components/AccordionItem";
import OptionsMenu from "@/components/OptionMenu";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EntityEditModal from "@/components/EntityEditModal";

const PlantDetailPage = () => {
  const { plantId } = useLocalSearchParams();
  const { fetchPlantDetail, gardens, updatePlant } = useGardensAndPlants();
  const [plant, setPlant] = useState<UserPlant | null>(null);
  const { deleting, handleDeleteEntity } = useDeleteEntity("Plant");
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    nickName: "",
    gardenId: "",
  });
  const router = useRouter();

  const options = [
    { label: "Edit", onPress: () => setEditing(true) },
    {
      label: "Delete",
      onPress: () =>
        plant && handleDeleteEntity({ id: plant.id, name: plant.nickName }),
    },
  ];

  const gardenOptions = gardens.map((garden) => ({
    value: garden.id,
    label: garden.name,
  }));

  const handleChange = (key: string, value: string) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditValues({ nickName: "", gardenId: "" });
  };

  const handleSave = () => {
    updatePlant(plantId.toString(), editValues);
    setEditing(false);
    router.push(`/profile/plants/${plantId}`);
  };

  useEffect(() => {
    const newPlant = fetchPlantDetail(plantId.toString());
    if (newPlant) {
      setPlant(newPlant);
    }
  }, [plantId]);

  return (
    <>
      <Stack.Screen
        options={{
          title: plant?.nickName || "Plant Details",
          headerStyle: {
            backgroundColor: colors.primaryDefault,
          },
          headerRight: () => {
            return <OptionsMenu options={options} />;
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.push("/profile/plants")}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      {plant && !deleting ? (
        <SafeAreaView>
          <Image
            source={{
              uri: "https://www.istockphoto.com/de/foto/orange-gerbera-flower-head-macro-top-view-gm2111424340-566975557",
            }}
            style={{ width: "100%", height: 100 }}
          />
          <Accordion>
            <AccordionItem title="Status">
              <Text>Last watered: {plant.wateredDate}</Text>
              <Text>Last fed: {plant.feededDate}</Text>
            </AccordionItem>
            <AccordionItem title="Overview">
              <Text>Common name: {plant.name.commonName}</Text>
              <Text>Scientific name: {plant.name.scientificName}</Text>
              <Text>
                Blooming: {plant.blooming.start} till {plant.blooming.end}
              </Text>
              <Text>
                Harvest:
                {plant.harvest
                  ? `${plant.harvest.start} till ${plant.harvest.end}`
                  : "This plant cannot be harvest"}
              </Text>
              <Text>Fertilizer type: {plant.fertilizerType}</Text>
              <Text>Water Frequency: {plant.waterFrequency}</Text>
              <Text>Sunlight requirement: {plant.sunLight}</Text>
            </AccordionItem>
            <AccordionItem title="Sensors">
              <Text style={{ color: "black" }}>No sensors available</Text>
            </AccordionItem>
          </Accordion>
        </SafeAreaView>
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
        entityName="Plant"
        fields={[
          { key: "nickName", label: "Nickname", type: "text" },
          {
            key: "gardenId",
            label: "Garden",
            type: "dropdown",
            placeholder: "Select a garden...",
            options: gardenOptions,
          },
        ]}
        values={editValues}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />
    </>
  );
};

export default PlantDetailPage;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "95%",
    marginHorizontal: "2.5%",
    backgroundColor: colors.bgLight,
  },
});

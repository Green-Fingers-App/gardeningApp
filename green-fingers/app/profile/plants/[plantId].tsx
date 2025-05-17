import {
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { UserPlant } from "@/types/models";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
import Accordion from "@/components/Accordion";
import AccordionItem from "@/components/AccordionItem";
import OptionsMenu from "@/components/OptionMenu";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EntityEditModal from "@/components/EntityEditModal";
import { shouldBeWatered } from "@/utils/plant";
import UpdateWateredDate from "@/components/UpdateWateredDate";

const PlantDetailPage = () => {
  const { plantId } = useLocalSearchParams();
  const { fetchPlantDetail, gardens, updateUserPlant } = useGardensAndPlants();
  const [plant, setPlant] = useState<UserPlant | null>(null);
  const { deleting, handleDeleteEntity } = useDeleteEntity("Plant");
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState<{
    nickname: string;
    garden_id: string;
  }>({
    nickname: "",
    garden_id: "",
  });
  const router = useRouter();

  const options = [
    {
      label: "Edit",
      onPress: () => {
        setEditing(true);
      },
    },
    {
      label: "Delete",
      onPress: () => {
        plant && handleDeleteEntity({ id: plant.id, name: plant.nickName });
      },
    },
  ];

  const gardenOptions = gardens.map((garden) => ({
    value: garden.id.toString(),
    label: garden.name,
  }));

  const handleChange = (key: string, value: string | number) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditValues({ nickname: "", garden_id: "" });
  };

  const handleSave = async () => {
    const updatedPlant = await updateUserPlant(Number(plantId), {
      ...editValues,
      garden_id: Number(editValues.garden_id),
    });
    if (updatedPlant) {
      setPlant(updatedPlant);
    }
    setEditValues({ nickname: "", garden_id: "" });
    setEditing(false);
    router.push(`/profile/plants/${plantId}`);
  };

  useEffect(() => {
    const newPlant = fetchPlantDetail(plantId.toString());
    if (newPlant) {
      setPlant(newPlant);
    }
  }, [plantId]);

  const [thirsty, setThirsty] = useState(false);

  useEffect(() => {
    if (!plant) return;
    const updatedStatus = shouldBeWatered(plant);
    setThirsty(updatedStatus);
  }, [plant]);

  return (
    <>
      <Stack.Screen
        options={{
          title: plant?.nickName ?? "Plant Details",
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: textStyles.h3.fontFamily,
            fontWeight: textStyles.h3.fontWeight,
            color: colors.primaryDefault,
          },
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
              uri: plant.imageUrl,
            }}
            style={{ width: "100%", height: "50%" }}
          />
          <Accordion style={{ height: "50%" }}>
            <AccordionItem title="Status">
              <View style={{ flexDirection: "row", gap: "2" }}>
                <Text>
                  Last watered:{" "}
                  {new Date(plant.wateredDate).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    dateStyle: "full",
                  })}
                </Text>
                {thirsty && <UpdateWateredDate />}
              </View>
              <Text>Last fed: {plant.feededDate}</Text>
            </AccordionItem>
            <AccordionItem title="Overview">
              <Text>Common name: {plant.name.commonName}</Text>
              <Text>Scientific name: {plant.name.scientificName}</Text>
              <Text>
                Blooming:{" "}
                {plant.blooming.start
                  ? `${plant.blooming.start} till ${plant.blooming.end}`
                  : "No blooming"}
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
          { key: "nickname", label: "Nickname", type: "text" },
          {
            key: "garden_id",
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

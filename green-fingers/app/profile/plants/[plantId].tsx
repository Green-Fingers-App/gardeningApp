import {
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  View,
  TouchableOpacity,
  StyleSheet,
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
import Button from "@/components/Button";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EntityEditModal from "@/components/EntityEditModal";
import { shouldBeWatered } from "@/utils/plant";
import { MaterialIcons } from "@expo/vector-icons";
import UpdateWateredDate from "@/components/UpdateWateredDate";
import { useMoistureSensors } from "@/context/MoistureSensorContext";

const PlantDetailPage = () => {
  const { plantId } = useLocalSearchParams();
  const { fetchPlantDetail, gardens, updateUserPlant, plants } =
    useGardensAndPlants();
  const [plant, setPlant] = useState<UserPlant | null>(null);
  const { deleting, handleDeleteEntity } = useDeleteEntity("Plant");
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    nickname: "",
    garden_id: "",
  });

  const [iconProps, setIconProps] = useState<{
    name: keyof typeof MaterialIcons.glyphMap;
    color: string;
    message: string;
    bg: string;
  }>();
  const router = useRouter();

  const getIconProps = (
    thirsty: boolean
  ): {
    name: keyof typeof MaterialIcons.glyphMap;
    color: string;
    message: string;
    bg: string;
  } => {
    if (thirsty) {
      return {
        name: "warning",
        color: colors.textWarning,
        message: "I'm thirsty",
        bg: colors.bgWarning,
      };
    } else {
      return {
        name: "check-circle",
        color: colors.textSuccess,
        message: "I'm good",
        bg: colors.bgSuccess,
      };
    }
  };

  const options = [
    {
      label: "Edit",
      onPress: () => setEditing(true),
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

  let thirsty;
  useEffect(() => {
    const newPlant = fetchPlantDetail(plantId.toString());
    if (!newPlant) return;
    thirsty = shouldBeWatered(newPlant);
    const iconProps = getIconProps(thirsty);
    console.log(thirsty);
    setIconProps(iconProps);
    if (newPlant) {
      setPlant(newPlant);
    }
    console.log(newPlant?.sensorId);
  }, [plantId, plants]);

  return (
    <>
      <Stack.Screen
        options={{
          title: plant?.nickName ?? "Plant Details",
          headerStyle: { backgroundColor: colors.bgLight },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: textStyles.h3.fontFamily,
            fontWeight: textStyles.h3.fontWeight,
            color: colors.primaryDefault,
          },
          headerTintColor: colors.primaryDefault,
          headerRight: () => <OptionsMenu options={options} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/profile/plants")}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color={colors.primaryDefault}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {plant && !deleting ? (
        <SafeAreaView style={styles.pageContainer}>
          <Image
            source={{ uri: plant.imageUrl }}
            style={styles.plantImage}
            resizeMode="contain"
          />
          <View
            style={[
              styles.currentMoistureLevel,
              { backgroundColor: iconProps?.bg },
            ]}
          >
            <MaterialIcons
              name={iconProps?.name}
              color={iconProps?.color}
              size={24}
            />
            <Text style={[textStyles.h4, { textAlign: "center" }]}>
              {iconProps?.message}{" "}
            </Text>
          </View>
          <View>
            <Accordion style={styles.accordionContainer}>
              <AccordionItem title="Status">
                <View style={styles.attributeText}>
                  <Text
                    style={[textStyles.body, { color: colors.textSecondary }]}
                  >
                    Last watered:
                  </Text>
                  {plant.wateredDate ? (
                    <View style={styles.rowSpaceBetween}>
                      <Text
                        style={[
                          textStyles.bodyMedium,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {" "}
                        {new Date(plant.wateredDate).toLocaleDateString(
                          "en-GB"
                        )}
                      </Text>
                      <UpdateWateredDate plantId={plant.id} />
                    </View>
                  ) : (
                    <Text
                      style={[
                        textStyles.bodyMedium,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {" "}
                      -
                    </Text>
                  )}
                </View>

                <View style={styles.attributeText}>
                  <Text
                    style={[textStyles.body, { color: colors.textSecondary }]}
                  >
                    Last fed:
                  </Text>
                  {plant.feededDate ? (
                    <Text
                      style={[
                        textStyles.bodyMedium,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {" "}
                      {new Date(plant.feededDate).toLocaleDateString("en-GB")}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        textStyles.bodyMedium,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {" "}
                      -
                    </Text>
                  )}
                </View>
              </AccordionItem>
              <AccordionItem title="Overview">
                <View style={styles.attributeText}>
                  <Text
                    style={[textStyles.body, { color: colors.textSecondary }]}
                  >
                    Plant family:
                  </Text>
                  {plant.sensorId ? (
                    <Button
                      style={{ flexShrink: 1 }}
                      type="tertiary"
                      text={plant.name.scientificName}
                      onPress={() =>
                        router.push(`profile/home/${plant.catalogPlant_id}`)
                      }
                    />
                  ) : (
                    <Text
                      style={[textStyles.body, { color: colors.textPrimary }]}
                    >
                      {" "}
                      -
                    </Text>
                  )}
                </View>

                <View style={styles.attributeText}>
                  <Text
                    style={[textStyles.body, { color: colors.textSecondary }]}
                  >
                    Blooming:
                  </Text>
                  {plant.blooming?.start ? (
                    <Text
                      style={[
                        textStyles.bodyMedium,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {` ${plant.blooming.start} till ${plant.blooming.end}`}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        textStyles.bodyMedium,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {" "}
                      -
                    </Text>
                  )}
                </View>

                <View style={styles.attributeText}>
                  <Text
                    style={[textStyles.body, { color: colors.textSecondary }]}
                  >
                    Harvest:
                  </Text>
                  {plant.harvest?.start ? (
                    <Text
                      style={[
                        textStyles.bodyMedium,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {` ${plant.harvest.start} till ${plant.harvest.end}`}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        textStyles.bodyMedium,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {" "}
                      -
                    </Text>
                  )}
                </View>

                <View style={styles.attributeText}>
                  <Text
                    style={[textStyles.body, { color: colors.textSecondary }]}
                  >
                    Fertilizer type:
                  </Text>
                  <Text
                    style={[
                      textStyles.bodyMedium,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {plant.fertilizerType || " -"}
                  </Text>
                </View>

                <View style={styles.attributeText}>
                  <Text
                    style={[textStyles.body, { color: colors.textSecondary }]}
                  >
                    Water Frequency:
                  </Text>
                  <Text
                    style={[
                      textStyles.bodyMedium,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {plant.waterFrequency.charAt(0) +
                      plant.waterFrequency.slice(1).toLowerCase() || " -"}
                  </Text>
                </View>

                <View style={styles.attributeText}>
                  <Text
                    style={[textStyles.body, { color: colors.textSecondary }]}
                  >
                    Sunlight requirement:
                  </Text>
                  <Text
                    style={[
                      textStyles.bodyMedium,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {plant.sunLight || " -"}
                  </Text>
                </View>
              </AccordionItem>
              <AccordionItem title="Sensors">
                <View style={styles.attributeText}>
                  <Text
                    style={[textStyles.body, { color: colors.textSecondary }]}
                  >
                    {" "}
                    Assigned sensor:
                  </Text>
                  {plant.sensorId ? (
                    <Button
                      style={{ flexShrink: 1 }}
                      type="tertiary"
                      text="Sensor"
                      onPress={() =>
                        router.push(`profile/sensors/${plant.sensorId}`)
                      }
                    />
                  ) : (
                    <Text
                      style={[textStyles.body, { color: colors.textPrimary }]}
                    >
                      {" "}
                      -
                    </Text>
                  )}
                </View>
              </AccordionItem>
            </Accordion>
          </View>
        </SafeAreaView>
      ) : deleting ? (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primaryDefault} />
          <Text>Deleting...</Text>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primaryDefault} />
          <Text>Loading...</Text>
        </View>
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

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: colors.primaryDefault,
    backgroundColor: colors.white,
    position: "relative",
  },
  plantImage: {
    width: "100%",
    height: 180,
    backgroundColor: colors.greyLight,
  },
  currentMoistureLevel: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: 8,
    gap: 4,
  },
  accordionContainer: {
    overflow: "hidden",
    borderBottomWidth: 1,
    borderColor: colors.primaryDefault,
  },
  rowSpaceBetween: {
    flexDirection: "row",
  },
  attributeContainer: {
    width: "100%",
    padding: 16,
    gap: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  attributeText: {
    flexDirection: "row",
    alignContent: "center",
    gap: 4,
  },
});

import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { CatalogPlant } from "@/types/models";
import { Stack, useLocalSearchParams } from "expo-router";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";

const CatalogPlantDetail = () => {
  const { databasePlants } = useGardensAndPlants();
  const [plant, setPlant] = useState<CatalogPlant | undefined>(undefined);
  const { catalogPlantId } = useLocalSearchParams();

  useEffect(() => {
    const plant = databasePlants?.find((plant) => plant.id === catalogPlantId);
    setPlant(plant);
  }, [databasePlants, catalogPlantId]);

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colors.primaryDefault },
          title: "Plant Information",
        }}
      />
      {plant ? (
        <View style={styles.pageContainer}>
          <Image
            source={{ uri: plant.imageUrl }}
            style={{ width: "100%", height: "50%" }}
          />
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={textStyles.h1}>{plant.name.commonName}</Text>
              <Text
                style={[textStyles.h3, { fontStyle: "italic", color: "gray" }]}
              >
                {plant.name.scientificName}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.paragraphText}>
                Sunlight: {plant.sunLight}
              </Text>
              <Text style={styles.paragraphText}>
                Water Frequency: {plant.waterFrequency}
              </Text>
              <Text style={styles.paragraphText}>
                Blooming:{" "}
                {plant.blooming
                  ? `${plant.blooming.start} till ${plant.blooming.end}`
                  : "This plant doesn't bloom"}
              </Text>
              <Text style={styles.paragraphText}>
                Flower Color: {plant.blooming?.flowerColor || "N/A"}
              </Text>
              <Text style={styles.paragraphText}>
                Harvest:{" "}
                {plant.harvest
                  ? `${plant.harvest.start} till ${plant.harvest.end}`
                  : "This plant cannot be harvested"}
              </Text>
              <Text style={styles.paragraphText}>
                Temperature Range: {plant.temperature.min}°C -{" "}
                {plant.temperature.max}°C
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text style={textStyles.h2}>Plant not found</Text>
      )}
    </>
  );
};

export default CatalogPlantDetail;

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  contentContainer: {
    height: "50%",
  },
  titleContainer: {
    backgroundColor: colors.secondaryDefault,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  textContainer: {
    padding: 8,
    gap: 3,
    justifyContent: "center",
    flex: 1,
  },
  paragraphText: {
    fontSize: 20,
  },
});

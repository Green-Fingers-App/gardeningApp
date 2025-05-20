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
    const plant = databasePlants?.find(
      (plant) => plant.id === Number(catalogPlantId)
    );
    setPlant(plant);
  }, [databasePlants, catalogPlantId]);

  return (
    <>
      <Stack.Screen
        options={{
          title: plant?.name.commonName || "Plant Information",
          headerStyle: { backgroundColor: colors.bgLight },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: textStyles.h3.fontFamily,
            fontWeight: textStyles.h3.fontWeight,
            color: colors.primaryDefault,
          },
          headerTintColor: colors.primaryDefault,
        }}
      />
      {plant ? (
        <View style={styles.pageContainer}>
          <Image
            source={{ uri: plant.imageUrl }}
            style={styles.plantImage}
            resizeMode="contain"
          />
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={textStyles.h3}>{plant.name.commonName}</Text>
              <Text
                style={[
                  textStyles.bodyMedium,
                  {
                    fontSize: 16,
                    fontStyle: "italic",
                    color: colors.textSecondary,
                  },
                ]}
              >
                {plant.name.scientificName}
              </Text>
            </View>
            <View style={styles.attributeContainer}>
              <View style={styles.attributeText}>
                <Text
                  style={[textStyles.body, { color: colors.textSecondary }]}
                >
                  {" "}
                  Sunlight:
                </Text>
                {plant.sunLight ? (
                  <Text
                    style={[
                      textStyles.bodyMedium,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {" "}
                    {plant.sunLight}
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
                  {" "}
                  Water Frequency:
                </Text>
                {plant.waterFrequency ? (
                  <Text
                    style={[
                      textStyles.bodyMedium,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {plant.waterFrequency.charAt(0) +
                      plant.waterFrequency.slice(1).toLowerCase()}
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
                  {" "}
                  Moisture level:
                </Text>
                {plant.neededMoisture ? (
                  <Text
                    style={[
                      textStyles.bodyMedium,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {" "}
                    {plant.neededMoisture}
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
                  {" "}
                  Blooming:
                </Text>
                {plant.blooming ? (
                  <Text
                    style={[
                      textStyles.bodyMedium,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {" "}
                    {plant.blooming.start} till {plant.blooming.end}
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
                  {" "}
                  Flower Color:
                </Text>
                {plant.blooming ? (
                  <Text
                    style={[
                      textStyles.bodyMedium,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {" "}
                    {plant.blooming.flowerColor}
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
                  {" "}
                  Harvest:
                </Text>
                {plant.harvest ? (
                  <Text
                    style={[
                      textStyles.bodyMedium,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {" "}
                    {plant.harvest.start} till {plant.harvest.end}
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
                  {" "}
                  Temperatur Range:
                </Text>
                {plant.temperature ? (
                  <Text
                    style={[
                      textStyles.bodyMedium,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {" "}
                    {plant.temperature.min} °C to {plant.temperature.max} °C
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
  plantImage: {
    width: "100%",
    height: 240,
    backgroundColor: colors.greyLight,
  },
  pageContainer: {
    justifyContent: "flex-end",
    flex: 1,
    borderTopWidth: 1,
    borderColor: colors.primaryDefault,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
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
  attributeContainer: {
    width: "100%",
    padding: 16,
    gap: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: 104,
  },
  attributeText: {
    flexDirection: "row",
    alignContent: "center",
    gap: 4,
  },
});

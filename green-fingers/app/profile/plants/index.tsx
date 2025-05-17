import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, ScrollView, Text } from "react-native";
import PlantCard from "@/components/PlantCard";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { UserPlant } from "@/types/models";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";

const Plants = () => {
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const { plants: contextPlants } = useGardensAndPlants();
  const router = useRouter();

  useEffect(() => {
    setPlants(contextPlants);
  }, [contextPlants]);

  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {plants.length === 0 ? (
          <Text style={[textStyles.h4, styles.emptyText]}>
            You don't have any plants yet. Click on the plus button to add one.
          </Text>
        ) : (
          plants.map((plant, index) => (
            <PlantCard
              plant={plant}
              key={index}
              onPress={() => router.push(`profile/plants/${plant.id}`)}
            />
          ))
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  scrollContainer: {
    padding: 8,
    paddingBottom: 104,
    alignItems: "stretch",
    gap: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: "75%",
    backgroundColor: colors.backDropLight,
    padding: 8,
    borderRadius: 8,
  },
});

export default Plants;

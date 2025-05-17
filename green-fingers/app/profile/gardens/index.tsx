import { ScrollView, StyleSheet, ImageBackground, Text } from "react-native";
import React from "react";
import GardenCard from "@/components/GardenCard";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";

const Gardens: React.FC = () => {
  const { gardens } = useGardensAndPlants();

  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {gardens.length === 0 ? (
          <Text style={[textStyles.h4, styles.emptyText]}>
            You don't have any gardens yet. Click on the plus button to add one.
          </Text>
        ) : (gardens.map((garden, index) => (
          <GardenCard key={index} garden={garden} />
        ))
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default Gardens;

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

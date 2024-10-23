import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { UserPlant } from "../types/models";
import colors from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface PlantCardProps {
  plant: UserPlant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.commonName}>{plant.plant.name.commonName}</Text>
        <MaterialCommunityIcons name="delete-outline" size={20} />
      </View>
      <Text style={styles.scientificName}>
        {plant.plant.name.scientificName}
      </Text>
      <Image width={80} height={80} style={styles.picture} />
      {plant.moistureLevel === "Too Low" ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <MaterialCommunityIcons name="alert-circle" size={15} />
          <Text>I'm thursty</Text>
        </View>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <MaterialCommunityIcons name="check-circle" size={15} />
          <Text>I'm okay</Text>
        </View>
      )}
    </View>
  );
};

export default PlantCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.backGroundSecondary,
    width: "95%",
    position: "relative",
    height: 96,
    paddingLeft: 8,
  },
  commonName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  scientificName: {
    fontStyle: "italic",
  },
  picture: {
    backgroundColor: "white",
    position: "absolute",
    top: 8,
    right: 8,
  },
});

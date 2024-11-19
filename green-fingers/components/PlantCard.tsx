import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { UserPlant } from "../types/models";
import colors from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useDeletePlant } from "@/hooks/useDeletePlant";

interface PlantCardProps {
  plant: UserPlant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const { deleting, handleDeletePlant } = useDeletePlant();

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => router.push(`profile/plants/${plant.id}`)}
    >
      {!deleting ? (
        <>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.commonName}>{plant.name.commonName}</Text>
            <Pressable
              onPress={() => handleDeletePlant(plant)}
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.activeDelete,
                {
                  opacity: pressed ? 0.7 : 1,
                  transform: [{ scale: pressed ? 0.9 : 1 }],
                },
              ]}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={20}
                color={"black"}
              />
            </Pressable>
          </View>
          <Text style={styles.scientificName}>{plant.name.scientificName}</Text>
          <Image width={80} height={80} style={styles.picture} />
          {plant.moistureLevel === "Too Low" ? (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <MaterialCommunityIcons name="alert-circle" size={15} />
              <Text>I'm thirsty</Text>
            </View>
          ) : (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <MaterialCommunityIcons name="check-circle" size={15} />
              <Text>I'm okay</Text>
            </View>
          )}
        </>
      ) : (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="small" color="#457D58" />
          <Text> Deleting... </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PlantCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.bgCard,
    width: "95%",
    position: "relative",
    height: 96,
    paddingLeft: 8,
    borderRadius: 8,
    justifyContent: "center",
  },
  commonName: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 8,
  },
  scientificName: {
    fontStyle: "italic",
    color: "gray",
  },
  picture: {
    backgroundColor: "white",
    width: 80,
    height: 80,
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 4,
  },
  deleteButton: {
    padding: 1,
  },
  activeDelete: {
    opacity: 0.7,
  },
});

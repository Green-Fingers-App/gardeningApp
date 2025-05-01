import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { CatalogPlant, UserPlant } from "../types/models";
import colors from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { shouldBeWatered } from "@/utils/plant";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";

interface PlantCardProps extends React.ComponentProps<typeof TouchableOpacity> {
  plant: UserPlant | CatalogPlant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, ...props }) => {
  const thirsty = shouldBeWatered(plant as UserPlant);
  const { deleteUserPlant } = useGardensAndPlants();

  return (
    <TouchableOpacity {...props} style={{ width: "95%" }}>
      <View style={styles.cardContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.commonName}>
            {"nickName" in plant ? plant.nickName : plant.name.commonName}
          </Text>
          {"nickName" in plant && (
            <Pressable
              onPress={() => deleteUserPlant(plant.id)}
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
          )}
        </View>
        <View>
          <Text style={styles.scientificName}>
            {"nickName" in plant
              ? plant.name.commonName
              : plant.name.scientificName}
          </Text>
          {"nickName" in plant && thirsty ? (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <MaterialCommunityIcons name="alert-circle" size={15} />
              <Text>I'm thirsty</Text>
            </View>
          ) : (
            "nickName" in plant && (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <MaterialCommunityIcons name="check-circle" size={15} />
                <Text>I'm okay</Text>
              </View>
            )
          )}
        </View>
      </View>
      <Image
        source={{ uri: plant.imageUrl }}
        width={80}
        height={80}
        style={styles.picture}
      />
    </TouchableOpacity>
  );
};

export default PlantCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.bgCard,
    position: "relative",
    height: 96,
    paddingTop: 8,
    paddingLeft: 8,
    borderRadius: 8,
    flexDirection: "column",
    width: "100%",
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

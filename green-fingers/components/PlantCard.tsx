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
import { CatalogPlant, UserPlant } from "../types/models";
import colors from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDeletePlant } from "@/hooks/useDeletePlant";
import { shouldBeWatered } from "@/utils/plant";

interface PlantCardProps extends React.ComponentProps<typeof TouchableOpacity> {
  plant: UserPlant | CatalogPlant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, ...props }) => {
  const { deleting, handleDeletePlant } = useDeletePlant();
  const thirsty = shouldBeWatered(plant as UserPlant);

  return (
    <TouchableOpacity {...props} style={styles.cardContainer}>
      {!deleting ? (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.commonName}>
              {"nickName" in plant ? plant.nickName : plant.name.commonName}
            </Text>
            {"nickName" in plant && (
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
            )}
          </View>
          <Text style={styles.scientificName}>
            {"nickName" in plant
              ? plant.name.commonName
              : plant.name.scientificName}
          </Text>
          <Image
            source={{ uri: plant.imageUrl }}
            width={80}
            height={80}
            style={styles.picture}
          />
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

import { useState } from "react";
import { Alert } from "react-native";
import { UserPlant } from "../types/models";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";

export const useDeletePlant = () => {
  const [deleting, setDeleting] = useState(false);
  const { deleteUserPlant } = useGardensAndPlants();

  const handleDeletePlant = (plant: UserPlant) => {
    Alert.alert(
      "Delete Plant",
      `Do you want to delete the plant: ${plant.name.commonName}?`,
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              console.log(`Plant ${plant.nickName} deleted`);
              setDeleting(true);
              console.log(plant.id);
              await deleteUserPlant(plant.id);
              setDeleting(false);
            } catch (error) {
              setDeleting(false);
              Alert.alert(
                "Error",
                "Something went wrong while deleting the plant."
              );
            }
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return { handleDeletePlant, deleting };
};

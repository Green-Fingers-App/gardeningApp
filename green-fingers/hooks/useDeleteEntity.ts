import { useState } from "react";
import { Alert } from "react-native";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { useMoistureSensors } from "@/context/MoistureSensorContext";
import { useRouter } from "expo-router";

type DeleteEntityHook = {
  handleDeleteEntity: (entity: { id: number; name: string }) => void;
  deleting: boolean;
};

export const useDeleteEntity = (
  entityType: "Plant" | "Garden" | "Sensor"
): DeleteEntityHook => {
  const [deleting, setDeleting] = useState(false);
  const { deleteUserPlant, deleteUserGarden } = useGardensAndPlants();
  const { deleteMoistureSensor } = useMoistureSensors();
  const router = useRouter();

  const deleteFunctions = {
    Plant: deleteUserPlant,
    Garden: deleteUserGarden,
    Sensor: deleteMoistureSensor,
  };

  const handleDeleteEntity = (entity: { id: number; name: string }) => {
    console.log("About to delete: ", entity);
    Alert.alert(
      `Delete ${entityType}`,
      `Do you want to delete the ${entityType.toLowerCase()}: ${entity.name
      }, and everything it contains?`,
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              console.log(`${entityType} ${entity.name} deleted`);
              setDeleting(true);
              deleteFunctions[entityType](entity.id);
            } catch (error) {
              Alert.alert(
                "Error",
                `Something went wrong while deleting the ${entityType.toLowerCase()}.`
              );
            } finally {
              setDeleting(false);
              let path = "";
              if (entityType === "Plant") {
                path = "/profile/plants";
              } else if (entityType === "Garden") {
                path = "/profile/gardens";
              } else {
                path = "/profile/sensors"
              }
              router.push(path);
            }
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return { handleDeleteEntity, deleting };
};

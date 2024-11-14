import { useState } from "react";
import { Alert } from "react-native";
import { UserPlant } from "../types/models";

export const useDeletePlant = () => {
  const [deleting, setDeleting] = useState(false); 


  const handleDeletePlant = (plant: UserPlant) => {
    Alert.alert("Delete Plant", `Do you want to delete the plant: ${plant.plant.name.commonName}?`, [
      {
        text: "Yes",
        onPress: async () => {
          try {
            setDeleting(true); 
            console.log(`Plant ${plant.plant.name.commonName} deleted`);
            setTimeout(()=>setDeleting(false), 1000);

          } catch (error) {
            setDeleting(false);
            Alert.alert("Error", "Something went wrong while deleting the plant.");
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return { handleDeletePlant, deleting };
}

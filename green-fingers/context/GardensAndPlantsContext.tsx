import React, { createContext, ReactNode, useContext, useState } from "react";
import { PlantContextProps } from "@/types/plantTypes";
import {
  userPlants as importPlants,
  gardens as importGardens,
} from "../dummyData/dummyData";
import { Garden, UserPlant } from "../types/models";
import { CatalogPlant } from "../types/plantTypes";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, orderBy, startAt, endAt, getDocs } from "firebase/firestore";

const PlantsContext = createContext<PlantContextProps | undefined>(undefined);

export const PlantsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [databasePlants, setDatabasePlants] = useState<CatalogPlant[]>([]);

  const fetchPlants = async (userId: string, token: string): Promise<void> => {
    const newPlants = importPlants;
    setPlants(newPlants);
  };

  const fetchAllPlants = async () => {
    try {
      const plantsCollection = collection(db, "plants");
      const querySnapshot = await getDocs(plantsCollection);
      const allPlants = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as CatalogPlant)
      );
      setDatabasePlants(allPlants);
    } catch (err) {
      console.error("Error fetching plants:", err);
    }
  };

  const fetchPlantsByCommonName = async (input: string): Promise<CatalogPlant[]> => {
    try {
      const plantsCollection = collection(db, "plant-catalog");
      const q = query(
        plantsCollection,
        orderBy("name.commonName"),
        startAt(input),
        endAt(input + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      const plants: CatalogPlant[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CatalogPlant[];
      setDatabasePlants(plants);
      return plants;
    } catch (err) {
      console.error("Error fetching plants by common name:", err);
      throw err;
    }
  };

  const fetchGardens = (userId: string, token: string) => {
    const newGardens = importGardens;
    setGardens(newGardens);
  };

  const fetchPlantDetail = (plantId: string): UserPlant | undefined => {
    const plant = plants.find((plant) => plant.id === plantId);
    return plant;
  };

  const fetchGardenDetail = (gardenId: string): Garden | undefined => {
    const garden = gardens.find((garden) => garden.id === gardenId);
    return garden;
  };

  const plantMap = new Map(plants.map((plant) => [plant.id, plant]));

  const fetchGardenPlants = (gardenId: string): UserPlant[] | undefined => {
    const garden = gardens.find((garden) => gardenId === garden.id);
    if (garden) {
      return garden.plantIds
        .map((plantId) => plantMap.get(plantId))
        .filter(Boolean) as UserPlant[];
    }
    return undefined;
  };

  return (
    <PlantsContext.Provider
      value={{
        plants,
        fetchPlants,
        fetchPlantDetail,
        fetchAllPlants,
        fetchPlantsByCommonName,
        gardens,
        fetchGardens,
        fetchGardenDetail,
        fetchGardenPlants,
        databasePlants,
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
};

export const useGardensAndPlants = () => {
  const context = useContext(PlantsContext);
  if (!context) {
    throw new Error("usePlants must be used within an PlantsProvider");
  }
  return context;
};

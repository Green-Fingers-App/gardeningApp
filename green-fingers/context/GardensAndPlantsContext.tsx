import React, { createContext, ReactNode, useContext, useState } from "react";
import { PlantContextProps } from "@/types/plantTypes";
import {
  userPlants as importPlants,
  gardens as importGardens,
} from "../dummyData/dummyData";
import { Garden, UserPlant } from "../types/models";

const PlantsContext = createContext<PlantContextProps | undefined>(undefined);

export const PlantsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const [gardens, setGardens] = useState<Garden[]>([]);

  const fetchPlants = async (userId: string, token: string): Promise<void> => {
    const newPlants = importPlants;
    setPlants(newPlants);
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
        gardens,
        fetchGardens,
        fetchGardenDetail,
        fetchGardenPlants,
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
};

export const useGardensAndPlants = () => {
  const context = useContext(PlantsContext);
  if (!context) {
    throw new Error("useGardensAndPlants must be used within a PlantsProvider");
  }
  return context;
};

import React, { createContext, ReactNode, useContext, useState } from "react";
import { PlantContextProps } from "@/types/plantTypes";
import { userPlants as importPlants } from "../dummyData/dummyData";
import { UserPlant } from "../types/models";

const PlantsContext = createContext<PlantContextProps | undefined>(undefined);

export const PlantsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [plants, setPlants] = useState<UserPlant[]>([]);

  const fetchPlants = (userId: number, token: string) => {
    const newPlants = importPlants;
    setPlants(newPlants);
    return;
  };

  const fetchPlantDetail = (plantId: string): UserPlant | undefined => {
    const plant = plants.find((plant) => plant.id === plantId);
    return plant;
  };

  return (
    <PlantsContext.Provider value={{ plants, fetchPlants, fetchPlantDetail }}>
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

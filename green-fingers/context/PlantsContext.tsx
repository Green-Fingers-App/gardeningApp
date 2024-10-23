import React, { createContext, ReactNode, useContext, useState } from "react";
import { PlantContextProps } from "@/types/plantTypes";
import { Plant } from "../../databaseStructure/models";
import { plants as importPlants } from "../../databaseStructure/dummyData";

const PlantsContext = createContext<PlantContextProps | undefined>(undefined);

export const PlantsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [plants, setPlants] = useState<Plant[] | null>(null);

  const fetchPlants = (userId: number, token: string) => {
    const newPlants = importPlants;
    setPlants(newPlants);
    return;
  };
  return (
    <PlantsContext.Provider value={{ plants, fetchPlants }}>
      {children}
    </PlantsContext.Provider>
  );
};

export const usePlants = () => {
  const context = useContext(PlantsContext);
  if (!context) {
    throw new Error("usePlants must be used within an Authprovider");
  }
  return context;
};

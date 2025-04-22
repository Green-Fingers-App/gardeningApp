import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  Garden,
  CatalogPlant,
  UserPlant,
  AddUserPlant,
  AddGarden,
} from "../types/models";
import { useAuth } from "@/context/AuthContext";
import {
  apiCreateUserPlant,
  apiGetCatalogPlants,
  updateUserPlant,
  apiDeleteUserPlant,
  apiGetUserPlants,
} from "@/api/plantService";
import {
  apiAddGarden,
  apiDeleteGarden,
  apiGetUserGardens,
} from "@/api/gardenService";

interface PlantContextProps {
  plants: UserPlant[];
  gardens: Garden[];
  databasePlants: CatalogPlant[];
  fetchUserPlants: () => void;
  fetchCatalogPlants: () => void;
  searchPlantsByCommonName: (input: string) => Promise<CatalogPlant[]>;
  createUserPlant: (plantData: AddUserPlant) => void;
  updatePlant: (plantId: string, plantData: Partial<AddUserPlant>) => void;
  deleteUserPlant: (plantId: string) => void;
  fetchUserGardens: () => void;
  fetchPlantDetail: (plantId: string) => UserPlant | undefined;
  fetchGardenDetail: (gardenId: string) => Garden | undefined;
  fetchGardenPlants: (gardenId: string) => UserPlant[] | undefined;
  createGarden: (gardenData: AddGarden) => void;
  updateUserGarden: (gardenId: number, gardenData: Partial<AddGarden>) => void;
  deleteUserGarden: (gardenId: number) => void;
}

const PlantsContext = createContext<PlantContextProps | undefined>(undefined);

export const PlantsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [databasePlants, setDatabasePlants] = useState<CatalogPlant[]>([]);

  const { user } = useAuth();

  // Fetch user's gardens from Firestore
  const fetchUserGardens = async () => {
    if (!user) return;
    const gardens = await apiGetUserGardens();
    if (gardens) {
      setGardens(gardens);
    }
  };

  const fetchUserPlants = async () => {
    try {
      const plantsData = await apiGetUserPlants();
      setPlants(plantsData);
    } catch (error) {
      console.error("Error fetching user plants: ", error);
    }
  };

  const searchPlantsByCommonName = async (input: string) => {};

  const fetchCatalogPlants = async () => {
    try {
      const plantsData = await apiGetCatalogPlants();
      setDatabasePlants(plantsData);
    } catch (error) {
      console.error("Error fetching catalog plants: ", error);
    }
  };

  // Fetch plant details by ID
  const fetchPlantDetail = (plantId: string): UserPlant | undefined => {
    return plants.find((plant) => plant.id === parseInt(plantId, 10));
  };

  // Fetch garden details by ID
  const fetchGardenDetail = (gardenId: string): Garden | undefined => {
    return gardens.find((garden) => garden.id == parseInt(gardenId, 10));
  };

  // Fetch plants linked to a specific garden
  const fetchGardenPlants = (gardenId: string): UserPlant[] | undefined => {
    const gardenPlants = plants.filter(
      (plant) => plant.garden_id === parseInt(gardenId)
    );
    return gardenPlants;
  };

  // Create new plant
  const createUserPlant = async (plantData: AddUserPlant) => {
    try {
      const id = await apiCreateUserPlant(plantData);
      if (id) {
        setPlants((prevPlants) => [...prevPlants, { ...plantData, id }]);
      }
    } catch (error) {
      console.error("Error creating plant:", error);
    }
  };

  // Update plant
  const updatePlant = async (
    plantId: number,
    plantData: Partial<AddUserPlant>
  ) => {
    try {
      await updateUserPlant(plantId, plantData);
      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.id === plantId ? { ...plant, ...plantData } : plant
        )
      );
    } catch (error) {
      console.error("Error updating plant:", error);
    }
  };

  // Delete plant
  const deleteUserPlant = async (plantId: number) => {
    try {
      await apiDeleteUserPlant(plantId);
      setPlants((prevPlants) =>
        prevPlants.filter((plant) => plant.id !== plantId)
      );
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  const createGarden = async (gardenData: AddGarden) => {
    try {
      const garden = await apiAddGarden(gardenData);
      if (garden) {
        const { id } = garden;
        setGardens((prevGardens) => [...prevGardens, { ...gardenData, id }]);
      }
    } catch (error) {
      console.error("Error creating garden: ", error);
    }
  };

  // Update user garden
  const updateUserGarden = async (
    gardenId: number,
    gardenData: Partial<AddGarden>
  ) => {
    try {
      await updateGarden(gardenId, gardenData);
      setGardens((prevGardens) =>
        prevGardens.map((garden) =>
          garden.id === gardenId ? { ...garden, ...gardenData } : garden
        )
      );
    } catch (error) {
      console.error("Error updating garden:", error);
    }
  };

  // Delete garden
  const deleteUserGarden = async (gardenId: number) => {
    try {
      await apiDeleteGarden(gardenId);
      setPlants((prevPlants) =>
        prevPlants.filter((plant) => plant.garden_id !== gardenId)
      );
      setGardens((prevGardens) =>
        prevGardens.filter((garden) => garden.id !== gardenId)
      );
    } catch (error) {
      console.error("Error deleting garden:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserGardens();
      fetchUserPlants();
      fetchCatalogPlants();
    }
  }, [user?.id]);

  return (
    <PlantsContext.Provider
      value={{
        plants,
        fetchUserPlants,
        fetchCatalogPlants,
        searchPlantsByCommonName,
        createUserPlant,
        updatePlant,
        deleteUserPlant,
        gardens,
        fetchUserGardens,
        fetchPlantDetail,
        fetchGardenDetail,
        fetchGardenPlants,
        createGarden,
        updateUserGarden,
        deleteUserGarden,
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
    throw new Error("useGardensAndPlants must be used within a PlantsProvider");
  }
  return context;
};

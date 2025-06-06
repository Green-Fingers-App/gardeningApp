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
import { useToast } from "./ToastContext";
import {
  apiCreateUserPlant,
  apiGetCatalogPlants,
  apiUpdateUserPlant,
  apiDeleteUserPlant,
  apiGetUserPlants,
  apiSearchCatalogPlantsByCommonName,
  apiBatchUpdateWateredDate,
  apiEditWateredDate,
} from "@/api/plantService";
import {
  apiAddGarden,
  apiDeleteGarden,
  apiGetUserGardens,
  apiUpdateGarden,
} from "@/api/gardenService";
import {
  removeWateringAppointment,
  setWateringAppointments,
  addWateringAppointments,
} from "@/utils/calendar";
import PlantsLayout from "@/app/profile/plants/_layout";

interface PlantContextProps {
  plants: UserPlant[];
  gardens: Garden[];
  databasePlants: CatalogPlant[];
  fetchUserPlants: () => void;
  batchUpdateWateredDate: (plantIds: number[]) => Promise<void>;
  singleUpdateWateredDate: (
    plantId: number,
    wateredDate: string
  ) => Promise<undefined | { error: string }>;
  fetchCatalogPlants: () => void;
  searchPlantsByCommonName: (input: string) => Promise<CatalogPlant[]>;
  createUserPlant: (plantData: AddUserPlant) => Promise<void>;
  updateUserPlant: (
    plantId: number,
    plantData: Partial<AddUserPlant>
  ) => Promise<UserPlant | undefined>;
  deleteUserPlant: (plantId: number) => Promise<void>;
  fetchUserGardens: () => Promise<void>;
  fetchPlantDetail: (plantId: string) => UserPlant | undefined;
  fetchGardenDetail: (gardenId: string) => Garden | undefined;
  fetchGardenPlants: (gardenId: string) => UserPlant[] | undefined;
  createGarden: (gardenData: AddGarden) => void;
  updateUserGarden: (
    gardenId: number,
    gardenData: Partial<AddGarden>
  ) => Promise<Garden | undefined>;
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
  const { showToast } = useToast();

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
      const wateringData = plantsData.map((plant) => ({
        nickName: plant.nickName,
        waterFrequency: plant.waterFrequency,
        id: plant.id,
      }));
      await setWateringAppointments(wateringData);
    } catch (error) {
      showToast("error", (error as Error).message);
    }
  };

  const batchUpdateWateredDate = async (plantIds: number[]) => {
    try {
      await apiBatchUpdateWateredDate(plantIds);
      const updatedPlants = plants.map((plant) => {
        if (plantIds.includes(plant.id)) {
          return {
            ...plant,
            wateredDate: new Date().toISOString().split("T")[0],
          };
        }
        return plant;
      });
      setPlants(updatedPlants);
    } catch (error) {
      console.error("Error updating watering date: ", error);
    }
  };

  const singleUpdateWateredDate = async (
    plantId: number,
    wateredDate: string
  ): Promise<undefined | { error: string }> => {
    try {
      await apiEditWateredDate(plantId, wateredDate);
      const updatedPlants = plants.map((plant) => {
        if (plantId === plant.id) {
          return { ...plant, wateredDate: wateredDate };
        }
        return plant;
      });
      setPlants(updatedPlants);
    } catch (error) {
      return { error: "Updating watering plant failed" };
    }
  };

  const searchPlantsByCommonName = async (
    input: string
  ): Promise<CatalogPlant[]> => {
    if (input.trim().length === 0) {
      return [];
    }

    const localFilteredPlants = databasePlants.filter((plant) =>
      plant.name.commonName.toLowerCase().includes(input.toLowerCase())
    );

    if (localFilteredPlants.length > 0) {
      return localFilteredPlants;
    }

    try {
      const response = await apiSearchCatalogPlantsByCommonName(input);
      return response ? response : [];
    } catch (error) {
      showToast("error", (error as Error).message);
      return [];
    }
  };

  const fetchCatalogPlants = async () => {
    try {
      const plantsData = await apiGetCatalogPlants();
      setDatabasePlants(plantsData);
    } catch (error) {
      showToast("error", (error as Error).message);
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
      await addWateringAppointments({ ...plantData, id: id });
      showToast("success", "Plant created");
    } catch (error) {
      showToast("error", (error as Error).message);
    }
  };

  // Update plant
  const updateUserPlant = async (
    plantId: number,
    plantData: Partial<{ nickname: string; garden_id: number }>
  ): Promise<UserPlant | undefined> => {
    try {
      await apiUpdateUserPlant(plantId, plantData);
      const updatedPlants = plants.map((plant) => {
        if (plant.id === plantId) {
          return {
            ...plant,
            nickName: plantData.nickname || plant.nickName,
            garden_id: plantData.garden_id || plant.garden_id,
          };
        }
        return plant;
      });
      setPlants(updatedPlants);
      showToast("success", "Plant updated");
      return updatedPlants.find((plant) => plant.id === plantId);
    } catch (error) {
      showToast("error", (error as Error).message);
      return undefined;
    }
  };

  // Delete plant
  const deleteUserPlant = async (plantId: number) => {
    try {
      await apiDeleteUserPlant(plantId);
      const updatedPlants = plants.filter((plant) => plant.id !== plantId);
      setPlants(updatedPlants);
      const updatedGardens = gardens.map((garden) => {
        const gardenPlants = updatedPlants.filter(
          (plant) => plant.garden_id === garden.id
        );
        return { ...garden, plants: gardenPlants };
      });
      await removeWateringAppointment({ id: plantId });
      setGardens(updatedGardens);
      showToast("success", "Plant deleted");
    } catch (error) {
      showToast("error", (error as Error).message);
    }
  };

  const createGarden = async (gardenData: AddGarden) => {
    try {
      const garden = await apiAddGarden(gardenData);
      if (garden) {
        const { id } = garden;
        setGardens((prevGardens) => [...prevGardens, { ...gardenData, id }]);
      }
      showToast("success", "Garden created");
    } catch (error) {
      showToast("error", (error as Error).message);
    }
  };

  // Update user garden
  const updateUserGarden = async (
    gardenId: number,
    gardenData: Partial<AddGarden>
  ): Promise<Garden | undefined> => {
    try {
      await apiUpdateGarden(gardenId, gardenData);
      setGardens((prevGardens) =>
        prevGardens.map((garden) =>
          garden.id === gardenId ? { ...garden, ...gardenData } : garden
        )
      );
      showToast("success", "Garden updated");
      return gardens.find((garden) => garden.id === gardenId);
    } catch (error) {
      showToast("error", (error as Error).message);
      return undefined;
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
      showToast("success", "Garden deleted");
    } catch (error) {
      showToast("error", (error as Error).message);
    }
  };

  useEffect(() => {
    if (user?.id) {
      void fetchUserGardens();
      void fetchUserPlants();
      void fetchCatalogPlants();
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
        updateUserPlant,
        deleteUserPlant,
        batchUpdateWateredDate,
        singleUpdateWateredDate,
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

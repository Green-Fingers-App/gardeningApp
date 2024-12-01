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
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs,
  where,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import {
  addGarden,
  addPlant,
  deletePlant,
  deleteGarden,
  updateUserPlant,
  updateGarden,
} from "@/firebase/plantService";

interface PlantContextProps {
  plants: UserPlant[];
  gardens: Garden[];
  databasePlants: CatalogPlant[];
  fetchPlants: () => void;
  fetchAllPlants: () => void;
  fetchPlantsByCommonName: (input: string) => Promise<CatalogPlant[]>;
  createPlant: (plantData: AddUserPlant) => void;
  updatePlant: (plantId: string, plantData: Partial<AddUserPlant>) => void;
  deleteUserPlant: (plantId: string) => void;
  fetchGardens: () => void;
  fetchPlantDetail: (plantId: string) => UserPlant | undefined;
  fetchGardenDetail: (gardenId: string) => Garden | undefined;
  fetchGardenPlants: (gardenId: string) => UserPlant[] | undefined;
  createGarden: (gardenData: AddGarden) => void;
  updateUserGarden: (gardenId: string, gardenData: Partial<AddGarden>) => void;
  deleteUserGarden: (gardenId: string) => void;
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
  const fetchGardens = async () => {
    if (!user?.id) return;

    try {
      const gardensQuery = query(
        collection(db, "gardens"),
        where("userId", "==", user.id)
      );

      const snapshot = await getDocs(gardensQuery);
      const userGardens = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Garden)
      );

      setGardens(userGardens);
    } catch (error) {
      console.error("Error fetching gardens:", error);
    }
  };

  // Fetch user's plants from Firestore
  const fetchPlants = async () => {
    if (!user?.id) return;

    try {
      const plantsQuery = query(
        collection(db, "user-plants"),
        where("userId", "==", user.id)
      );

      const snapshot = await getDocs(plantsQuery);
      const userPlants = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as UserPlant)
      );
      setPlants(userPlants);
      console.log("Fetched plants:", userPlants);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const fetchPlantsByCommonName = async (
    input: string
  ): Promise<CatalogPlant[]> => {
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

  // Fetch all plants in the catalog
  const fetchAllPlants = async () => {
    try {
      const plantsCollection = collection(db, "plant-catalog");
      const querySnapshot = await getDocs(plantsCollection);
      const allPlants = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as CatalogPlant)
      );
      setDatabasePlants(allPlants);
    } catch (err) {
      console.error("Error fetching plants:", err);
    }
  };

  // Fetch plant details by ID
  const fetchPlantDetail = (plantId: string): UserPlant | undefined => {
    return plants.find((plant) => plant.id === plantId);
  };

  // Fetch garden details by ID
  const fetchGardenDetail = (gardenId: string): Garden | undefined => {
    return gardens.find((garden) => garden.id === gardenId);
  };

  // Fetch plants linked to a specific garden
  const fetchGardenPlants = (gardenId: string): UserPlant[] | undefined => {
    const gardenPlants = plants.filter((plant) => plant.garden_id === gardenId);
    return gardenPlants;
  };

  // Create new plant
  const createPlant = async (plantData: AddUserPlant) => {
    try {
      const id = await addPlant(plantData);
      if (id) {
        setPlants((prevPlants) => [...prevPlants, { ...plantData, id }]);
      }
    } catch (error) {
      console.error("Error creating plant:", error);
    }
  };

  // Update plant
  const updatePlant = async (
    plantId: string,
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
  const deleteUserPlant = async (plantId: string) => {
    try {
      await deletePlant(plantId);
      setPlants((prevPlants) =>
        prevPlants.filter((plant) => plant.id !== plantId)
      );
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  const createGarden = async (gardenData: AddGarden) => {
    try {
      const id = await addGarden(gardenData);
      if (id) {
        setGardens((prevGardens) => [...prevGardens, { ...gardenData, id }]);
      }
    } catch (error) {
      console.error("Error creating garden: ", error);
    }
  };

  // Update user garden
  const updateUserGarden = async (
    gardenId: string,
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
  const deleteUserGarden = async (gardenId: string) => {
    try {
      const plantsInGarden = plants.filter(
        (plant) => plant.garden_id === gardenId
      );
      await Promise.all(
        plantsInGarden.map((plant) => deleteUserPlant(plant.id))
      );
      await deleteGarden(gardenId);
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
      fetchGardens();
      fetchPlants();
      fetchAllPlants();
    }
  }, [user?.id]);

  return (
    <PlantsContext.Provider
      value={{
        plants,
        fetchPlants,
        fetchAllPlants,
        fetchPlantsByCommonName,
        createPlant,
        updatePlant,
        deleteUserPlant,
        gardens,
        fetchGardens,
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

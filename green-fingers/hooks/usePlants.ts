// hooks/usePlants.ts
import { useState, useEffect } from "react";
import { addPlant, getPlant, updatePlant, deletePlant } from "../firebase/plantService";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Plant } from "../types/models";

export const usePlants = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plant, setPlant] = useState<Plant | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  // Fetch a single plant by ID
  const fetchPlant = async (plantId: string) => {
    try {
      const data = await getPlant(plantId);
      if (data) {
        setPlant(data);
      }
    } catch (err) {
      setError("Failed to fetch plant.");
    }
  };

  // Fetch all plants from Firestore
  const fetchAllPlants = async () => {
    try {
      const plantsCollection = collection(db, "plant-catalog");
      const querySnapshot = await getDocs(plantsCollection);
      const allPlants = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Plant));
      setPlants(allPlants);
    } catch (err) {
      console.error("Error fetching plants:", err);
      setError("Failed to fetch plants.");
    }
  };

  const createPlant = async (plantData: Plant) => {
    try {
      const id = await addPlant(plantData);
      if (id) {
        setPlants((prevPlants) => [...prevPlants, { ...plantData, id }]);
      }
    } catch (err) {
      setError("Failed to add plant.");
    }
  };

  const modifyPlant = async (plantId: string, updatedData: Partial<Plant>) => {
    try {
      await updatePlant(plantId, updatedData);
      setPlants((prevPlants) =>
        prevPlants.map((plant) => (plant.id === plantId ? { ...plant, ...updatedData } : plant))
      );
    } catch (err) {
      setError("Failed to update plant.");
    }
  };

  const removePlant = async (plantId: string) => {
    try {
      await deletePlant(plantId);
      setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== plantId));
    } catch (err) {
      setError("Failed to delete plant.");
    }
  };

  return {
    plants,
    plant,
    error,
    fetchPlant,
    fetchAllPlants, 
    createPlant,
    modifyPlant,
    removePlant,
  };
};


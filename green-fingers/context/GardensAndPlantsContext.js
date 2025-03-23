import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

// Create the context
const PlantsContext = createContext();

// PlantsProvider component
export const PlantsProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [gardens, setGardens] = useState([]);
  const [databasePlants, setDatabasePlants] = useState([]);

  const { user } = useAuth();

  // Fetch user's gardens
  const fetchGardens = async () => {
    if (!user?.id) return;

    try {
      const response = await axios.get("/api/gardens", { params: { userId: user.id } });
      setGardens(response.data);
    } catch (error) {
      console.error("Error fetching gardens:", error);
    }
  };

  // Fetch user's plants
  const fetchPlants = async () => {
    if (!user?.id) return;

    try {
      const response = await axios.get("/api/user-plants", { params: { userId: user.id } });
      setPlants(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  // Fetch plants by common name
  const fetchPlantsByCommonName = async (input) => {
    try {
      const response = await axios.get("/api/plants/search", { params: { query: input } });
      setDatabasePlants(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching plants by common name:", error);
      throw error;
    }
  };

  // Fetch all plants in the catalog
  const fetchAllPlants = async () => {
    try {
      const response = await axios.get("/api/plants");
      setDatabasePlants(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  // Fetch plant details by ID
  const fetchPlantDetail = (plantId) => {
    return plants.find((plant) => plant.id === plantId);
  };

  // Fetch garden details by ID
  const fetchGardenDetail = (gardenId) => {
    return gardens.find((garden) => garden.id === gardenId);
  };

  // Fetch plants linked to a specific garden
  const fetchGardenPlants = (gardenId) => {
    return plants.filter((plant) => plant.garden_id === gardenId);
  };

  // Create new plant
  const createPlant = async (plantData) => {
    try {
      const response = await axios.post("/api/user-plants", { ...plantData, userId: user?.id });
      setPlants((prevPlants) => [...prevPlants, response.data]);
    } catch (error) {
      console.error("Error creating plant:", error);
    }
  };

  // Update plant
  const updatePlant = async (plantId, plantData) => {
    try {
      const response = await axios.put(`/api/user-plants/${plantId}`, plantData);
      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.id === plantId ? { ...plant, ...response.data } : plant
        )
      );
    } catch (error) {
      console.error("Error updating plant:", error);
    }
  };

  // Delete plant
  const deleteUserPlant = async (plantId) => {
    try {
      await axios.delete(`/api/user-plants/${plantId}`);
      setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== plantId));
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  // Create a garden
  const createGarden = async (gardenData) => {
    try {
      const response = await axios.post("/api/gardens", { ...gardenData, userId: user?.id });
      setGardens((prevGardens) => [...prevGardens, response.data]);
    } catch (error) {
      console.error("Error creating garden:", error);
    }
  };

  // Update garden
  const updateUserGarden = async (gardenId, gardenData) => {
    try {
      const response = await axios.put(`/api/gardens/${gardenId}`, gardenData);
      setGardens((prevGardens) =>
        prevGardens.map((garden) =>
          garden.id === gardenId ? { ...garden, ...response.data } : garden
        )
      );
    } catch (error) {
      console.error("Error updating garden:", error);
    }
  };

  // Delete garden
  const deleteUserGarden = async (gardenId) => {
    try {
      await axios.delete(`/api/gardens/${gardenId}`);
      setGardens((prevGardens) => prevGardens.filter((garden) => garden.id !== gardenId));
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

// Custom hook to use the context
export const useGardensAndPlants = () => {
  const context = useContext(PlantsContext);
  if (!context) {
    throw new Error("useGardensAndPlants must be used within a PlantsProvider");
  }
  return context;
};
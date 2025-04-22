import { CatalogPlant, Plant, UserPlant } from "../types/models";
import { AddUserPlant } from "../types/models";
import * as SecureStore from 'expo-secure-store';

const base_api_ip = "https://greenfingers.truenas.work/api";

// Add a new plant species
export const apiCreateUserPlant = async (plantData: AddUserPlant): Promise<number | undefined> => {
  const {nickName, catalogPlant_id, userId, garden_id } = plantData;
  const token = await SecureStore.getItemAsync('accessToken');

  try {
    const response = await fetch(`${base_api_ip}/plants`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        nickname: nickName,
        plant_id: catalogPlant_id,
        user_id: userId,
        garden_id: garden_id,
      },
      )
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json() as UserPlant;
    return data.id; // or return data.rows[0] depending on what backend returns

  } catch (error) {
    console.error("Error adding plant: ", error);
  }
};

export const apiGetUserPlants = async (): Promise<UserPlant[]> => {
  const token = await SecureStore.getItemAsync('accessToken');

  try {
    const response = await fetch(`${base_api_ip}/users/plants`, {
      method: 'GET',
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch user plants: ${errorData}`)
    }

    const data = await response.json() as UserPlant[]
    
    return data? data: [];

  } catch (error) {
    console.error("Error fetching user plants: ", error)
    return [];
  }
}

export const apiDeleteUserPlant = async (plantId: number): Promise<void> => {
  const token = await SecureStore.getItemAsync('accessToken');

  try {
    const response = await fetch(`${base_api_ip}/plants/${plantId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete plant: ${JSON.stringify(errorData)}`);
    }

  } catch (error) {
    console.error("Error deleting plant:", error);
    throw error;
  }
};



// Update User Plant
export const updateUserPlant = async (plantId: number, updatedData: Partial<AddUserPlant>): Promise<void> => {
  
};

export const apiGetCatalogPlants = async (): Promise<CatalogPlant[]> => {
  const token = await SecureStore.getItemAsync('accessToken');

  try {
    const response = await fetch(`${base_api_ip}/plants/plants`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer: ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch catalog plants: ${errorData}`);
    }

    const plantsData = await response.json() as CatalogPlant[];
    return plantsData;

  } catch (error) {
    console.error("Error fetching catalog plants: ", error)
    return [];
  }
}


declare const databasePlants: Plant[];

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

export const apiSearchCatalogPlantsByCommonName = (
  searchTerm: string,
  callback: (results: Plant[]) => void
) => {
  if (debounceTimeout) clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(async () => {
    if (!searchTerm.trim()) {
      callback([]);
      return;
    }

    const localMatches = databasePlants.filter(plant =>
      plant.name.commonName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (localMatches.length > 0) {
      callback(localMatches);
      return;
    }

    try {
      const res = await fetch(`/api/plants/search?term=${encodeURIComponent(searchTerm)}`);
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      callback(data);
    } catch (err) {
      console.error(err);
    }
  }, 500); // debounce delay
};



export const getPlant = async (plantId: number): Promise<void> => {
  
};

// Update plant information
export const updatePlant = async (plantId: number, updatedData: Partial<Plant>): Promise<void> => {
 
};

// Delete a plant species
export const deleteCatalogPlant = async (plantId: number): Promise<void> => {
  
};

// Delete a user plant




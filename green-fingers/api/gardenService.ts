import { AddGarden, ErrorData, Garden } from "@/types/models";
import * as SecureStore from 'expo-secure-store';

const base_api_ip = "https://greenfingers.truenas.work/api";

export const apiAddGarden = async (gardenData: AddGarden): Promise<Garden | undefined> => {
  const {name, userId} = gardenData;
  const token = await SecureStore.getItemAsync("accessToken");
  
  try {
    const response = await fetch(`${base_api_ip}/gardens`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        name: name,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json() as ErrorData;
      throw new Error(`Error adding a garden: ${errorData.message}`);
    }

    const newGarden = await response.json() as Garden;
    return newGarden;
  } catch (error) {
    console.error("Error adding garden: ", error);
  }
}

export const updateGarden = async (gardenId: string, updatedData: Partial<AddGarden>): Promise<void> => {
  
}

// Delete a garden
export const apiDeleteGarden = async (gardenId: number): Promise<void> => {
  const token = await SecureStore.getItemAsync("accessToken");

  try {
    const response = await fetch(`${base_api_ip}/gardens/${gardenId}`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer: ${token}`,
      }
    });

    if (!response.ok) {
      const errorData = response.json();
      throw new Error(`Failed to delete garden: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.error("Error deleting a garden: ", error);
  }
}

export const apiGetUserGardens = async (): Promise<undefined | Garden[]> => {
  const token = await SecureStore.getItemAsync('accessToken');
  try {
    const response = await fetch(`${base_api_ip}/users/gardens`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer: ${token}`,
      }
    });

  if (!response.ok) {
    const errorData = response.json();
    throw new Error(`Failed to fetch garden: ${JSON.stringify(errorData)}`);
  }
  const gardens = await response.json() as Garden[];
  return gardens;
  } catch (error) {
    console.error(" Error fetching gardens: ", error);
  }
}
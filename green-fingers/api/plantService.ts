import { CatalogPlant, UserPlant } from "../types/models";
import {
  CreateUserPlantResponse,
  DeleteUserPlantResponse,
  GetCatalogPlantsResponse,
  GetUserPlantsResponse,
  SearchCatalogPlantsByCommonNameResponse,
  UpdateUserPlantResponse,
} from "@/types/api";
import { AddUserPlant } from "../types/models";
import * as SecureStore from "expo-secure-store";

const base_api_ip = "https://greenfingers.truenas.work/api";

// Add a new user plant
export const apiCreateUserPlant = async (
  plantData: AddUserPlant
): Promise<number> => {
  const { nickName, catalogPlant_id, userId, garden_id } = plantData;
  const token = await SecureStore.getItemAsync("accessToken");

  const response = await fetch(`${base_api_ip}/plants/plants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nickname: nickName,
      plant_id: catalogPlant_id,
      user_id: userId,
      garden_id: garden_id,
    }),
  });

  const responseData = (await response.json()) as CreateUserPlantResponse;

  if (!response.ok || typeof responseData.id !== "number") {
    throw new Error(
      responseData.error ?? "Unknown error during plant creation"
    );
  }

  return responseData.id;
};

export const apiGetUserPlants = async (): Promise<UserPlant[]> => {
  const token = await SecureStore.getItemAsync("accessToken");

  const response = await fetch(`${base_api_ip}/users/plants`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = (await response.json()) as GetUserPlantsResponse;

  if (!response.ok) {
    throw new Error(
      responseData.error ?? "Unknown error during plant fetching"
    );
  }

  return responseData;
};

export const apiDeleteUserPlant = async (plantId: number): Promise<void> => {
  const token = await SecureStore.getItemAsync("accessToken");

  const response = await fetch(`${base_api_ip}/plants/plants/${plantId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = (await response.json()) as DeleteUserPlantResponse;
  if (!response.ok) {
    throw new Error(
      responseData.error ?? "Unknown error during plant deletion"
    );
  }
};

// Update User Plant
export const apiUpdateUserPlant = async (
  plantId: number,
  updatedData: Partial<AddUserPlant>
): Promise<void> => {
  const token = await SecureStore.getItemAsync("accessToken");

  const response = await fetch(`${base_api_ip}/plants/plants/${plantId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      updateData: updatedData,
    }),
  });
  const responseData = (await response.json()) as UpdateUserPlantResponse;

  if (!response.ok) {
    throw new Error(responseData.error ?? "Unknown error during plant update");
  }
};

export const apiGetCatalogPlants = async (): Promise<CatalogPlant[]> => {
  const token = await SecureStore.getItemAsync("accessToken");

  const response = await fetch(`${base_api_ip}/plants/plants`, {
    method: "GET",
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });
  const responseData = (await response.json()) as GetCatalogPlantsResponse;

  if (!response.ok) {
    throw new Error(
      responseData.error ?? "Unknown error during catalog plant fetching"
    );
  }

  return responseData;
};

export const apiSearchCatalogPlantsByCommonName = async (
  searchTerm: string
): Promise<CatalogPlant[]> => {
  const token = await SecureStore.getItemAsync("accessToken");
  const response = await fetch(
    `${base_api_ip}/plants/plants/search?query=${encodeURIComponent(
      searchTerm
    )}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const responseData =
    (await response.json()) as SearchCatalogPlantsByCommonNameResponse;

  if (!response.ok) {
    throw new Error(
      responseData.error ?? "Unknown error during catalog plant search"
    );
  }

  return responseData;
};

export const apiBatchUpdateWateredDate = async (
  plantIds: number[]
): Promise<void> => {
  const token = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await fetch(`${base_api_ip}/plants/plants/batch`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        plantIds,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update watered date: ${errorData}`);
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error updating watered date:", error);
    throw error;
  }
};

export const apiEditWateredDate = async (
  plantId: number,
  dateWatered: string
): Promise<void> => {
  const token = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await fetch(`${base_api_ip}/plants/plants/${plantId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        updateData: {
          date_watered: dateWatered,
        },
      }),
    });

    if (!response.ok) {
      const responseError = await response.json();
      throw new Error(`Error updating watered date: ${responseError.error}`);
    }
  } catch (error) {
    console.error("Error watering single plant:", error);
    throw error;
  }
};

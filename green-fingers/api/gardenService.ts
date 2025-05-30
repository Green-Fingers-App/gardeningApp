import { AddGarden, Garden } from "@/types/models";
import {
  CreateGardenResponse,
  DeleteGardenResponse,
  GetGardenResponse,
  UpdateGardenResponse,
} from "@/types/api";
import * as SecureStore from "expo-secure-store";
import { getApiUrl } from "./api";

export const apiAddGarden = async (gardenData: AddGarden): Promise<Garden> => {
  const { name, userId } = gardenData;
  const token = await SecureStore.getItemAsync("accessToken");
  const url = await getApiUrl("/gardens");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: userId,
      name: name,
    }),
  });

  const responseData = (await response.json()) as CreateGardenResponse;

  if (!response.ok) {
    throw new Error(responseData.error ?? "Unknown error during garden creation");
  }

  return responseData;
};

export const apiUpdateGarden = async (
  gardenId: number,
  updatedData: Partial<AddGarden>
): Promise<void> => {
  const token = await SecureStore.getItemAsync("accessToken");
  const url = await getApiUrl(`/gardens/${gardenId}`);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: updatedData.name,
    }),
  });

  const responseData = (await response.json()) as UpdateGardenResponse;

  if (!response.ok) {
    throw new Error(responseData.error ?? "Unknown error during garden update");
  }
};

export const apiDeleteGarden = async (gardenId: number): Promise<void> => {
  const token = await SecureStore.getItemAsync("accessToken");
  const url = await getApiUrl(`/gardens/${gardenId}`);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = (await response.json()) as DeleteGardenResponse;

  if (!response.ok) {
    throw new Error(responseData.error ?? "Unknown error during garden deletion");
  }
};

export const apiGetUserGardens = async (): Promise<Garden[]> => {
  const token = await SecureStore.getItemAsync("accessToken");
  const url = await getApiUrl("/users/gardens");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = (await response.json()) as GetGardenResponse;

  if (!response.ok) {
    throw new Error(responseData.error ?? "Unknown error during garden fetching");
  }

  return responseData;
};

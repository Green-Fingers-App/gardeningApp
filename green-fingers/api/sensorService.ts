import {
  MoistureSensor,
  SensorWithHistory,
  AddMoistureSensor,
} from "@/types/models";

import {
  GetAllMoistureSensorsResponse,
  GetMoistureSensorResponse,
  GetMoistureSensorWithHistoryResponse,
  UpdateSensorResponse,
  DeleteSensorResponse,
} from "@/types/api";

import * as SecureStore from "expo-secure-store";
import { getApiUrl } from "./api";

export const apiGetAllMoistureSensors = async (): Promise<MoistureSensor[]> => {
  const token = await SecureStore.getItemAsync("accessToken");
  const url = await getApiUrl("/sensor/sensor");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData =
    (await response.json()) as GetAllMoistureSensorsResponse;

  if (!response.ok) {
    throw new Error(
      responseData.error ?? "Unknown error during moisture sensor fetching"
    );
  }

  return responseData;
};

export const apiGetMoistureSensor = async (
  sensorId: number
): Promise<MoistureSensor> => {
  const token = await SecureStore.getItemAsync("accessToken");
  const url = await getApiUrl(`/sensor/sensor/${sensorId}`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = (await response.json()) as GetMoistureSensorResponse;

  if (!response.ok) {
    throw new Error(
      responseData.error ??
      `Unknown error during fetching of the moisture sensor with the id: ${sensorId}`
    );
  }

  return responseData;
};

export const apiGetSensorHistoryData = async (
  sensorId: number
): Promise<SensorWithHistory> => {
  const token = await SecureStore.getItemAsync("accessToken");
  const url = await getApiUrl(`/sensor/sensor/${sensorId}/details`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData =
    (await response.json()) as GetMoistureSensorWithHistoryResponse;

  if (!response.ok) {
    throw new Error(
      responseData.error ??
      `Unknown error during fetching of the moisture sensor with the id: ${sensorId}`
    );
  }

  return responseData;
};

export const apiDeleteSensor = async (sensorId: number): Promise<void> => {
  const token = await SecureStore.getItemAsync("accessToken");
  const url = await getApiUrl(`/sensor/sensor/${sensorId}`);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = (await response.json()) as DeleteSensorResponse;

  if (!response.ok) {
    throw new Error(
      responseData.error ?? "Unknown error during sensor deletion"
    );
  }
};

export const apiUpdateSensor = async (
  sensorId: number,
  updatedData: Partial<AddMoistureSensor>
): Promise<void> => {
  const token = await SecureStore.getItemAsync("accessToken");
  const url = await getApiUrl(`/sensor/sensor/${sensorId}`);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: updatedData.name,
      current_moisture_level: updatedData.current_moisture_level,
      plant_id: updatedData.plant_id,
    }),
  });

  const responseData = (await response.json()) as UpdateSensorResponse;

  if (!response.ok) {
    throw new Error(
      responseData.error ?? "Unknown error during sensor update"
    );
  }
};

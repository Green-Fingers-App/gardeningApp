import { MoistureSensor, SensorWithHistory } from "@/types/models";
import { GetAllMoistureSensorsResponse, GetMoistureSensorResponse, GetMoistureSensorWithHistoryResponse } from "@/types/api";
import * as SecureStore from "expo-secure-store";

const base_api_ip = "https://greenfingers.truenas.work/api";

export const apiGetAllMoistureSensors = async (): Promise<MoistureSensor[]> => {
  const token = await SecureStore.getItemAsync("accessToken");

  const response = await fetch(`${base_api_ip}/sensor/sensor`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = await (response.json()) as GetAllMoistureSensorsResponse;
  if (!response.ok) {
    throw new Error(responseData.error ?? "Unknown error during moisture sensor fetching");
  }

  return responseData;
};

export const apiGetMoistureSensor = async (
  sensorId: number
): Promise<MoistureSensor> => {
  const token = await SecureStore.getItemAsync("accessToken");

  const response = await fetch(`${base_api_ip}/sensor/sensor/${sensorId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = await (response.json()) as GetMoistureSensorResponse;

  if (!response.ok) {
    throw new Error(responseData.error ?? `Unknown error during fetching of the moisture sensor with the id: ${sensorId}`);
  }

  return responseData;
};

export const apiGetSensorHistoryData = async (
  sensorId: number
): Promise<SensorWithHistory> => {
  const token = await SecureStore.getItemAsync("accessToken");

  const response = await fetch(`${base_api_ip}/sensor/sensor/${sensorId}/details`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = await (response.json()) as GetMoistureSensorWithHistoryResponse;

  if (!response.ok) {
    throw new Error(responseData.error ?? `Unknown error during fetching of the moisture sensor with the id: ${sensorId}`);
  }
  return responseData;

}



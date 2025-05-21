import * as SecureStore from "expo-secure-store";

const BASE_URL_KEY = "greenfingers_base_url";

export const getBaseUrl = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(BASE_URL_KEY);
};

export const setBaseUrl = async (url: string): Promise<void> => {
  await SecureStore.setItemAsync(BASE_URL_KEY, url);
};

export const clearBaseUrl = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(BASE_URL_KEY);
};

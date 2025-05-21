import * as SecureStore from "expo-secure-store";

const BASE_URL_KEY = "greenfingers_base_url";

export const getApiUrl = async (path: string): Promise<string> => {
  const baseUrl = await SecureStore.getItemAsync(BASE_URL_KEY);
  if (!baseUrl) throw new Error("No backend URL set.");
  return `${baseUrl}/api${path}`;
};

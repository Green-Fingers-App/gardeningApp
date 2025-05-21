import { LoginData, SignUpData } from "@/types/authtypes";
import { getApiUrl } from "./api";

export type UserData = {
  username: string;
  email: string;
  id: number;
};

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserData;
};

export const apiSignUp = async (
  userData: SignUpData
): Promise<AuthResponse> => {
  const { username, password, email } = userData;

  const url = await getApiUrl("/auth/signup");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error);
  }

  return responseData;
};

export const apiLogin = async (loginData: LoginData): Promise<AuthResponse> => {
  const { email, password } = loginData;

  const url = await getApiUrl("/auth/login");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error);
  }

  return responseData;
};

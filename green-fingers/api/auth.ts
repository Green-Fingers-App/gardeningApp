export type SignUpData = {
  username: string,
  password: string,
  email: string,
}

export type LoginData = {
  email: string,
  password: string,
}

export type UserData = {
  username: string,
  email: string
  id: number,
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}

const base_api_ip = "https://greenfingers.truenas.work/api";

export const apiSignUp = async (userData: SignUpData): Promise<undefined | AuthResponse > => {
  const {username, password, email} = userData;

  try {
    const response = await fetch(`${base_api_ip}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Sign up failed: ${JSON.stringify(errorData)} `);
    }

    const authResponse = await response.json() as AuthResponse;
    return authResponse;
  } catch (error) {
    console.error("Error: ", error);
    return undefined;
  }
}

export const apiLogin = async (loginData: LoginData): Promise<AuthResponse | undefined> => {
  const {email, password} = loginData;

  try {
    const response = await fetch(`${base_api_ip}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Login failed: ${JSON.stringify(errorData)}`);
    }

    const authResponse = await response.json() as AuthResponse;
    return authResponse;
  } catch (error) {
    console.error("Error: ", error);
  }
}
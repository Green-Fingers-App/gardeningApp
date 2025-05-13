import { UserData } from "@/api/auth";

export interface User {
  id: string;
  email: string;
  username: string;
  profile_picture: string;
}

export interface AuthContextProps {
  user: UserData | undefined;
  isLoggedIn: boolean;
  login: (loginData: LoginData) => Promise<void>;
  signup: (signUpData: SignUpData) => Promise<void>;
  logout: () => void;
  updateUser: (newUserData: Partial<User>) => void;
}

export type Validator<T> = {
  validateAll: (values: T) => Partial<Record<keyof T, string>>;
  validateField?: (name: keyof T, value: string, values?: T) => string | null;
};

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

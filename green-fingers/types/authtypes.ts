import { LoginData, SignUpData, UserData } from "@/api/auth";

export interface User {
  id: string;
  email: string;
  username: string;
  profile_picture: string;
}

export interface AuthContextProps {
  user: UserData | null;
  isLoggedIn: boolean;
  login: (loginData: LoginData) => Promise<void>;
  signup: (signUpData: SignUpData) => Promise<void>;
  logout: () => void;
  updateUser: (newUserData: Partial<User>) => void;
  authError: string | null;
}
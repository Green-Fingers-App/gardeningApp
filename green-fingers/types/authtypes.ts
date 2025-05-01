import { LoginData, SignUpData, UserData } from "@/api/auth";

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

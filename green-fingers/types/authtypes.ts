export interface User {
  id: string;
  email: string;
  username: string;
  profile_picture: string;
}

export interface AuthContextProps {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  updateUser: (newUserData: Partial<User>) => void;
  authError: string | null;
}
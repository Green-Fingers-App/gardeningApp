export interface User {
  id: number;
  email: string;
  username: string;
}

export interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (newUserData: Partial<User>) => void;
}
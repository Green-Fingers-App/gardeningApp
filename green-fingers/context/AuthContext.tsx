import React, { createContext, useState, ReactNode, useContext } from "react";
import { User, AuthContextProps } from "@/types/authtypes";
import { router } from "expo-router";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an Authprovider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const userData = await mockAuth(email, password);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const mockAuth = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        resolve({ id: 1, email: email, username: "TestUser" });
      } else {
        reject({ error: "Invalid Email or Password" });
      }
    }, 1000);
  });
};

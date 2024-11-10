import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { router } from "expo-router";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { User, AuthContextProps } from "@/types/authtypes";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // map Firebase User to custom User type
  const mapFirebaseUserToAppUser = (firebaseUser: any): User => ({
    id: firebaseUser.uid,
    email: firebaseUser.email || "",
    username: firebaseUser.displayName || "Anonymous",
  });

  // Login function
  const [authError, setAuthError] = useState<string | null>(null);

  // map Firebase User to custom User type
  const mapFirebaseUserToAppUser = (firebaseUser: any): User => ({
    id: firebaseUser.uid,
    email: firebaseUser.email || "",
    username: firebaseUser.displayName || "Anonymous",
  });

  // Login function
  const login = async (email: string, password: string) => {
    const userData = await mockAuth(email, password);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    router.replace("/login");
  };

  const updateUser = (newUserData: Partial<User>) => {
    setUser((prevUser) => ( prevUser ? {...prevUser, ...newUserData } : null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

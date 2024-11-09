import React, { createContext, useState, ReactNode, useContext } from "react";
import { router } from "expo-router";
import { User as FirebaseUser, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { User, AuthContextProps } from "@/types/authtypes";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // Helper to map Firebase User to our custom User type
  const mapFirebaseUserToAppUser = (firebaseUser: FirebaseUser): User => ({
    id: firebaseUser.uid,
    email: firebaseUser.email || "",
    username: firebaseUser.displayName || "Anonymous",
  });

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const mappedUser = mapFirebaseUserToAppUser(userCredential.user);
      setUser(mappedUser);
      router.replace("/profile/home");
    } catch (error) {
      setAuthError("Invalid email or password");
      console.error("Login error:", error);
    }
  };

  // Signup function
  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const mappedUser = mapFirebaseUserToAppUser(userCredential.user);
      setUser(mappedUser);
      router.replace("/profile/home");
    } catch (error) {
      setAuthError("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

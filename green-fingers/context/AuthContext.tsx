import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
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
    username: userData?.username || "Anonymous",
    profile_picture: userData?.profile_picture || "",
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
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
  const signup = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const mappedUser = mapFirebaseUserToAppUser(userCredential.user);
      setUser(mappedUser);

      setAuthError(null);
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

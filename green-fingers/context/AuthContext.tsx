import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { router } from "expo-router";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
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

  // Check if the user is logged in (derived from the user state)
  const isLoggedIn = !!user;

  // Map Firebase User to custom User type
  const mapFirebaseUserToAppUser = (firebaseUser: any): User => ({
    id: firebaseUser.uid,
    email: firebaseUser.email || "",
    username: firebaseUser.displayName || "Anonymous",
  });

  // Listen for authentication state changes (optional)
  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const mappedUser = mapFirebaseUserToAppUser(firebaseUser);
        setUser(mappedUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

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
      const firebaseUser = userCredential.user;

      const mappedUser = mapFirebaseUserToAppUser(firebaseUser);

      await setDoc(doc(db, "users", firebaseUser.uid), {
        email: firebaseUser.email,
        username: firebaseUser.displayName || "Flower Lover",
        profile_picture: firebaseUser.photoURL || "",
        created_at: new Date().toISOString(),
      });

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

  // Update user in state
  const updateUser = (newUserData: Partial<User>) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, ...newUserData } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        signup,
        logout,
        authError,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

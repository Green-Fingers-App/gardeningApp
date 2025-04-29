import React, { createContext, useState, ReactNode, useContext } from "react";
import { User, AuthContextProps } from "@/types/authtypes";
import {
  apiLogin,
  apiSignUp,
  LoginData,
  SignUpData,
  UserData,
} from "@/api/auth";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [authError, setAuthError] = useState<string | null>(null);

  const router = useRouter();

  let isLoggedIn = !!user;

  // Login function
  const login = async (loginData: LoginData): Promise<void> => {
    try {
      const authResponse = await apiLogin(loginData);

      if (authResponse) {
        const { id, username, email } = authResponse.user;
        setUser({
          username: username,
          id: id,
          email: email,
        });
        await SecureStore.setItemAsync("accessToken", authResponse.accessToken);
        await SecureStore.setItemAsync(
          "refreshToken",
          authResponse.refreshToken
        );
        router.replace("/profile/home");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("An unknown error during login occured.");
      }
    }
  };

  // Signup function
  const signup = async (signUpData: SignUpData): Promise<void> => {
    try {
      const authResponse = await apiSignUp(signUpData);

      if (authResponse) {
        const { id, username, email } = authResponse.user;
        setUser({
          username: username,
          email: email,
          id: id,
        });
        await SecureStore.setItemAsync("accessToken", authResponse.accessToken);
        await SecureStore.setItemAsync(
          "refreshToken",
          authResponse.refreshToken
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("An unknown error during sign up occurred.");
      }
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");

      setUser(null);
      
      router.replace("/login");
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("An unknown error during login occured.");
      }
    }
  };

  // Update user in state
  const updateUser = (newUserData: Partial<User>) => {
    setUser((prevUser) =>
      prevUser
        ? {
            ...prevUser,
            ...newUserData,
            id:
              newUserData.id !== undefined
                ? Number(newUserData.id)
                : prevUser.id,
          }
        : undefined
    );
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

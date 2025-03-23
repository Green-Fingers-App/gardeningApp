import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { router } from "expo-router";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  const isLoggedIn = !!user;

  // Fetch user data on mount (if token exists)
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      }
    };
    fetchUserData();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      const { token, user } = response.data;
      // Save token to local storage
      localStorage.setItem("token", token);
      setUser(user);
      setAuthError(null);
      router.replace("/profile/home");
    } catch (error) {
      setAuthError("Invalid email or password");
      console.error("Login error:", error);
    }
  };

  // Signup function
  const signup = async (email, password, username) => {
    try {
      const response = await axios.post("/api/signup", { email, password, username });
      const { token, user } = response.data;
      // Save token to local storage
      localStorage.setItem("token", token);
      setUser(user);
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
      // Remove token from local storage
      localStorage.removeItem("token");
      setUser(null);
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Update user in state
  const updateUser = (newUserData) => {
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
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { router } from "expo-router";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const isLoggedIn = !!user;

  const mapFirebaseUserToAppUser = (
    firebaseUser: FirebaseUser,
    userData: DocumentData | null
  ): User => ({
    id: firebaseUser.uid,
    email: firebaseUser.email || "",
    username: userData?.username || "Anonymous",
    profile_picture: userData?.profile_picture || "",
  });

  // Listen for authentication state changes and user data updates
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const mappedUser = mapFirebaseUserToAppUser(
              firebaseUser,
              userData
            );
            setUser(mappedUser);
          } else {
            console.warn("User document does not exist in Firestore.");
            setUser(null);
          }
        });
        return () => {
          unsubscribeUser();
        };
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;
      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const mappedUser = mapFirebaseUserToAppUser(firebaseUser, userData);
        setUser(mappedUser);
      } else {
        console.warn("User document does not exist in Firestore.");
        const mappedUser = mapFirebaseUserToAppUser(firebaseUser, null);
        setUser(mappedUser);
      }
      setAuthError(null);
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      const userData = {
        email: firebaseUser.email,
        username: username || "Flower Lover",
        profile_picture: firebaseUser.photoURL || "",
        created_at: new Date().toISOString(),
      };

      // Save user data to Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), userData);
      const mappedUser = mapFirebaseUserToAppUser(firebaseUser, userData);
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

  // Update user in state
  const updateUser = (newUserData: Partial<User>) => {
    setUser((prevUser) =>
      prevUser ? { ...prevUser, ...newUserData } : null
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

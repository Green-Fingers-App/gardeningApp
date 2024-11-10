import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthContext";

import textStyles from "@/constants/textStyles";

import Button from "@/components/Button";
import Input from "@/components/Input";

import useForm from "@/hooks/useForm";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the form with existing user values
  const { values, handleChange, resetForm, setValues } = useForm({
    username: user?.username || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user?.id) {
      fetchOrCreateUserProfile();
    }
  }, [user?.id]);

  const fetchOrCreateUserProfile = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);

      const userDocRef = doc(db, "users", `${user.id}`);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // If the document exists, set form values
        const userData = userDoc.data();
        setValues({
          username: userData?.username || "",
          email: userData?.email || "",
        });
      } else {
        // If the document does not exist, create it with default values
        const initialData = {
          username: user.username || "New User",
          email: user.email || "",
          profile_picture: "",
          created_at: new Date().toISOString(),
        };
        await setDoc(userDocRef, initialData);
        setValues({
          username: initialData.username,
          email: initialData.email,
        });
      }
    } catch (error) {
      console.error("Error fetching or creating user profile:", error);
      setError("Failed to load user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const enableEditMode = () => {
    setEditMode(true);
    setError(null);
  };

  const saveChanges = async () => {
    if (!user?.id) return;

    try {
      const userDocRef = doc(db, "users", `${user.id}`);
      await updateDoc(userDocRef, {
        username: values.username,
        email: values.email,
      });
      updateUser(values); // Update user in Auth context
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError("Failed to save changes. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={textStyles.h1}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Text style={textStyles.h1}>Hello, {values.username}</Text>
      {editMode ? (
        <View style={styles.editForm}>
          <Input
            value={values.username}
            onChangeText={(text) => handleChange("username", text)}
            placeholder="Enter new Username"
            label="Username"
          />
          <Input
            value={values.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Enter new Email"
            label="Email"
          />
          <Button type="primary" text="Save Changes" onPress={saveChanges} />
          <Button
            type="secondary"
            text="Cancel"
            onPress={() => {
              resetForm();
              setEditMode(false);
            }}
          />
        </View>
      ) : (
        <View style={styles.viewMode}>
          <Text style={textStyles.h3}>Profile Information</Text>
          <Text>Username:</Text>
          <Text>{values.username}</Text>
          <Text>Email:</Text>
          <Text>{values.email}</Text>
          <Button 
            type="secondary"
            text="Edit Profile"
            onPress={enableEditMode}
          />
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 32,
    gap: 24,
  },
  editForm: {
    flexDirection: "column",
    gap: 16,
  },
  viewMode: {
    flexDirection: "column",
    gap: 8,
  },
  errorText: {
    color: colors.bgError,
    marginBottom: 8,
  },
});

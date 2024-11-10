import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import textStyles from "@/constants/textStyles";
import colors from "@/constants/colors";

import Button from "@/components/Button";
import Input from "@/components/Input";

import useForm from "@/hooks/useForm";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);

  // Initialize the form with existing user values
  const { values, handleChange, resetForm } = useForm({
    username: user?.username || "",
    email: user?.email || "",
  });

  const enableEditMode = () => setEditMode(true);

  const saveChanges = () => {
    updateUser(values);
    setEditMode(false);
  };

  return (
    <View style={styles.container}>
      <Text style={textStyles.h1}>Hello, {user?.username}</Text>
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
            placeholder="Email"
            label="Enter new Email"
          />
          <Button 
            type="primary"
            text="Save Changes"
            onPress={saveChanges}
          />
          <Button 
            type="secondary"
            text="Cancel"
            onPress={() => { resetForm(); setEditMode(false); }}
          />
        </View>
      ) : (
        <View style={styles.viewMode}>
          <Text style={textStyles.h3}>Profile Information</Text>
          <Text style={textStyles.label}>Username:</Text>
          <Text style={textStyles.body}>{values.username}</Text>
          <Text style={textStyles.label}>Email:</Text>
          <Text style={textStyles.body}>{values.email}</Text>
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
});
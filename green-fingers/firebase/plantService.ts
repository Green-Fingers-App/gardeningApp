// firebase/plantService.ts

import { db } from "./firebaseConfig";
import { collection, addDoc, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Plant } from "../types/models";

// Define the `plants` collection
const plantsCollection = collection(db, "plant-catalog");

// Add a new plant species
export const addPlant = async (plantData: Plant): Promise<string | undefined> => {
  try {
    const docRef = await addDoc(plantsCollection, plantData);
    console.log("Plant added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding plant: ", error);
  }
};

// Retrieve a plant species by ID
export const getPlant = async (plantId: string): Promise<Plant | undefined> => {
  try {
    const docRef = doc(db, "plant-catalog", plantId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Plant;
    } else {
      console.log("No such plant document!");
    }
  } catch (error) {
    console.error("Error fetching plant: ", error);
  }
};

// Update plant information
export const updatePlant = async (plantId: string, updatedData: Partial<Plant>): Promise<void> => {
  try {
    const docRef = doc(db, "plant-catalog", plantId);
    await updateDoc(docRef, updatedData);
    console.log("Plant updated");
  } catch (error) {
    console.error("Error updating plant: ", error);
  }
};

// Delete a plant species
export const deletePlant = async (plantId: string): Promise<void> => {
  try {
    const docRef = doc(db, "plant-catalog", plantId);
    await deleteDoc(docRef);
    console.log("Plant deleted");
  } catch (error) {
    console.error("Error deleting plant: ", error);
  }
};

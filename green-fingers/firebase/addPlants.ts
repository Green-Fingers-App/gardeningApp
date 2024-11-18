import { Plant, Month, WaterFrequency, SunLight, AddPlant} from "../types/models";
import {v4 as uuidv4} from 'uuid'

// addPlants.js
const admin = require("firebase-admin");

// Initialize Firebase with service account
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Array of plant data to add to Firestore
const plants: AddPlant[] = [
  {
    name: { commonName: "Tomato", scientificName: "Solanum lycopersicum" },
    blooming: { start: Month.JUNE, end: Month.AUGUST, flowerColor: "Yellow" },
    waterFrequency: WaterFrequency.WEEKLY,
    harvest: { start: Month.JULY, end: Month.SEPTEMBER, yield: 20, edibleParts: "Fruit" },
    sunLight: SunLight.FULL_SUN,
    temperature: { min: 15, max: 35 },
    size: { height: 100, width: 60 },
    fertilizerType: "Organic compost",
    planting: { start: Month.MARCH, end: Month.APRIL },
  },
  {
    name: { commonName: "Rose", scientificName: "Rosa" },
    blooming: { start: Month.MAY, end: Month.OCTOBER, flowerColor: "Red" },
    waterFrequency: WaterFrequency.WEEKLY,
    harvest: false,
    sunLight: SunLight.PARTIAL_SUN,
    temperature: { min: 10, max: 30 },
    size: { height: 150, width: 100 },
    fertilizerType: "Rose fertilizer",
    planting: { start: Month.MARCH, end: Month.MAY },
  },
  {
    name: { commonName: "Carrot", scientificName: "Daucus carota" },
    blooming: { start: Month.JUNE, end: Month.AUGUST, flowerColor: "White" },
    waterFrequency: WaterFrequency.WEEKLY,
    harvest: { start: Month.AUGUST, end: Month.SEPTEMBER, yield: 50, edibleParts: "Root" },
    sunLight: SunLight.FULL_SUN,
    temperature: { min: 10, max: 25 },
    size: { height: 30, width: 5 },
    fertilizerType: "All-purpose fertilizer",
    planting: { start: Month.MARCH, end: Month.JUNE },
  },
  {
    name: { commonName: "Basil", scientificName: "Ocimum basilicum" },
    blooming: { start: Month.JUNE, end: Month.AUGUST, flowerColor: "Purple" },
    waterFrequency: WaterFrequency.DAILY,
    harvest: { start: Month.JUNE, end: Month.AUGUST, yield: 30, edibleParts: "Leaves" },
    sunLight: SunLight.FULL_SUN,
    temperature: { min: 15, max: 30 },
    size: { height: 45, width: 30 },
    fertilizerType: "Balanced fertilizer",
    planting: { start: Month.APRIL, end: Month.MAY },
  },
  {
    name: { commonName: "Lavender", scientificName: "Lavandula" },
    blooming: { start: Month.JUNE, end: Month.AUGUST, flowerColor: "Purple" },
    waterFrequency: WaterFrequency.BIWEEKLY,
    harvest: false,
    sunLight: SunLight.FULL_SUN,
    temperature: { min: 10, max: 30 },
    size: { height: 60, width: 90 },
    fertilizerType: "No fertilizer required",
    planting: { start: Month.MARCH, end: Month.APRIL },
  }
];


// Function to check if a plant with the same name exists
const plantExists = async (name: string) => {
  const plantsCollection = db.collection("plants");
  const querySnapshot = await plantsCollection.where("commonName", "==", name).get();
  return !querySnapshot.empty; // Returns true if plant with the same name exists
};

// Function to add plants to Firestore
const addPlantsToFirestore = async () => {
  const plantsCollection = db.collection("plants");

  for (const plant of plants) {
    try {
      // Check if plant with the same name already exists
      const exists = await plantExists(plant.name.commonName);
      if (exists) {
        console.log(`Plant with name "${plant.name.commonName}" already exists. Skipping...`);
        continue; // Skip to the next plant if duplicate is found
      }

      // Add plant if it doesn't exist
      const docRef = await plantsCollection.add(plant);
      console.log(`Added plant with ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error adding plant: ", error);
    }
  }

  console.log("Finished adding plants.");
};

addPlantsToFirestore().then(() => {
  console.log("Script completed");
  process.exit(0);
});

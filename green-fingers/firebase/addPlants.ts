import { Plant, Month, WaterFrequency, SunLight, AddUserPlant} from "../types/models";
import {v4 as uuidv4} from 'uuid'


// Firebase Admin Initialization
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Array of plant data to add to Firestore
const plants: Plant[] = [
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
  },
];

// Function to check if a plant with the same name already exists in Firestore
const plantExists = async (commonName: string): Promise<boolean> => {
  try {
    const plantsCollection = db.collection("plant-catalog");
    const querySnapshot = await plantsCollection.where("name.commonName", "==", commonName).get();
    return !querySnapshot.empty; // Returns true if a plant with the same name exists
  } catch (error) {
    console.error("Error checking if plant exists:", error);
    throw error;
  }
};

// Function to add a single plant to Firestore
const addPlantToFirestore = async (plant: AddPlant): Promise<void> => {
  try {
    const plantsCollection = db.collection("plant-catalog");

    // Check if the plant already exists
    const exists = await plantExists(plant.name.commonName);
    if (exists) {
      console.log(`Plant with name "${plant.name.commonName}" already exists. Skipping...`);
      return;
    }

    // Add the plant
    const plantId = uuidv4(); // Assign a unique ID for consistency
    await plantsCollection.doc(plantId).set({
      id: plantId,
      ...plant,
    });
    console.log(`Successfully added plant "${plant.name.commonName}" with ID: ${plantId}`);
  } catch (error) {
    console.error("Error adding plant:", error);
  }
};

// Function to add multiple plants to Firestore
const addPlantsToFirestore = async () => {
  for (const plant of plants) {
    await addPlantToFirestore(plant);
  }
  console.log("Finished adding plants.");
};

// Execute the script
addPlantsToFirestore()
  .then(() => {
    console.log("All plants processed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error processing plants:", error);
    process.exit(1);
  });

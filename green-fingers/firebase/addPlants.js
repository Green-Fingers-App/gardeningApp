// addPlants.js
const admin = require("firebase-admin");

// Initialize Firebase with service account
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Array of plant data to add to Firestore
const plants = [
  {
    name: "Sunflower",
    scientific_name: "Helianthus annuus",
    type: "Flowering",
    water_frequency: "weekly",
    temperature: "20-25°C",
    light: "Full sun",
    soil_type: "Loamy",
    fertilizer_type: "Balanced 10-10-10",
    fertilizer_frequency: "monthly",
  },
  {
    name: "Rose",
    scientific_name: "Rosa rubiginosa",
    type: "Flowering",
    water_frequency: "biweekly",
    temperature: "18-24°C",
    light: "Partial shade",
    soil_type: "Loamy",
    fertilizer_type: "Rose-specific",
    fertilizer_frequency: "monthly",
  },
  // Add more plants as needed
];

// Function to check if a plant with the same name exists
const plantExists = async (name) => {
  const plantsCollection = db.collection("plants");
  const querySnapshot = await plantsCollection.where("name", "==", name).get();
  return !querySnapshot.empty; // Returns true if plant with the same name exists
};

// Function to add plants to Firestore
const addPlantsToFirestore = async () => {
  const plantsCollection = db.collection("plants");

  for (const plant of plants) {
    try {
      // Check if plant with the same name already exists
      const exists = await plantExists(plant.name);
      if (exists) {
        console.log(`Plant with name "${plant.name}" already exists. Skipping...`);
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

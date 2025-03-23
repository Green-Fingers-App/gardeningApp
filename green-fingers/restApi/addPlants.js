const { v4: uuidv4 } = require("uuid");
require("dotenv").config(); // Load environment variables
const pool = require("./db"); // Import the pool from db.js

// Array of plant data to add to PostgreSQL
const plants = [
  {
    commonName: "Tomato",
    scientificName: "Solanum lycopersicum",
    bloomingStart: "June",
    bloomingEnd: "August",
    flowerColor: "Yellow",
    waterFrequency: "WEEKLY",
    harvestStart: "July",
    harvestEnd: "September",
    yield: 20,
    edibleParts: "Fruit",
    sunLight: "FULL_SUN",
    minTemperature: 15,
    maxTemperature: 35,
    height: 100,
    width: 60,
    fertilizerType: "Organic compost",
    plantingStart: "March",
    plantingEnd: "April",
  },
  {
    commonName: "Rose",
    scientificName: "Rosa",
    bloomingStart: "May",
    bloomingEnd: "October",
    flowerColor: "Red",
    waterFrequency: "WEEKLY",
    harvestStart: null,
    harvestEnd: null,
    yield: null,
    edibleParts: null,
    sunLight: "PARTIAL_SUN",
    minTemperature: 10,
    maxTemperature: 30,
    height: 150,
    width: 100,
    fertilizerType: "Rose fertilizer",
    plantingStart: "March",
    plantingEnd: "May",
  },
  {
    commonName: "Carrot",
    scientificName: "Daucus carota",
    bloomingStart: "June",
    bloomingEnd: "August",
    flowerColor: "White",
    waterFrequency: "WEEKLY",
    harvestStart: "August",
    harvestEnd: "September",
    yield: 50,
    edibleParts: "Root",
    sunLight: "FULL_SUN",
    minTemperature: 10,
    maxTemperature: 25,
    height: 30,
    width: 5,
    fertilizerType: "All-purpose fertilizer",
    plantingStart: "March",
    plantingEnd: "June",
  },
];

// Function to check if a plant exists in the database
const plantExists = async (commonName) => {
  const result = await pool.query("SELECT * FROM plants WHERE common_name = $1", [commonName]);
  return result.rows.length > 0;
};

// Function to add a single plant to PostgreSQL
const addPlantToPostgres = async (plant) => {
  try {
    const exists = await plantExists(plant.commonName);
    if (exists) {
      console.log(`Plant "${plant.commonName}" already exists. Skipping...`);
      return;
    }

    const query = `
      INSERT INTO plants 
      (id, common_name, scientific_name, blooming_start, blooming_end, flower_color, water_frequency, 
      harvest_start, harvest_end, yield, edible_parts, sun_light, min_temperature, max_temperature, 
      height, width, fertilizer_type, planting_start, planting_end)
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    `;

    const values = [
      uuidv4(),
      plant.commonName,
      plant.scientificName,
      plant.bloomingStart,
      plant.bloomingEnd,
      plant.flowerColor,
      plant.waterFrequency,
      plant.harvestStart,
      plant.harvestEnd,
      plant.yield,
      plant.edibleParts,
      plant.sunLight,
      plant.minTemperature,
      plant.maxTemperature,
      plant.height,
      plant.width,
      plant.fertilizerType,
      plant.plantingStart,
      plant.plantingEnd,
    ];

    await pool.query(query, values);
    console.log(`Successfully added "${plant.commonName}"`);
  } catch (error) {
    console.error("Error adding plant:", error);
  }
};

// Function to add multiple plants
const addPlantsToPostgres = async () => {
  for (const plant of plants) {
    await addPlantToPostgres(plant);
  }
  console.log("Finished adding plants.");
};

// Execute the script
addPlantsToPostgres()
  .then(() => {
    console.log("All plants processed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error processing plants:", error);
    process.exit(1);
  });

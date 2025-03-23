const pool = require("./db"); // Import the database connection

// Add a new plant species
const addPlant = async (plantData) => {
  try {
    const query = `
      INSERT INTO user_plants (name, species, planted_date, location) 
      VALUES ($1, $2, $3, $4) RETURNING id
    `;
    const values = [
      plantData.name,
      plantData.species,
      plantData.planted_date,
      plantData.location,
    ];
    const result = await pool.query(query, values);
    console.log("Plant added with ID:", result.rows[0].id);
    return result.rows[0].id;
  } catch (error) {
    console.error("Error adding plant:", error);
  }
};

// Update User Plant
const updateUserPlant = async (plantId, updatedData) => {
  try {
    const query = `
      UPDATE user_plants 
      SET name = COALESCE($1, name), 
          species = COALESCE($2, species), 
          planted_date = COALESCE($3, planted_date), 
          location = COALESCE($4, location)
      WHERE id = $5
    `;
    const values = [
      updatedData.name || null,
      updatedData.species || null,
      updatedData.planted_date || null,
      updatedData.location || null,
      plantId,
    ];
    await pool.query(query, values);
    console.log("Plant updated");
  } catch (error) {
    console.error("Error updating plant:", error);
  }
};

// Retrieve a plant species by ID
const getPlant = async (plantId) => {
  try {
    const query = "SELECT * FROM plant_catalog WHERE id = $1";
    const result = await pool.query(query, [plantId]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      console.log("No such plant document!");
    }
  } catch (error) {
    console.error("Error fetching plant:", error);
  }
};

// Update plant information
const updatePlant = async (plantId, updatedData) => {
  try {
    const query = `
      UPDATE plant_catalog 
      SET name = COALESCE($1, name), 
          species = COALESCE($2, species), 
          description = COALESCE($3, description) 
      WHERE id = $4
    `;
    const values = [
      updatedData.name || null,
      updatedData.species || null,
      updatedData.description || null,
      plantId,
    ];
    await pool.query(query, values);
    console.log("Plant updated");
  } catch (error) {
    console.error("Error updating plant:", error);
  }
};

// Delete a plant species
const deleteCatalogPlant = async (plantId) => {
  try {
    const query = "DELETE FROM plant_catalog WHERE id = $1";
    await pool.query(query, [plantId]);
    console.log("Plant deleted");
  } catch (error) {
    console.error("Error deleting plant:", error);
  }
};

// Delete a user plant
const deletePlant = async (plantId) => {
  try {
    const query = "DELETE FROM user_plants WHERE id = $1";
    await pool.query(query, [plantId]);
    console.log("Plant deleted");
  } catch (error) {
    console.error("Error deleting plant:", error);
  }
};

module.exports = {
  addPlant,
  updateUserPlant,
  getPlant,
  updatePlant,
  deleteCatalogPlant,
  deletePlant,
};

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("green-fingers/rest api/db.js"); // Import the database connection

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows JSON requests

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Backend API!");
});

// Example API endpoint to fetch data
app.get("/api/data", async (req, res) => {
  try {
    const query = "SELECT * FROM your_table"; // Replace with your table name
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate credentials (e.g., using bcrypt to compare hashed passwords)
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // Issue JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Signup
app.post("/api/signup", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert user into PostgreSQL
    const result = await pool.query(
      "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *",
      [email, hashedPassword, username]
    );
    const user = result.rows[0];
    // Issue JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Fetch User Profile
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Create User Profile
app.post("/api/users", async (req, res) => {
  const { id, username, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (id, username, email) VALUES ($1, $2, $3) RETURNING *",
      [id, username, email]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update User Profile
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *",
      [username, email, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Fetch User's Gardens
app.get("/api/gardens", async (req, res) => {
  const { userId } = req.query;
  try {
    const result = await pool.query("SELECT * FROM gardens WHERE user_id = $1", [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Fetch User's Plants
app.get("/api/user-plants", async (req, res) => {
  const { userId } = req.query;
  try {
    const result = await pool.query("SELECT * FROM user_plants WHERE user_id = $1", [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Fetch Plants by Common Name
app.get("/api/plants/search", async (req, res) => {
  const { query } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM plant_catalog WHERE common_name ILIKE $1",
      [`%${query}%`]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Create a Plant
app.post("/api/user-plants", async (req, res) => {
  const { userId, gardenId, ...plantData } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO user_plants (user_id, garden_id, ...) VALUES ($1, $2, ...) RETURNING *",
      [userId, gardenId, ...Object.values(plantData)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update a Plant
app.put("/api/user-plants/:id", async (req, res) => {
  const { id } = req.params;
  const { ...plantData } = req.body;
  try {
    const result = await pool.query(
      "UPDATE user_plants SET ... WHERE id = $1 RETURNING *",
      [id, ...Object.values(plantData)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete a Plant
app.delete("/api/user-plants/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM user_plants WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Create a Garden
app.post("/api/gardens", async (req, res) => {
  const { userId, ...gardenData } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO gardens (user_id, ...) VALUES ($1, ...) RETURNING *",
      [userId, ...Object.values(gardenData)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update a Garden
app.put("/api/gardens/:id", async (req, res) => {
  const { id } = req.params;
  const { ...gardenData } = req.body;
  try {
    const result = await pool.query(
      "UPDATE gardens SET ... WHERE id = $1 RETURNING *",
      [id, ...Object.values(gardenData)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete a Garden
app.delete("/api/gardens/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM gardens WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


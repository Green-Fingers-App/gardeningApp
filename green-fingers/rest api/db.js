const { Pool } = require("pg");

const pool = new Pool({
  user: "greenuser",
  host: "localhost",
  database: "green_finger_db",
  password: "greenpass",
  port: 5432,
});

module.exports = pool;

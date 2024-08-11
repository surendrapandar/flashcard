import pool from "./db";

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS flashcards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL
  );
`;

async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    await connection.query(createTableQuery);
    console.log("Table 'flashcards' created or already exists.");
    connection.release();
  } catch (error) {
    console.error("Error creating table 'flashcards':", error);
  }
}

initializeDatabase();

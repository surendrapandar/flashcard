import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import flashcardRoutes from "./routes/flashcards";
import pool from "./config/db";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
const port = 3000;

app.use(express.json());

pool
  .getConnection()
  .then((connection) => {
    console.log("Database connected successfully with SSL");
    connection.release();
  })
  .catch((error) => {
    console.error("Error connecting to the database with SSL:", error);
  });

app.use("/api", flashcardRoutes);

app.get("/", (req, res) => {
  res.send("Flashcard API is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

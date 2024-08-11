import pool from "../config/db";

export interface Flashcard {
  id?: number;
  question: string;
  answer: string;
}

export const getAllFlashcards = async (): Promise<Flashcard[]> => {
  try {
    const [rows] = await pool.query("SELECT * FROM flashcards");
    return rows as Flashcard[];
  } catch (error) {
    console.error("Error fetching all flashcards:", error);
    throw error;
  }
};

export const getFlashcardById = async (
  id: number
): Promise<Flashcard | null> => {
  try {
    const [rows] = await pool.query("SELECT * FROM flashcards WHERE id = ?", [
      id,
    ]);
    const flashcards = rows as Flashcard[];
    return flashcards.length > 0 ? flashcards[0] : null;
  } catch (error) {
    console.error(`Error fetching flashcard with id ${id}:`, error);
    throw error;
  }
};

export const createFlashcard = async (flashcard: Flashcard): Promise<void> => {
  try {
    await pool.query(
      "INSERT INTO flashcards (question, answer) VALUES (?, ?)",
      [flashcard.question, flashcard.answer]
    );
  } catch (error) {
    console.error("Error creating flashcard:", error);
    throw error;
  }
};

export const updateFlashcard = async (
  id: number,
  flashcard: Flashcard
): Promise<void> => {
  try {
    await pool.query(
      "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?",
      [flashcard.question, flashcard.answer, id]
    );
  } catch (error) {
    console.error(`Error updating flashcard with id ${id}:`, error);
    throw error;
  }
};

export const deleteFlashcard = async (id: number): Promise<void> => {
  try {
    await pool.query("DELETE FROM flashcards WHERE id = ?", [id]);
  } catch (error) {
    console.error(`Error deleting flashcard with id ${id}:`, error);
    throw error;
  }
};

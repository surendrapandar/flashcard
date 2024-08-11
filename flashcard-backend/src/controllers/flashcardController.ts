import { Request, Response } from "express";
import {
  getAllFlashcards,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from "../models/flashcardModel";

export const getFlashcards = async (req: Request, res: Response) => {
  console.log("getFlashcards");
  try {
    const flashcards = await getAllFlashcards();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve flashcards" });
  }
};

export const getFlashcard = async (req: Request, res: Response) => {
  try {
    const flashcard = await getFlashcardById(Number(req.params.id));
    if (flashcard) {
      res.json(flashcard);
    } else {
      res.status(404).json({ error: "Flashcard not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve flashcard" });
  }
};

export const addFlashcard = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    await createFlashcard(req.body);
    res.status(201).json({ message: "Flashcard created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create flashcard" });
  }
};

export const editFlashcard = async (req: Request, res: Response) => {
  try {
    await updateFlashcard(Number(req.params.id), req.body);
    res.status(200).json({ message: "Flashcard updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update flashcard" });
  }
};

export const removeFlashcard = async (req: Request, res: Response) => {
  try {
    await deleteFlashcard(Number(req.params.id));
    res.status(200).json({ message: "Flashcard deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete flashcard" });
  }
};

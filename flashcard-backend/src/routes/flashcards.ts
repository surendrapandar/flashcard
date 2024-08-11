import { Router } from "express";
import {
  getFlashcards,
  getFlashcard,
  addFlashcard,
  editFlashcard,
  removeFlashcard,
} from "../controllers/flashcardController";

const router = Router();

router.get("/flashcards", getFlashcards);
router.get("/flashcards/:id", getFlashcard);
router.post("/flashcards", addFlashcard);
router.put("/flashcards/:id", editFlashcard);
router.delete("/flashcards/:id", removeFlashcard);

export default router;

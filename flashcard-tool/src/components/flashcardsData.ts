import { getFlashcards } from "../API/fetchquestions";

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

// Initialize with empty data or some placeholder
export let flashcardsData: Flashcard[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    id: 2,
    question: "What is the capital of Spain?",
    answer: "Madrid",
  },
  {
    id: 3,
    question: "What is the capital of Germany?",
    answer: "Berlin",
  },
];

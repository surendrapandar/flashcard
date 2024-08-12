import axios from "axios";

const API_URL =
  "https://flashcard-backend-9h8laf9eg-surendra-pandars-projects.vercel.app/api/flashcards";

export const getFlashcards = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getFlashcardById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addFlashcard = async (flashcard: {
  question: string;
  answer: string;
}) => {
  const response = await axios.post(API_URL, flashcard);
  return response.data;
};

export const updateFlashcard = async (
  id: string,
  flashcard: { question: string; answer: string }
) => {
  const response = await axios.put(`${API_URL}/${id}`, flashcard);
  return response.data;
};

export const deleteFlashcard = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

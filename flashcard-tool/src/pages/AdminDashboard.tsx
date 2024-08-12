import React, { useEffect, useState } from "react";
import {
  getFlashcards,
  addFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from "../API/fetchquestions";
import { Link } from "react-router-dom";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

const Dashboard: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const data = await getFlashcards();
        setFlashcards(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch flashcards.");
        setLoading(false);
      }
    };
    fetchFlashcards();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await updateFlashcard(editingId.toString(), newCard);
        setFlashcards(
          flashcards.map((card) =>
            card.id === editingId ? { id: editingId, ...newCard } : card
          )
        );
        setEditingId(null);
      } else {
        const addedCard = await addFlashcard(newCard);
        setFlashcards((prevFlashcards) => [...prevFlashcards, addedCard]);
      }
      setNewCard({ question: "", answer: "" });
    } catch (err) {
      setError("Failed to save flashcard.");
    }
  };

  const handleEdit = (card: Flashcard) => {
    setEditingId(card.id);
    setNewCard({ question: card.question, answer: card.answer });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFlashcard(id.toString());
      setFlashcards(flashcards.filter((card) => card.id !== id));
      setEditingId(null);
    } catch (err) {
      setError("Failed to delete flashcard.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex gap-5">
        <button className="bg-red-600 text-white py-2 px-4 rounded-md mb-5 shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition">
          <Link to="/">Click Here to Home</Link>
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white py-2 px-4 rounded-md mb-5 shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        >
          Refresh
        </button>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
        Admin Dashboard
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-4 sm:mb-6"
      >
        <h3 className="text-md sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-700">
          {editingId ? "Edit Flashcard" : "Add New Flashcard"}
        </h3>
        <input
          type="text"
          placeholder="Question"
          value={newCard.question}
          onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
          className="border border-gray-300 p-2 sm:p-3 rounded-lg mb-3 sm:mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />
        <input
          type="text"
          placeholder="Answer"
          value={newCard.answer}
          onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
          className="border border-gray-300 p-2 sm:p-3 rounded-lg mb-3 sm:mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-green-700 transition"
        >
          {editingId ? "Update Flashcard" : "Add Flashcard"}
        </button>
      </form>
      <h3 className="text-md sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-700">
        Flashcards Question List
      </h3>
      <ul className="list-disc pl-5 space-y-2">
        {flashcards.map((card) => (
          <li
            key={card.id}
            className="bg-white p-3 sm:p-4 rounded-lg shadow-sm flex justify-between items-center"
          >
            <span className="text-gray-800">{card.question}</span>
            <div className="flex gap-3 sm:gap-5">
              <button
                onClick={() => handleEdit(card)}
                className="bg-blue-600 text-white py-1 px-2 sm:px-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="bg-red-600 text-white py-1 px-2 sm:px-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

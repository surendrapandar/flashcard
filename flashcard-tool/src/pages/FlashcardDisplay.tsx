import React, { useEffect, useState } from "react";
import Flashcard from "../components/Flashcard";
import { getFlashcards } from "../API/fetchquestions";
import { Link } from "react-router-dom";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

const FlashcardDisplay: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFlashcards();
        console.log(response);
        setFlashcards(response);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setCurrentCard(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
  };

  return (
    <div className="w-full flex justify-center flex-col items-center gap-8 ">
      <div>
        <button className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition">
          <Link to="/dashboard">Admin DashBoard</Link>
        </button>
      </div>
      <div className="flex w-[50%]  h-auto flex-col items-center p-6  rounded-lg shadow-lg">
        <h1 className="font-bold text-3xl mb-3">
          FlashCard - By Surendra Pandar
        </h1>
        {flashcards.length > 0 && (
          <Flashcard flashcard={flashcards[currentCard]} />
        )}

        <div className="mt-6 flex space-x-4">
          <button
            onClick={handlePrev}
            className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDisplay;

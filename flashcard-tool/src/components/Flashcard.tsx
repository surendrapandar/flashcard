import React, { useState } from "react";

interface FlashcardProps {
  flashcard: {
    question: string;
    answer: string;
  };
}

const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="w-[90%] h-72 bg-gray-100 shadow-lg rounded-lg flex items-center justify-center cursor-pointer transition-transform transform-gpu hover:rotate-y-180"
    >
      <div className="text-xl font-semibold p-5">
        {isFlipped ? flashcard.answer : flashcard.question}
      </div>
    </div>
  );
};

export default Flashcard;

// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FlashcardDisplay from "./pages/FlashcardDisplay";
import Dashboard from "./pages/AdminDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-violet-200 to-pink-200 flex flex-col items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<FlashcardDisplay />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlastSubmit from "./pages/BlastSubmit";
import ResultPage from "./pages/ResultPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlastSubmit />} />
        <Route path="/result/:rid" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

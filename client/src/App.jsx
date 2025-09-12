import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignInSignUp from "./pages/SignInSignUp";
import CommunitiesPage from "./pages/Community";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<SignInSignUp />} />
        <Route path="/community" element={<CommunitiesPage />} />
      </Routes>
    </Router>
  );
}
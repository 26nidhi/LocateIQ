// client/src/AppRoutes.jsx
import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Communities from "./pages/Communities";
import MatchDetails from "./pages/MatchDetails";
import { AuthContext } from "./contexts/AuthContext";
import { connectSocket, disconnectSocket } from "./socket";

export default function AppRoutes() {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) connectSocket(token);
    return () => disconnectSocket();
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {token && (
        <>
          <Route path="/communities" element={<Communities />} />
          <Route path="/reports/:communityId" element={<Reports />} />
          <Route path="/matches/:matchId" element={<MatchDetails />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

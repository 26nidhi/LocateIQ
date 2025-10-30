// client/src/App.jsx
import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Communities from "./pages/Communities";
import MatchDetails from "./pages/MatchDetails";
import AuthProvider, { AuthContext } from "./contexts/AuthContext";
import { connectSocket, disconnectSocket } from "./socket";

export default function App() {
  const { token } = useContext(AuthContext);

  // Connect/disconnect socket based on token
  useEffect(() => {
    if (token) connectSocket(token);
    return () => disconnectSocket();
  }, [token]);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Private routes */}
          {token && (
            <>
              <Route path="/communities" element={<Communities />} />
              <Route path="/reports/:communityId" element={<Reports />} />
              <Route path="/matches/:matchId" element={<MatchDetails />} />
            </>
          )}

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

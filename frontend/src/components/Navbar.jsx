import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-6 bg-white/80 dark:bg-gray-900/70 shadow-md backdrop-blur-md sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
      >
        TrackBack
      </Link>

      <nav className="flex items-center gap-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 font-medium"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

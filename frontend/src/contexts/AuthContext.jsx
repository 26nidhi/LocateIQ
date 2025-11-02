// client/src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { connectSocket, disconnectSocket } from "../socket";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Helper for direct login after register
  const loginUser = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("token", userToken);

    // connect socket when user logs in
    connectSocket(userToken);
  };

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    loginUser(res.data.user, res.data.token);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");

    // disconnect socket on logout
    disconnectSocket();
  };

  // Fetch user on reload if token exists
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user);
          connectSocket(token); // reconnect socket on reload
        })
        .catch(() => logout());
    } else {
      disconnectSocket();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

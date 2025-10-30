// client/src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:3000/api/auth/login", {
      email,
      password,
    });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => logout());
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

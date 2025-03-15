// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      setUser({
        role: localStorage.getItem("userRole"),
      });
    }
  }, [token]);

  const login = (newToken, role) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userRole", role);
    setToken(newToken);
    setUser({ role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

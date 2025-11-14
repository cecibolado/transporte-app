import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./authContextShared";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const navigate = useNavigate();

  const login = useCallback(async (username, password) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return { success: false, error: data.error || "Error al iniciar sesión" };
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      setIsAuthenticated(true);
      setUser(data);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  }, [navigate]);

  const fetchAuth = useCallback(
    async (url, options = {}) => {
      const token = localStorage.getItem("token");

      const headers = {
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      return fetch(url, {
        ...options,
        headers,
      });
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, fetchAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

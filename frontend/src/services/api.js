// src/services/api.js

import axios from "axios";

// URL de la API de Laravel (asegúrate de que Laravel está corriendo)
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // ❗ Cambié esto para evitar problemas de variable de entorno
});

// Interceptor para incluir token en los headers (si es necesario)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
// src/components/Login.js
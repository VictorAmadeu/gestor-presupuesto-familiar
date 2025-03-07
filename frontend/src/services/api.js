// src/services/api.js

import axios from "axios";

// Configuramos la instancia de axios con la URL base de nuestra API de Laravel
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Asegúrate de que coincide con la URL de tu backend
});

// Ejemplo de un interceptor para incluir token en los headers (si lo llegas a usar)
api.interceptors.request.use(
  (config) => {
    // Aquí podrías agregar el token a la cabecera, por ejemplo:
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

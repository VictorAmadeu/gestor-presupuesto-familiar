// src/components/Register.js

import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // Estados para los campos de formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member'); // Por defecto 'member'
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  // Maneja el envío del formulario
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Consumimos el endpoint /api/register de tu backend
      const response = await api.post('register', {
        name,
        email,
        password,
        role
      });

      setMensaje('Registro exitoso. Ahora puedes iniciar sesión.');
      console.log(response.data);

      // Limpia los campos del formulario
      setName('');
      setEmail('');
      setPassword('');
      setRole('member');

      // Redirige al login después de unos segundos (opcional)
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error en registro:', error);
      setMensaje('Hubo un problema al registrar. Verifica los datos e inténtalo nuevamente.');
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Rol:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="member">Miembro</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;

// src/components/Register.js
import React, { useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom"; 
import api from "../services/api"; 
import AuthContext from "../context/AuthContext"; 

/* 
- Formulario de Registro con estilos de Bootstrap 
*/ 
const Register = () => {

  // Estados locales                                
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [role, setRole] = useState("member"); 
  const [mensaje, setMensaje] = useState(""); 

  const navigate = useNavigate(); 
  const { login } = useContext(AuthContext); 

  const handleRegister = async (e) => {
    
    e.preventDefault(); 
    try {
      
      const response = await api.post("register", {
        
        name, 
        email, 
        password, 
        role, 
      }); 
      setMensaje("Registro exitoso. Iniciando sesión automáticamente..."); 
      // O podrías dirigir al login en vez de loguear  
      login(response.data.token, response.data.user.role); 
      navigate("/dashboard"); 
    } catch (error) {
      
      setMensaje("Error al registrar. Verifica los datos."); 
    } 
  }; 

  return (
    
    <div className="container mt-5">
      {" "}
      
      <h2>Registro de Usuario</h2> 
      {mensaje && <div className="alert alert-info">{mensaje}</div>} 
      <form
        onSubmit={handleRegister}
        className="card p-4"
        style={{ maxWidth: "400px" }}
      >
        {" "}
        
        <div className="mb-3">
          {" "}
          
          <label className="form-label">Nombre:</label> 
          <input 
            type="text" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />{" "}
          
        </div>{" "}
        
        <div className="mb-3">
          {" "}
          
          <label className="form-label">Correo:</label> 
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />{" "}
          
        </div>{" "}
        
        <div className="mb-3">
          {" "}
          
          <label className="form-label">Contraseña:</label> 
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />{" "}
          
        </div>{" "}
        
        <div className="mb-3">
          {" "}
          
          <label className="form-label">Rol:</label> 
          <select 
            className="form-select" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
          >
            {" "}
            
            <option value="member">Miembro</option> 
            <option value="admin">Administrador</option> 
          </select>{" "}
          
        </div>{" "}
        
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>{" "}
        
      </form>{" "}
      
    </div> 
  ); 
}; 

export default Register; 

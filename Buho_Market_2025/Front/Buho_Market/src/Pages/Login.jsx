import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/LoginStyle.css';
import { UserAuth } from '../context/AuthContext';
import Carrucel from '../Componets/login/carrucel_de_imagenes.jsx';
 

export default function Login() {
  const { signInWithGoogle } = UserAuth();
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <header className="login-wrapper">


        <h1 className="Buho">Buho <spam className="Market">Market</spam></h1>

        <div className="login-buttons">
          <button 
            className="google-btn"
            onClick={signInWithGoogle}
            aria-label="Iniciar sesión con Google"
          >
            <span className="google-icon">G</span>
            Iniciar con Google
          </button>
        </div>
        
      </header>
      
      <Carrucel />
    </div>

    
  );



}
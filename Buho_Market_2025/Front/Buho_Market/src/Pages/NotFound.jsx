import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/NotFound.css'; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos 😢 , la página que buscas no existe.</p>
      <Link to="/">Volver a la página principal</Link>
    </div>
  );
};

export default NotFound;
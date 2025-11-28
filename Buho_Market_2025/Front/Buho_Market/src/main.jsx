/*import "./Css/HomeStyle.css";*/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
/*import './Css/HomeStyle.css'; */
import './Css/Publicaciones.css';

import './Css/VerPaginas.css';
import './Css/Ampliar.css';

import './Css/Header.css';
import './Css/Hero.css';
import './Css/Categorias.css';
import './Css/Footer.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

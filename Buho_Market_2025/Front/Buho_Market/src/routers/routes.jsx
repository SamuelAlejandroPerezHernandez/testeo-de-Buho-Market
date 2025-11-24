import { Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Registrarse from '../Pages/Registrarse';
import Home from "../Pages/Home.jsx";     
import RecuperearContrasena from '../Pages/RecuperarContrasena';
import Publicaciones from '../Pages/Publicaciones.jsx';
import VerPublicaciones from '../Pages/VerPublicaciones.jsx';
import PerfilUsuario from '../Pages/PerfilUsuario';
import Informacion from '../Pages/Informacion.jsx';
import NotFound from '../Pages/NotFound.jsx';
import PublicacionCompleta from '../Pages/PublicacionCompleta.jsx';

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrarse" element={<Registrarse />} />
      <Route path="/recuperarcontrasena" element={<RecuperearContrasena />} />
      <Route path="/publicaciones" element={<Publicaciones/>}/>
      <Route path="/ver-publicaciones" element={<VerPublicaciones/>}/>
      <Route path="/ver-publicaciones/:busqueda" element={<VerPublicaciones/>}/>
      <Route path="/perfil" element={<PerfilUsuario />} />
      <Route path="/informacion" element={<Informacion />} />
      <Route path= "/ampliar/:id" element={<PublicacionCompleta/>}/>
      <Route path= "*" element={<NotFound/>}></Route>
    </Routes>
  );
}
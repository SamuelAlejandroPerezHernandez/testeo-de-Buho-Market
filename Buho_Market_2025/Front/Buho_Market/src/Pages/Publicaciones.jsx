import Header from "../Componets/Pagina_principal/Header";
import Footer from "../Componets/Pagina_principal/Footer";
import Publicacion from "../Componets/Pagina_publicaciones/Publicacion";
import HeaderP from "../Componets/Pagina_principal/Header_principal";

export default function Home() {
  return (
    <div>
      <HeaderP />
      <Publicacion />
      <Footer /> 
    </div>
  );
}
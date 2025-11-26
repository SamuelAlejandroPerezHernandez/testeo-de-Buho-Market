import Header from "../Componets/Pagina_principal/Header";
import Footer from "../Componets/Pagina_principal/Footer";
import Hero from "../Componets/Pagina_principal/Hero";
import Categories from "../Componets/Pagina_principal/Categorias";
import HeaderP from "../Componets/Pagina_principal/Header_principal";

export default function Home() {
  return (
    <div>
      <HeaderP />
      <Hero />
      <Categories />
      <Footer /> 
    </div>
  );
}  
import React, { useEffect } from 'react';
import '../Css/Informacion.css';
import Header from '../Componets/Pagina_principal/Header';

import SobreNosotros from '../Componets/Pagina_informacion/SobreNosotros';
import Funcionamiento from '../Componets/Pagina_informacion/Funcionamiento';
import Reglas from '../Componets/Pagina_informacion/Reglas';
import Ayuda from '../Componets/Pagina_informacion/Ayuda';
import Seguridad from '../Componets/Pagina_informacion/Seguridad';

function Informacion() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(`panel-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        const header = document.querySelector(`[aria-controls="panel-${id}"]`);
        if (header && !header.classList.contains('open')) {
          header.click();
        }
      }
    }
  }, []);

  return (
    <div className="informacion__background"> 
      <Header />

      <div className="informacion__content"> 
        <h1>Información de Buho Market</h1>

        <SobreNosotros />
        <Funcionamiento />
        <Reglas />
        <Ayuda />
        <Seguridad />
      </div>
    </div>
  );
}

export default Informacion;
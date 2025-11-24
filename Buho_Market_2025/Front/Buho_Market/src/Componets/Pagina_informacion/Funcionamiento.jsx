import React from 'react';
import AccordionItem from './AccordionItem';


function Funcionamiento() {
  return (
    <AccordionItem title="Como funciona?" id="como-funciona">
      <p>Es muy sencillo:</p>
      <ol>
        <li>Regístrate o inicia sesión.</li>
        <li>Publica tu producto o busca lo que necesitas.</li>
        <li>Comunícate con otros usuarios y ponte de acuerdo con el vendedor o comprador.</li>
      </ol>
    </AccordionItem>
  );
}

export default Funcionamiento;
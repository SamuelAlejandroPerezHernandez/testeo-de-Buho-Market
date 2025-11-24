import React from 'react';
import AccordionItem from './AccordionItem';

function Reglas() {
  return (
    <AccordionItem title="Reglas de la comunidad" id="reglas-comunidad">
      <p>Para mantener un entorno seguro y respetuoso, te pedimos que sigas estas reglas:</p>
      <ul>
        <li>Sé honesto y transparente en tus publicaciones.</li>
        <li>No realices spam ni publicidad no solicitada.</li>
        <li>Respeta a los demás usuarios y evita lenguaje ofensivo.</li>
        <li>Reporta cualquier comportamiento o articulo inapropiado.</li>
      </ul>
    </AccordionItem>
  );
}

export default Reglas;
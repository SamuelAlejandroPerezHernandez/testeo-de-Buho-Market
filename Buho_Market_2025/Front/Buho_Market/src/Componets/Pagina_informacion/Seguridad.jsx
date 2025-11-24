import React from 'react';
import AccordionItem from './AccordionItem';

function Seguridad() {
  return (
    <AccordionItem title="Seguridad/Evita estafas" id="seguridad">

      <p>Tu seguridad es nuestra prioridad. Sigue estos consejos:</p>
      <ul>
        <li>Verifica siempre el perfil del vendedor.</li>
        <li>Utiliza métodos de pago seguros.</li>
        <li>Desconfía de ofertas demasiado buenas para ser verdad.</li>
        <li>Acuerda el lugar de la venta con la otra persona en una zona segura.</li>
      </ul>
    </AccordionItem>
  );
}

export default Seguridad;
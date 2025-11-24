
import React, { useState } from 'react';
import '../../Css/AccordionItem.css'; //  Ruta relativa correcta

function AccordionItem({ title, children, id }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <button
        className={`accordion-header ${isOpen ? 'open' : ''}`}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
      >
        <span className="accordion-icon">
          {isOpen ? '▼' : '▶'}
        </span>
        <span className="accordion-title">{title}</span>
      </button>

      <div
        id={`panel-${id}`}
        className={`accordion-panel ${isOpen ? 'open' : ''}`}
        role="region"
        aria-labelledby={`header-${id}`}
      >
        {children}
      </div>
    </div>
  );
}

export default AccordionItem;
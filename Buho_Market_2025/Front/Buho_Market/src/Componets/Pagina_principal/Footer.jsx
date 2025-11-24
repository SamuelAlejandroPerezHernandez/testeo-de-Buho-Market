import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer__web">
      <div className="back__container">
        <a className="back" href="#">INICIO DE PÁGINA</a>
      </div>
      <div className="footer__wrapper">
        <div className="about__us">
          <h2 className="footer__title">Sobre Buho Market</h2>
          <ul className="footer__list">
            <li>
              <Link to="/informacion#sobre-nosotros">sobre nosotros</Link>
            </li>
            <li>
              <Link to="/informacion#como-funciona">como funciona</Link>
            </li>
            <li>
              <Link to="/informacion#reglas-comunidad">Reglas de la comunidad</Link>
            </li>
          </ul>
        </div>
        <div className="help__section">
          <h2 className="footer__title">Ayuda</h2>
          <ul className="footer__list">
            <li>
              <Link to="/informacion#centro-ayuda">centro de ayuda</Link>
            </li>
            <li>
              <Link to="/informacion#seguridad">Seguridad / Evita estafas</Link>
            </li>
          </ul>
        </div>
        <div className="contact__section">
          <h2 className="footer__title">Contactanos</h2>
          <div className="contact__wrapper">
            <div className="img_social_network">
              <img src="/Img/facebook.png" alt="facebook"/>
            </div>
            <div className="img_social_network">
              <img src="/Img/instagram.png" alt="instagram"/>
            </div>
            <div className="img_social_network">
              <img src="/Img/youtube.png" alt="youtube"/>
            </div>
            <div className="img_social_network">
              <img src="/Img/X.png" alt="X"/>
            </div>
            <div className="img_social_network">
              <img src="/Img/whatsapp.png" alt="whatsapp"/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
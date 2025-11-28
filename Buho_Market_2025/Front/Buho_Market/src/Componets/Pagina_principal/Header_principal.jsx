import { UserAuth } from "../../context/AuthContext.jsx";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase.js";
import { useState, useEffect, useRef } from 'react';

function HeaderP() {
    const { signout } = UserAuth();
    const navigate = useNavigate();
    const [userName, setUserName] = useState("usuario");
    const [foto, setFoto] = useState("/Img/lines.png");
    const [isOpen, setIsOpen] = useState(false);

    const CerrarSesion = async () => {
        try {
            if(typeof signout === 'function'){
                await signout();
                console.log("sesion cerrada");
            }
            else{
                console.log("no se encontro la funcion para cerrar sesion")
            }
        }catch (error) {
            console.log(error);
        }
    }

/*datos del usuario bors*/ 
    useEffect(() => {
        const usuario = async () => {
            const resultado = await supabase
            .auth
            .getUser()

            if(resultado.data !== null && resultado.data.user !==null) {
                const info = resultado.data.user;
                let nombreUsuario = 'nombre usuario';
                let icono = "/Img/lines.png";

                if(info.user_metadata && info.user_metadata.full_name){
                    nombreUsuario = info.user_metadata.full_name;
                }
                else if(info.email) {
                    const partes = info.email.split("@");
                    nombreUsuario = partes[0];
                }

                if(info.user_metadata && info.user_metadata.avatar_url){
                    icono = info.user_metadata.avatar_url;
                }

                setFoto(icono);
                setUserName(nombreUsuario);
            }
            else {
                setUserName('user Name');
                setFoto("/Img/lines.png");
            }
        }
        usuario();
    }, []);


/*abrirle y cerrarle el dropdown a la pagina bros*/
     useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
     

    const DropDown = () => {
        setIsOpen(!isOpen)
    }

    const dropdownRef = useRef(null);

    let menuOpenDisplay = "none";
    let menuCloseDisplay = "block";

    if(isOpen){
        menuOpenDisplay = "none"
        menuCloseDisplay = "block"
    }
    else if(!isOpen){
        menuOpenDisplay = "block"
        menuCloseDisplay = "none"
    }

    let dropdownDisplay = "";

    if(isOpen){
        dropdownDisplay = 'drop__down active';
    }
    else{
        dropdownDisplay = 'drop__down';
    }


/*navegar al incio bros*/
    const ir = () => {
        navigate('/')
    }

    return (
        <header className="web__header">
        <div className="header__presentation">
            <img className="web__logo" onClick={ir} src="/Img/new_logo.jpeg" alt="web__logo"/>
            <h1 className="web__name">Buho <span>Market</span></h1>
        </div>
        <div className="buscador__menu">
            <div className="menu">
                <img className="menu__open" src="/Img/lines.png" 
                    style= {{ display: menuOpenDisplay }}
                    onClick={ DropDown }
                />
                <img className="menu__close" src="/Img/purple lines.png"
                    style= {{ display: menuCloseDisplay }}
                    onClick={ DropDown }
                />
            </div>
        </div>


       <nav className={dropdownDisplay} ref={dropdownRef}>
            <div className="drop__down__wrapper">
                <div className="user__info">

                    <img className="user__foto" src = {foto}/>
                    <h2 className="user__name">{userName}</h2>
                    
                </div>
                <ul className="nav__list__item">
                    <li className="nav_item">
                        <div className="imgContainer">
                            <img className="nav__img" src="/Img/home.webp"/>
                        </div>

                        <Link className="nav_link" to="/">Inicio</Link>
                    </li>
                    <li className="nav_item">
                        <div className="imgContainer">
                            <img className="nav__img" src="/Img/usuario.png"/>
                        </div>
                        
                        <Link className="nav_link" to="/perfil">Perfil</Link>
                    </li>
                    <li className="nav_item">
                        <div className="imgContainer">
                            <img className="nav__img" src="/Img/menu.png"/>
                        </div>

                        <Link className="nav_link" to="/ver-publicaciones/Ver-mis-publicaciones">Ver mis publicaciones</Link>
                    </li>
                    <li className="nav_item">
                        <div className="imgContainer">
                            <img className="nav__img" src="/Img/menu.png"/>
                        </div>

                        <Link className="nav_link" to="/PrevEditMisPubs/editar_mis_publicaciones">Editar publicaciones</Link>
                    </li>
                    <li className="nav_item">
                        <div className="imgContainer">
                            <img className="nav__img" src="/Img/subir.png"/>
                        </div>

                        <Link className="nav_link" to="/publicaciones">Publicar</Link>
                    </li>
                    <li className="nav_item">
                        <div className="imgContainer">
                            <img className="nav__img" src="/Img/cerrar.png"/>
                        </div>

                        <a className="nav_link" href="#" onClick={ CerrarSesion }> Cerrar sesion </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    );
}

export default HeaderP;
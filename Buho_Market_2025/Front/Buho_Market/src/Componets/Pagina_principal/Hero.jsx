import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate = useNavigate();

    const verPublicaciones_route = () => {
        navigate('/ver-publicaciones');
    }

    return (
    <section id="hero">
        <div className='heroWrapper'>
            <h1>Encuentra todo lo que necesitas en <br/> <span>"Buho Market"</span></h1>
            <div className='button_container'>
                <button className="hero__button" onClick={verPublicaciones_route}>
                    <spam className='completo'>VER PUBLICACIONES</spam>
                    <spam className='imcompleto'>VER +</spam>
                </button>
            </div>
        </div>
    </section>

    )
}

export default Hero;





























































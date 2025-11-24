import { useEffect, useState } from 'react';
import { supabase } from "../../supabase/supabase.js";
import { Fragment } from "react"
import { useParams } from 'react-router-dom';

function AmpliarPublicacion(){
    
    const {id} = useParams();

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [contacto, setContacto] = useState("")
    const [usuario, setUsuario] = useState("USER");

    const [categoria, setCategoria] = useState("");

    const [imagenes, setImagenes] = useState([]);
    const [indice, setIndice] = useState(0);

    useEffect(() => {
        const obtenerInfo = async() => {
            const resultadoPub = await supabase
            .from('publicaciones')
            .select('titulo, precio, descripcion, contacto, id, categoria_id, propietario')
            .eq('id', id)
            .single();

            setTitulo(resultadoPub.data.titulo);
            setDescripcion(resultadoPub.data.descripcion);
            setPrecio(resultadoPub.data.precio);
            setContacto(resultadoPub.data.contacto)
            setUsuario(resultadoPub.data.propietario)
            
            setCategoria(resultadoPub.data.categoria_id)

            const CatAndPub = resultadoPub.data.categoria_id;

            const obtenerCategoria = async() => {
                const resultadoCat = await supabase
                .from('categorias')
                .select('id, nombre')
                .eq('id', CatAndPub)
                .single();

                setCategoria(resultadoCat.data.nombre);
            }

            obtenerCategoria();
        }

        const obtenerImagenes = async() => {
            const resultadoIMG = await supabase
            .from('fotos_publicacion')
            .select('url_foto')
            .eq('publicacion_id', id);

            const Url = resultadoIMG.data.map(elemntoArray => elemntoArray.url_foto);
            setIndice(0);
            setImagenes(Url);
        }

        obtenerInfo();
        obtenerImagenes();

    }, [id])

    const siguiente = () => {
        setIndice((indicePrev) => {
            if(indicePrev === imagenes.length - 1){
                return 0;
            }
            else{
                return indicePrev + 1;
            }
        })
    }

    const atras = () => {
        setIndice((indicePast) => {
            if(indicePast === 0){
                return imagenes.length - 1;
            }
            else{
                return indicePast - 1;
            }
        })
    }

    const imagenActual = imagenes[indice];

    let contenidoImagen;
    if (imagenActual) {
        contenidoImagen = (
            <img
            src={imagenActual}
            alt={`Imagen ${indice + 1}`}
            className="imagen-carrusel"
            />
        );
    } else {
        contenidoImagen = (
            <div className="imagen-placeholder">
            Cargando imagen...
            </div>
        );
    }


    return(
        <section className='main__container_pp'>
            <div className='wrapper'>
                    <div className="main__container_slider">

                        {imagenes.length > 1 && (
                            <>
                            <div className="left__container" onClick={atras}>
                                <img className="leftArrow_" src="/Img/arrowL.png" alt="Anterior" />
                            </div>
                            <div className="right__container" onClick={siguiente}>
                                <img className="rightArrow_" src="/Img/arrowR.png" alt="Siguiente" />
                            </div>
                            </>
                        )}

                        <div className="container__images">
                            {contenidoImagen}
                        </div>
                    </div>
                <div className='info__container'>

                    <div className='pub__info'>
                        <h1 className='info'>{titulo}</h1>

                        <h1 className='info'>{"precio: "+" $ "+precio}</h1>
                    </div>

                    <div className='pub__info'>
                        <h1 className='titulo'>envia un mensaje:</h1>
                        <h1 className='info'>{contacto}</h1>
                    </div>

                    <div className='pub__info'>
                        <h1 className='titulo'>detalles sobre el producto:</h1>
                        <h1 className='info'>{descripcion}</h1>
                    </div>
                        
                    <div className='pub__info'>
                        <h1 className='titulo'>categoria del producto:</h1>
                        <h1 className='info'>{categoria}</h1>
                    </div>

                    <div className='pub__info'>
                        <h1 className='titulo'>datos del usuario:</h1>
                        <h1 className='info'>{usuario}</h1>
                    </div>

                </div>
            </div>
        </section>
    )

}

export default AmpliarPublicacion;
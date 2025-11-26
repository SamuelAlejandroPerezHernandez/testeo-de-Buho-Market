import { useState, useEffect } from 'react';




function carrucel(){

    const carrucelImagenes = [
    "/Img/carrucel_epico_epicaso_1.png",
    "/Img/carrucel_epico_epicaso_2.png",
    "/Img/carrucel_epico_epicaso_3.png"

    ]

    const [indice, setIndice] = useState(0);

    useEffect(() => {
        const cambiarImagen = setInterval(() => {
            setIndice((indicePrev) => {
                if(indicePrev === carrucelImagenes.length - 1){
                    return 0;
                }
                else{
                    return indicePrev + 1;
                }
            })
        }, 4000);

        return () => {
            clearInterval(cambiarImagen);
        };
    }, [])
    

    const imagenActual = carrucelImagenes[indice];

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
        
            <div className="slider-container">
                <div className="container-images">
                    {contenidoImagen}
                </div>
            </div>
    )

}

export default carrucel;
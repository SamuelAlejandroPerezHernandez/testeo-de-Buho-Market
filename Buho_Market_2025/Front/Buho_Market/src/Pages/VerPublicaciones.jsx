import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import { Fragment } from "react"
import { useParams } from 'react-router-dom';
import Card from '../Componets/Pagina_publicaciones/Publicacion_card';
import Header from "../Componets/Pagina_principal/Header";
import Footer from "../Componets/Pagina_principal/Footer";

export default function VerPublicaciones() {

    const { busqueda } = useParams();
     
    const [publicacionesId, setPublicacionesId] = useState([]);

    useEffect(() => {
        const publicByCategory = async() => {
            let obCatId; /**para entender la logica comparando con lo anterior/ obID = obCatId*/

            if(busqueda) {
                if(busqueda === "Tecnología" || busqueda === "Literatura" || busqueda === "Accesorios"){
                    obCatId = await supabase
                    .from('categorias')
                    .select('id')
                    .eq('nombre', busqueda)
                    .single();

                    if (obCatId.error || !obCatId.data) {
                        setPublicacionesId([]);
                        return;
                    }

                    const categoriaId = obCatId.data.id;

                    const puclicId = await supabase
                    .from('publicaciones')
                    .select('id')
                    .eq('categoria_id', categoriaId);

                    setPublicacionesId(puclicId.data || []);
                }
                else{
                    const puclicId = await supabase 
                    .from('publicaciones')
                    .select('id')
                    .ilike('titulo', `%${busqueda}%`);

                    setPublicacionesId(puclicId.data || []);
                }
            }
            else{
                const puclicId = await supabase
                .from('publicaciones')
                .select('id');
                setPublicacionesId(puclicId.data || []);
            }
        }

        publicByCategory();

    }, [busqueda]);
    
    return (
        <div>
            <Header />
            <div className="cardsContainer">
                {publicacionesId.map((pub) => (
                <Card key={pub.id} publicacionId={pub.id}/>
                ))}
            </div>
            <Footer /> 
        </div>
    );
}

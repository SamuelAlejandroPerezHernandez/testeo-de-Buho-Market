import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import { Fragment } from "react"
import { useParams } from 'react-router-dom';
import Header from "../Componets/Pagina_principal/Header";
import Footer from "../Componets/Pagina_principal/Footer";

import PrevEdit from '../Componets/Pagina_publicaciones/SeleccionPublicacion.jsx';

import { UserAuth } from "../context/AuthContext.jsx";

import '../Css/Edit.css';


export default function PrevEditMisPubs() {

    const { editar } = useParams();
    const { user } = UserAuth();
     
    const [publicacionesId, setPublicacionesId] = useState([]);

    useEffect(() => {
        const publicByCategory = async() => {
            if(editar) {
                

                if(editar === "editar_mis_publicaciones"){
                    const misPublic = await supabase
                    .from('publicaciones')
                    .select('id')
                    .eq('usuario_id', user.id);

                    setPublicacionesId(misPublic.data || []);
                }
            }
            else{
                
            }
        }

        publicByCategory();

    }, [editar, user]);
    
    return (
        <div>
            <Header />
            <div className="cardsContainer">
                {publicacionesId.map((pub) => (
                <PrevEdit key={pub.id} publicacionId={pub.id}/>
                ))}
            </div>
            <Footer /> 
        </div>
    );
}

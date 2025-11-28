import { UserAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from 'react';
import { supabase } from "../../supabase/supabase.js";
import { useParams } from 'react-router-dom';

function Editando() {
    const [titulo, setTitulo] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [contacto, setContacto] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [userName, setUserName] = useState('')


    const {user} = UserAuth();
    const {idPub} = useParams();

    useEffect(() => {
        const obtenerCategorias = async() => {
            const resultadoCat = await supabase
            .from('categorias')
            .select('id, nombre');

            setCategorias(resultadoCat.data || [])

        }

        const obtenerNombre = async() => {
            const nombre = await supabase
            .auth
            .getUser()

            if(nombre.data !== null && nombre.data.user !==null){
                let userInfo = nombre.data.user;
                let nombreUsuario = 'nombre usuario';

                if(userInfo.user_metadata && userInfo.user_metadata.full_name){
                nombreUsuario = userInfo.user_metadata.full_name;
                }
                else if(userInfo.email) {
                    const partes = userInfo.email.split("@");
                    nombreUsuario = partes[0];
                }

                setUserName(nombreUsuario)

            }
            

        }

        obtenerNombre();
        obtenerCategorias();

    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const insertarData = async() => {
                const insrtarSB = await supabase
                .from('publicaciones')
                .update({
                titulo: titulo,
                descripcion: descripcion,
                precio: parseFloat(precio),
                contacto: contacto,
                categoria_id: categoriaId,
                usuario_id: user.id,
                propietario: userName
                })
                .select()
                .single()
                .eq('id', idPub);

                await supabase
                .from('fotos_publicacion')
                .delete()
                .eq('publicacion_id', idPub);


                for (let i = 0; i < imagenes.length; i++) {
                    const file = imagenes[i];
                    const fileName = `${user.id}/${Date.now()}_${i}_${file.name}`;

                    
                    await supabase
                    .storage
                    .from('fotos-productos')
                    .upload(fileName, file)
                    
                    
                    const obtenerUrl = await supabase
                    .storage
                    .from('fotos-productos')
                    .getPublicUrl(fileName);

                    await supabase
                    .from('fotos_publicacion')
                    .insert({
                        publicacion_id: insrtarSB.data.id,
                        url_foto: obtenerUrl.data.publicUrl,
                        orden: i + 1
                    })
                }

                alert("¡Publicación creada exitosamente!");

                setTitulo('');
                setCategoriaId('');
                setDescripcion('');
                setPrecio('');
                setContacto('');
                setImagenes([]);

            }

            insertarData();
        }
        catch{
            console.error("error al crear la publicacion:", error);
            alert("Hubo un error al crear la publicacion");
        }
    }

    return (
        <div className="wrapper_publicacion">
            <form onSubmit={handleSubmit}>
                <div className="files_wrapper">
                    <input
                        type="file"
                        id="file-upload"
                        className="input-imagenes"
                        placeholder="Imagenes"
                        multiple
                        onChange={(e) => setImagenes(Array.from(e.target.files))}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        className="input-titulo"
                        placeholder="Ingrese el nuevo titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    ></input>

                    <input
                        type="number"
                        className="input-precio"
                        placeholder="Ingrese el nuevo precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    ></input>

                    <input
                        type="text"
                        className="input-descripcion"
                        placeholder="Ingrese el nuevo descripcion de la publicacion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></input>

                    <input
                        type="text"
                        className="input_contact"
                        placeholder="Ingrese el nuevo contacto"
                        value={contacto}
                        onChange={(e) => setContacto(e.target.value)}
                    >
                    </input>

                    <select value={categoriaId} onChange={(e) => {
                        setCategoriaId(e.target.value)
                    }}>
                        <option value={""}>
                            Seleccione la categoria
                        </option>

                        {categorias.map((categoriaBRO) => (
                            <option key={categoriaBRO.id} value={categoriaBRO.id}>
                                {categoriaBRO.nombre}
                            </option>
                        ))}
                    </select>

                    <button type="submit">Actualizar</button>
                </div>
            </form>
        </div>
    )
}
export default Editando;
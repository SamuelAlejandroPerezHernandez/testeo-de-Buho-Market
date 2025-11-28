import { UserAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from 'react';
import { supabase } from "../../supabase/supabase.js";

function Publicacion() {
    const [titulo, setTitulo] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [contacto, setContacto] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [userName, setUserName] = useState('')


    const {user} = UserAuth();

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

        if(!titulo || !categoriaId || !precio || !contacto){
            alert("debe completar todos los campos antes de publicar");
            return;
        }

        if(imagenes.length !== 5){
            alert("debe ingresar 5 imagenes antes de publicar");
            console.log('Cantidad de imágenes:', imagenes.length);
            return;
        }

        try{
            const insertarData = async() => {
                const insrtarSB = await supabase
                .from('publicaciones')
                .insert({
                titulo: titulo,
                descripcion: descripcion,
                precio: parseFloat(precio),
                contacto: contacto,
                categoria_id: categoriaId,
                usuario_id: user.id,
                propietario: userName
                })
                .select()
                .single();

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
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    ></input>

                    <input
                        type="number"
                        className="input-precio"
                        placeholder="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    ></input>

                    <input
                        type="text"
                        className="input-descripcion"
                        placeholder="descripcion de la publicacion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></input>

                    <input
                        type="text"
                        className="input_contact"
                        placeholder="contacto"
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

                    <button type="submit">Publicar</button>
                </div>
            </form>
        </div>
    )
}
export default Publicacion;



/*
useEffect(() => {
        const fetchCategorias = async () => {
            const { data, error } = await supabase
            .from('categorias')
            .select('id, nombre');
  
            console.log('Datos de categorías:', data); 
            console.log('Error de categorías:', error); 

            if(error){
                console.error('error al cargar las categorias:', error);
            }
            else{
                setCategorias(data || []);
                console.log('Categorías guardadas en estado:', data);
            }

        };

        fetchCategorias();

    }, [])






    e.preventDefault();

        if(!titulo || !categoriaId || !precio || !contacto){
            alert("debe completar todos los campos antes de publicar");
            return;
        }

        if(imagenes.length !== 5){
            alert("debe ingresar 5 imagenes antes de publicar");
            console.log('Cantidad de imágenes:', imagenes.length);
            return;
        }

        try{
            const { data: publicacion, error: dbError } = await supabase
                .from('publicaciones')
                .insert({
                    titulo,
                    categoria_id: categoriaId,
                    descripcion,
                    precio: parseFloat(precio),
                    estado: true,
                    usuario_id: user.id,
                    contacto
                })
                .select()
                .single();


            for (let i = 0; i < imagenes.length; i++) {
                const file = imagenes[i];
                const fileName = `${user.id}/${Date.now()}_${i}_${file.name}`;

                const { error: uploadError } = await supabase
                    .storage
                    .from('fotos-productos')
                    .upload(fileName, file);

                if (uploadError) throw uploadError;

                const { data } = supabase
                    .storage
                    .from('fotos-productos')
                    .getPublicUrl(fileName);

                const { error: fotoError } = await supabase
                    .from('fotos_publicacion')
                    .insert([
                        {
                            publicacion_id: publicacion.id,
                            url_foto: data.publicUrl,
                            orden: i + 1
                        }
                    ]);

                if (fotoError) throw fotoError;
            }

            alert("¡Publicación creada exitosamente!");
            
            setTitulo('');
            setCategoriaId('');
            setDescripcion('');
            setPrecio('');
            SetContacto('');
            setImagenes([]);

        }catch (error){
            console.error("error al crear la publicacion:", error);
            alert("Hubo un error al crear la publicacion");
        }
*/

/*
<select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
                        <option value=""> Seleccione una categoria </option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>

*/
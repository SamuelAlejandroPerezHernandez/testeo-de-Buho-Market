import { UserAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from 'react';
import { supabase } from "../../supabase/supabase.js";
import { useParams } from 'react-router-dom';
import '../../Css/Actualizar.css';

function Editando() {
  const [titulo, setTitulo] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [contacto, setContacto] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [userName, setUserName] = useState('');

  const { user } = UserAuth();
  const { idPub } = useParams();

  useEffect(() => {
    const obtenerCategorias = async () => {
      const resultadoCat = await supabase
        .from('categorias')
        .select('id, nombre');
      setCategorias(resultadoCat.data || []);
    };

    const obtenerNombre = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const userInfo = data.user;
        let nombreUsuario = 'nombre usuario';

        if (userInfo.user_metadata?.full_name) {
          nombreUsuario = userInfo.user_metadata.full_name;
        } else if (userInfo.email) {
          nombreUsuario = userInfo.email.split("@")[0];
        }
        setUserName(nombreUsuario);
      }
    };

    obtenerNombre();
    obtenerCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !categoriaId || !precio || !contacto) {
      alert("Debe completar todos los campos antes de actualizar");
      return;
    }

    if (imagenes.length !== 5) {
      alert("Debe ingresar exactamente 5 imágenes");
      return;
    }

    try {
      const { data: pubActualizada } = await supabase
        .from('publicaciones')
        .update({
          titulo,
          descripcion,
          precio: parseFloat(precio),
          contacto,
          categoria_id: categoriaId,
          usuario_id: user.id,
          propietario: userName
        })
        .eq('id', idPub)
        .select()
        .single();

    
      await supabase
        .from('fotos_publicacion')
        .delete()
        .eq('publicacion_id', idPub);

    
      for (let i = 0; i < imagenes.length; i++) {
        const file = imagenes[i];
        const fileName = `${user.id}/${Date.now()}_${i}_${file.name}`;
        
        await supabase.storage.from('fotos-productos').upload(fileName, file);
        const { data: { publicUrl } } = await supabase.storage.from('fotos-productos').getPublicUrl(fileName);

        await supabase
          .from('fotos_publicacion')
          .insert({
            publicacion_id: pubActualizada.id,
            url_foto: publicUrl,
            orden: i + 1
          });
      }

      alert("¡Actualización exitosa!");
  
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Hubo un error al actualizar la publicación");
    }
  };

  return (
    <div className="edicion__contenedor-principal">
      <form onSubmit={handleSubmit} className="edicion__formulario">
        <div className="edicion__contenedor-archivos">
          <input
            type="file"
            className="edicion__input-archivos"
            multiple
            onChange={(e) => setImagenes(Array.from(e.target.files))}
          />
        </div>
        <div className="edicion__contenedor-campos">
          <input
            type="text"
            className="edicion__input-titulo"
            placeholder="Ingrese el nuevo título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            type="number"
            className="edicion__input-precio"
            placeholder="Ingrese el nuevo precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <input
            type="text"
            className="edicion__input-descripcion"
            placeholder="Nueva descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            type="text"
            className="edicion__input-contacto"
            placeholder="Nuevo contacto"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
          />
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="edicion__select-categoria"
          >
            <option value="">Seleccione la categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
          <button type="submit" className="edicion__btn-actualizar">
            Actualizar Publicación
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editando;
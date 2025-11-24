// PerfilUsuario.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Css/PerfilUsuario.css';
import Footer from "../Componets/Pagina_principal/Footer";
import { supabase } from '../supabase/supabase'; 

const PerfilUsuario = () => {
  const [user, setUser] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        //  Obtener usuario autenticado
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        if (authError || !authUser) {
          navigate('/login');
          return;
        }

        // Extraer datos
        const userId = authUser.id;
        let nombre = authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Usuario';
        let avatarUrl = authUser.user_metadata?.picture || '/Img/user.png';

        setUser({ id: userId, nombre, avatarUrl });

        //  Cargar publicaciones
        const { data: pubs, error: pubError } = await supabase
        .from('publicaciones')
        .select('*')
        .eq('usuario_id', userId)   
        .order('created_at', { ascending: false });

        if (pubError) {
          console.error('Error al cargar publicaciones:', pubError);
          setPublicaciones([]);
        } else {
          setPublicaciones(pubs || []);
        }
      } catch (error) {
        console.error('Error inesperado:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="perfil-container">
        <main style={{ textAlign: 'center', padding: '2rem' }}>
          Cargando perfil...
        </main>
      </div>
    );
  }

  // Función para formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="perfil-container">
      {/* HEADER */}
     <header>
  <div className="header-contenido">
    <Link to="/" className="logo-link">
      <img 
        src="/Img/new_logo.jpeg" 
        alt="Buho Market" 
        className="logo"
      />
    </Link>
    <h1>Perfil</h1>
  </div>
</header>

      <main>

  <section className="perfil-doble-columna">
  {/* COLUMNA IZQUIERDA*/}
  <div className="perfil-info">
    <img 
      src={user.avatarUrl} 
      alt="Foto de perfil" 
      onError={(e) => {
    e.target.onerror = null; // Evita bucle
    e.target.src = '/Img/user.png';
    }
    }
    />
    <div>
      <h2 className="nombre-usuario">{user.nombre}</h2>
      <p><strong>ID:</strong> {user.id.substring(0, 8)}...</p>
      <span title="Cuenta verificada UCA">✓ Cuenta verificada</span>
    </div>
  </div>

  {/* COLUMNA DERECHA */}
  <div className="configuracion-cuenta">
    <h2>Configuración de Cuenta</h2>
    <div className="config-opciones">
      <button>Editar perfil</button>
      <button>Cambiar contraseña</button>
      <button onClick={() => {
        supabase.auth.signOut();
        navigate('/login');
      }}>Cerrar sesión</button>
    </div>
  </div>
</section>

        {/* MIS PUBLICACIONES */}
        <section id="mis-publicaciones">
          <h2>Mis Publicaciones</h2>

          {/* Filtros de estado */}
          <div className="filtros-estado">
            <label>
              <input type="radio" name="estado" defaultChecked /> Todas
            </label>
            <label>
              <input type="radio" name="estado" /> Disponibles
            </label>
            <label>
              <input type="radio" name="estado" /> Vendidas
            </label>
          </div>

          {publicaciones.length === 0 ? (
            <p id="mensaje-sin-publicaciones">No has publicado nada aún.</p>
          ) : (
            <div id="lista-publicaciones">
              {publicaciones.map((pub) => (
                <div key={pub.id} className="publicacion">
                  {pub.imagen_url ? (
                    <img src={pub.imagen_url} alt={pub.titulo} />
                  ) : (
                    <div style={{ width: '85px', height: '85px', backgroundColor: '#222', borderRadius: '8px' }} />
                  )}
                  <div>
                    <h3>{pub.titulo}</h3>
                    <p>{pub.descripcion?.substring(0, 100)}...</p>
                    <small>{formatDate(pub.created_at)}</small>
                    <span className={`estado ${pub.estado || 'disponible'}`}>
                      {pub.estado || 'Disponible'}
                    </span>
                    <div className="acciones-publicacion">
                      <button>Editar</button>
                      <button>Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button id="btn-agregar-producto" onClick={() => navigate('/publicaciones')}>
            + Agregar nuevo producto
          </button>
        </section>

        {/* REPUTACIÓN */}
        <section id="reputacion">
          <h2>Reputación</h2>
          <p id="sin-comentarios">Aún no tienes reseñas.</p>
        </section>

      </main>
      
      <Footer/>
    </div>
    
  );
  
};

export default PerfilUsuario;
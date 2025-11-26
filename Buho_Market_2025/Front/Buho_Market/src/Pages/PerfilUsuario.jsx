// src/Pages/PerfilUsuario.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/PerfilUsuario.css';
import Footer from "../Componets/Pagina_principal/Footer";
import { supabase } from '../supabase/supabase';
import Reputacion from '../Componets/Pagina_PerfilUsuario/Reputacion';
import Informacion_Perfil from '../Componets/Pagina_PerfilUsuario/Informacion_Perfil';
import Lista_Publicaciones from '../Componets/Pagina_PerfilUsuario/Lista_Publicaciones';

const PerfilUsuario = () => {
  const [user, setUser] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Obtener usuario autenticado
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        if (authError || !authUser) {
          navigate('/login');
          return;
        }

        // Extraer datos
        const userId = authUser.id;
        let nombre = authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Usuario';
        let avatarUrl = authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || '/Img/user.png';

        setUser({ id: userId, nombre, avatarUrl });

        // Cargar publicaciones
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="perfil-container">
        <main style={{ textAlign: 'center', padding: '2rem' }}>
          Cargando perfil...
        </main>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <header>
        <div className="header-contenido">
          <a href="/" className="logo-link">
            <img src="/Img/new_logo.jpeg" alt="Buho Market" className="logo" />
          </a>
          <h1>Perfil</h1>
        </div>
      </header>

      <main>
        <Informacion_Perfil user={user} />
        <Lista_Publicaciones publicaciones={publicaciones} formatDate={formatDate} />
        <Reputacion />
      </main>

      <Footer />
    </div>
  );
};

export default PerfilUsuario;
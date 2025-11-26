
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/supabase';

export default function Informacion_Perfil({ user }) {
  const navigate = useNavigate();

  return (
    <section className="perfil-doble-columna">
      {/* COLUMNA IZQUIERDA */}
      <div className="perfil-info">
        <img 
          src={user.avatarUrl} 
          alt="Foto de perfil" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/Img/user.png';
          }}
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
  );
}

import { useNavigate } from 'react-router-dom';

export default function Lista_Publicaciones({ publicaciones, formatDate }) {
  const navigate = useNavigate();

  return (
    <section id="mis-publicaciones">
      <h2>Mis Publicaciones</h2>

      <div className="filtros-estado">
        <label><input type="radio" name="estado" defaultChecked /> Todas</label>
        <label><input type="radio" name="estado" /> Disponibles</label>
        <label><input type="radio" name="estado" /> Vendidas</label>
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
                  <button onClick={() => navigate(`/Editar/${(pub.id)}`)}>
                  Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button id="btn-agregar-producto" onClick={() => navigate('/publicaciones')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className="btn-icon">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.375 7h8.25L14.102 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        Publicar producto
      </button>
    </section>
  );
}
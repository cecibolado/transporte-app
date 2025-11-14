import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function DetalleConductores() {
  const [conductores, setConductores] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    try {
      const res = await fetch("http://localhost:3000/conductores");
      const data = await res.json();
      setConductores(data.data || []);
    } catch (error) {
      console.error("Error cargando conductores", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const eliminarConductor = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este conductor?")) return;

    try {
      await fetch(`http://localhost:3000/conductores/${id}`, {
        method: "DELETE"
      });

      // Actualizar lista
      setConductores(conductores.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  if (loading) return <p>Cargando conductores...</p>;

  return (
    <div>
      <h2>Lista de Conductores</h2>

      <Link to="/conductores/nuevo">
        <button>➕ Nuevo Conductor</button>
      </Link>

      <table style={{ marginTop: "15px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Licencia</th>
            <th>Vencimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {conductores.length === 0 ? (
            <tr>
              <td colSpan="7">No hay conductores cargados</td>
            </tr>
          ) : (
            conductores.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.apellido}</td>
                <td>{c.dni}</td>
                <td>{c.licencia}</td>
                <td>{c.licencia_vencimiento}</td>
                <td>
                  <Link to={`/conductores/editar/${c.id}`}>
                    <button>✏️ Editar</button>
                  </Link>

                  <button
                    style={{ marginLeft: "8px" }}
                    onClick={() => eliminarConductor(c.id)}
                  >
                    🗑 Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

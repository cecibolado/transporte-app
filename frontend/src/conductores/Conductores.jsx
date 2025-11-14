import { useEffect, useState } from "react";
import { AuthRol, useAuth } from "../Auth";
import { Link } from "react-router";

export default function Conductores() {
  const { fetchAuth } = useAuth();
  const [conductores, setConductores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/conductores")
      .then(res => res.json())
      .then(data => setConductores(data.data))
      .catch(err => console.error(err));
  }, []);

  const eliminarConductor = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este conductor?")) return;

    await fetchAuth(`http://localhost:3000/conductores/${id}`, { method: "DELETE" });
    setConductores(conductores.filter(c => c.id !== id));
  };

  return (
    <article>
      <h1>Conductores</h1>

      <AuthRol rol="admin">
        <Link role="button" to="/conductores/crear">➕ Nuevo Conductor</Link>
      </AuthRol>

      <table>
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
          {conductores.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nombre}</td>
              <td>{c.apellido}</td>
              <td>{c.dni}</td>
              <td>{c.licencia}</td>
              <td>{c.licencia_vencimiento?.substring(0, 10)}</td>
              <td>
                <Link role="button" to={`/conductores/${c.id}`}>Ver</Link>

                <AuthRol rol="admin">
                  <Link role="button" to={`/conductores/${c.id}/modificar`}>Editar</Link>

                  <button onClick={() => eliminarConductor(c.id)}>
                    Eliminar
                  </button>
                </AuthRol>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

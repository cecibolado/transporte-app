import { useEffect, useState } from "react";
import { AuthRol, useAuth } from "../Auth";
import { Link } from "react-router";

export function Vehiculos() {
  const { fetchAuth } = useAuth();
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/vehiculos")
      .then(res => res.json())
      .then(data => setVehiculos(data.data))
      .catch(err => console.error(err));
  }, []);

  const eliminarVehiculo = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este vehículo?")) return;

    await fetchAuth(`http://localhost:3000/vehiculos/${id}`, { method: "DELETE" });
    setVehiculos(vehiculos.filter(v => v.id !== id));
  };

  return (
    <article>
      <h1>Vehículos</h1>

      <AuthRol rol="admin">
        <Link role="button" to="/vehiculos/crear">
          ➕ Nuevo Vehículo
        </Link>
      </AuthRol>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Patente</th>
            <th>Año</th>
            <th>Capacidad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {vehiculos.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.marca}</td>
              <td>{v.modelo}</td>
              <td>{v.patente}</td>
              <td>{v.ano?.substring(0, 10)}</td>
              <td>{v.capacidad_carga}</td>
              <td>
                <Link role="button" to={`/vehiculos/${v.id}`}>
                  Ver
                </Link>

                <AuthRol rol="admin">
                  <Link role="button" to={`/vehiculos/${v.id}/modificar`}>
                    Editar
                  </Link>

                  <button 
                    onClick={() => eliminarVehiculo(v.id)}
                  >
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

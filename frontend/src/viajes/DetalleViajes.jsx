import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function DetalleViajes() {
  const [viajes, setViajes] = useState([]);

  const cargar = async () => {
    const res = await fetch("http://localhost:3000/viajes");
    const data = await res.json();
    setViajes(data.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar viaje?")) return;

    await fetch(`http://localhost:3000/viajes/${id}`, {
      method: "DELETE",
    });

    cargar();
  };

  return (
    <div className="container">
      <h2>Viajes</h2>

      <Link to="/viajes/nuevo">
        <button>Nuevo Viaje</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vehículo</th>
            <th>Conductor</th>
            <th>Salida</th>
            <th>Llegada</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Kms</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {viajes.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.vehiculo_id}</td>
              <td>{v.conductor_id}</td>
              <td>{v.fecha_salida}</td>
              <td>{v.fecha_llegada}</td>
              <td>{v.origen}</td>
              <td>{v.destino}</td>
              <td>{v.kilometros}</td>
              <td>
                <Link to={`/viajes/${v.id}/editar`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => eliminar(v.id)} className="secondary">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

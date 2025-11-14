import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function DetallesVehiculo() {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/vehiculos/${id}`)
      .then(res => res.json())
      .then(data => setVehiculo(data.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!vehiculo) return <p>Cargando...</p>;

  return (
    <article>
      <h2>Detalles del Vehículo</h2>
      <p>
        Marca: <b>{vehiculo.marca}</b>
      </p>
      <p>
        Modelo: <b>{vehiculo.modelo}</b>
      </p>
      <p>
        Patente: <b>{vehiculo.patente}</b>
      </p>
      <p>
        Año: <b>{vehiculo.ano?.substring(0, 10)}</b>
      </p>
      <p>
        Capacidad de Carga: <b>{vehiculo.capacidad_carga} kg</b>
      </p>
    </article>
  );
}

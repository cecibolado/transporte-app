import { useEffect, useState } from "react";

export default function Viajes({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    vehiculo_id: initialData.vehiculo_id || "",
    conductor_id: initialData.conductor_id || "",
    fecha_salida: initialData.fecha_salida || "",
    fecha_llegada: initialData.fecha_llegada || "",
    origen: initialData.origen || "",
    destino: initialData.destino || "",
    kilometros: initialData.kilometros || ""
  });

  const [vehiculos, setVehiculos] = useState([]);
  const [conductores, setConductores] = useState([]);

  useEffect(() => {
    cargarVehiculos();
    cargarConductores();
  }, []);

  const cargarVehiculos = async () => {
    const res = await fetch("http://localhost:3000/vehiculos");
    const data = await res.json();
    setVehiculos(data.data);
  };

  const cargarConductores = async () => {
    const res = await fetch("http://localhost:3000/conductores");
    const data = await res.json();
    setConductores(data.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="container">
      <h3>Datos del Viaje</h3>

      <label>
        Vehículo
        <select name="vehiculo_id" value={form.vehiculo_id} onChange={handleChange} required>
          <option value="">Seleccionar…</option>
          {vehiculos.map(v => (
            <option key={v.id} value={v.id}>
              {v.marca} {v.modelo} (Patente {v.patente})
            </option>
          ))}
        </select>
      </label>

      <label>
        Conductor
        <select name="conductor_id" value={form.conductor_id} onChange={handleChange} required>
          <option value="">Seleccionar…</option>
          {conductores.map(c => (
            <option key={c.id} value={c.id}>
              {c.nombre} {c.apellido}
            </option>
          ))}
        </select>
      </label>

      <label>
        Fecha de Salida
        <input
          type="date"
          name="fecha_salida"
          value={form.fecha_salida}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Fecha de Llegada
        <input
          type="date"
          name="fecha_llegada"
          value={form.fecha_llegada}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Origen
        <input
          type="text"
          name="origen"
          value={form.origen}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Destino
        <input
          type="text"
          name="destino"
          value={form.destino}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Kilómetros
        <input
          type="number"
          name="kilometros"
          value={form.kilometros}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Guardar</button>
    </form>
  );
}

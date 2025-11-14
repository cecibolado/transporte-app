import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Auth";

export function CrearVehiculo() {
  const navigate = useNavigate();
  const { fetchAuth } = useAuth();

  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    patente: "",
    ano: "",
    capacidad_carga: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = async (e) => {
    e.preventDefault();

    const response = await fetchAuth("http://localhost:3000/vehiculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      return window.alert("Error al crear vehículo");
    }

    navigate("/vehiculos");
  };

  return (
    <article>
      <h2>Nuevo Vehículo</h2>

      <form onSubmit={guardar}>
        <fieldset>
          <label>
            Marca
            <input name="marca" value={form.marca} onChange={handleChange} required />
          </label>

          <label>
            Modelo
            <input name="modelo" value={form.modelo} onChange={handleChange} required />
          </label>

          <label>
            Patente
            <input name="patente" value={form.patente} onChange={handleChange} required />
          </label>

          <label>
            Año
            <input type="date" name="ano" value={form.ano} onChange={handleChange} required />
          </label>

          <label>
            Capacidad de Carga (kg)
            <input type="number" name="capacidad_carga" value={form.capacidad_carga} onChange={handleChange} required />
          </label>
        </fieldset>

        <div className="grid">
          <button type="submit">Guardar</button>
          <button type="button" className="secondary" onClick={() => navigate("/vehiculos")}>Cancelar</button>
        </div>
      </form>
    </article>
  );
}

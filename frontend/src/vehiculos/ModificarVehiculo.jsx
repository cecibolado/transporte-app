import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../Auth";

export function ModificarVehiculo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchAuth } = useAuth();
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/vehiculos/${id}`)
      .then(res => res.json())
      .then(data =>
        setForm({
          ...data.data,
          ano: data.data.ano?.substring(0, 10)
        })
      );
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = async (e) => {
    e.preventDefault();

    const response = await fetchAuth(`http://localhost:3000/vehiculos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      return window.alert("Error al modificar vehículo");
    }

    navigate("/vehiculos");
  };

  if (!form) return <p>Cargando...</p>;

  return (
    <article>
      <h2>Editar Vehículo</h2>

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
            Capacidad de Carga
            <input name="capacidad_carga" type="number" value={form.capacidad_carga} onChange={handleChange} required />
          </label>
        </fieldset>

        <div className="grid">
          <button type="submit">Guardar Cambios</button>
          <button type="button" className="secondary" onClick={() => navigate("/vehiculos")}>Cancelar</button>
        </div>
      </form>
    </article>
  );
}

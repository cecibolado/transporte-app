import { useState } from "react";

export default function CrearConductores() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    licencia: "",
    licencia_vencimiento: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/conductores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje("❌ Error: " + data.errores?.[0]?.msg);
        return;
      }

      setMensaje("✅ Conductor cargado correctamente");
      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
        licencia: "",
        licencia_vencimiento: ""
      });

    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "auto" }}>
      <h2>Registrar Conductor</h2>

      <form onSubmit={handleSubmit}>

        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />

        <label>DNI:</label>
        <input
          type="number"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          required
        />

        <label>Licencia:</label>
        <input
          type="text"
          name="licencia"
          value={formData.licencia}
          onChange={handleChange}
          required
        />

        <label>Vencimiento de licencia:</label>
        <input
          type="date"
          name="licencia_vencimiento"
          value={formData.licencia_vencimiento}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: "12px" }}>
          Guardar Conductor
        </button>
      </form>

      {mensaje && (
        <p style={{ marginTop: "15px", fontWeight: "bold" }}>
          {mensaje}
        </p>
      )}
    </div>
  );
}

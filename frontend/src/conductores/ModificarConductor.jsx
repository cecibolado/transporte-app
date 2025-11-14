import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function ModificarConductor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    licencia: "",
    licencia_vencimiento: ""
  });

  const [mensaje, setMensaje] = useState("");

  // Cargar datos del conductor
  useEffect(() => {
    const cargarConductor = async () => {
      try {
        const res = await fetch(`http://localhost:3000/conductores/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setMensaje("❌ Error al cargar datos");
          return;
        }

        setFormData(data.data); // carga todo tal cual viene del backend

      } catch (error) {
        console.error(error);
        setMensaje("❌ Error al conectar con el servidor");
      }
    };

    cargarConductor();
  }, [id]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/conductores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje("❌ Error: " + data.errores?.[0]?.msg);
        return;
      }

      setMensaje("✅ Conductor actualizado correctamente");

      setTimeout(() => navigate("/conductores"), 1500);

    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "auto" }}>
      <h2>Editar Conductor</h2>

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
          value={formData.licencia_vencimiento?.substring(0, 10)}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: "12px" }}>
          Guardar Cambios
        </button>
      </form>

      {mensaje && (
        <p style={{ marginTop: "15px", fontWeight: "bold" }}>
          {mensaje}
        </p>
      )}

      <button
        style={{ marginTop: "15px" }}
        onClick={() => navigate("/conductores")}
      >
        Volver
      </button>
    </div>
  );
}

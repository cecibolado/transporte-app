import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Viajes from "./Viajes.jsx";

export default function ModificarViaje() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/viajes/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, [id]);

  const guardar = async (form) => {
    await fetch(`http://localhost:3000/viajes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    navigate("/viajes");
  };

  return (
    <div className="container">
      <h2>Editar Viaje</h2>

      {data ? <Viajes initialData={data} onSubmit={guardar} /> : <p>Cargando...</p>}
    </div>
  );
}

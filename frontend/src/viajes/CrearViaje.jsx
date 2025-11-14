import { useNavigate } from "react-router";
import Viajes from "./Viajes.jsx";

export default function CrearViaje() {
  const navigate = useNavigate();

  const crear = async (form) => {
    await fetch("http://localhost:3000/viajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    navigate("/viajes");
  };

  return (
    <div className="container">
      <h2>Nuevo Viaje</h2>
      <Viajes onSubmit={crear} />
    </div>
  );
}

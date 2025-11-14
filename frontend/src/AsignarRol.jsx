import { useState } from "react";
import { AuthRol, useAuth } from "./Auth";

export const AsignarRol = ({ usuarioId, onRolAsignado }) => {
  const { fetchAuth } = useAuth();

  const [open, setOpen] = useState(false);
  const [rolId, setRolId] = useState("");
  const [roles, setRoles] = useState([]);

  const abrirDialog = async () => {
    setOpen(true);
    // Cargar roles disponibles
    const response = await fetchAuth("http://localhost:3000/roles");
    const data = await response.json();

    if (response.ok && data.roles) {
      setRoles(data.roles);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rolId) {
      return window.alert("Selecciona un rol");
    }

    const response = await fetchAuth(
      `http://localhost:3000/usuarios/${usuarioId}/roles`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rolId: parseInt(rolId) }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      return window.alert("Error al asignar rol");
    }

    setRolId("");
    onRolAsignado();
    setOpen(false);
  };

  return (
    <AuthRol rol="admin">
      <button onClick={abrirDialog}>Asignar rol</button>
      <dialog open={open}>
        <article>
          <h2>Asignar rol</h2>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="rol">Rol:</label>
              <select
                id="rol"
                value={rolId}
                onChange={(e) => setRolId(e.target.value)}
                required
              >
                <option value="">Selecciona un rol</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
              </select>
            </fieldset>
            <footer>
              <div className="grid">
                <input
                  type="button"
                  className="secondary"
                  value="Cancelar"
                  onClick={() => {
                    setRolId("");
                    setOpen(false);
                  }}
                />
                <input type="submit" value="Asignar" />
              </div>
            </footer>
          </form>
        </article>
      </dialog>
    </AuthRol>
  );
};

import express from "express";
import cors from "cors";
import { conectarDB } from "./db.js";
import usuariosRouter from "./usuarios.js";
import rolesRouter from "./roles.js";
import usuariosRolesRouter from "./usuarios-roles.js";
import authRouter, { authConfig } from "./auth.js";
import passport from "passport";
import vehiculosRouter from "./vehiculo.js";
import viajesRouter from "./viajes.js";
import conductoresRouter from "./conductores.js";

conectarDB();

const app = express();
const port = 3000;

// Para interpretar body como JSON
app.use(express.json());

// Habilito CORS
app.use(cors());

authConfig();
// Inicializo passport para que los middlewares funcionen
app.use(passport.initialize());
app.get("/", (req, res) => {
  // Responder con string
  res.send("Hola mundo!");
});

app.use("/usuarios", usuariosRouter);
app.use("/roles", rolesRouter);
app.use("/usuarios-roles", usuariosRolesRouter);
app.use("/auth", authRouter);
app.use("/vehiculos", vehiculosRouter);
app.use("/viajes", viajesRouter);
app.use("/conductores", conductoresRouter);

// Middleware para capturar errores no manejados
app.use((err, req, res, next) => {
  console.error("Error no manejado:", err);
  res.status(500).json({ success: false, error: err.message || "Error interno del servidor" });
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Ruta no encontrada" });
});

app.listen(port, () => {
  console.log(`La aplicación esta funcionando en el puerto ${port}`);
});

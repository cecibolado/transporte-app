import express from "express";
import { db } from "./db.js";

const router = express.Router();

// GET para entregar listado de vehiculos
router.get("/", async (req, res) => {
  const filtros = [];
  const parametros = [];

  const { marca, modelo, capacidad_carga } = req.query;

  if (marca) {
    filtros.push("marca LIKE ?");
    parametros.push(`%${marca}%`);
  }

  if (capacidad_carga !== undefined) {
    filtros.push("cantidad >= ?");
    parametros.push(Number(capacidad_carga));
  }
    if (modelo) {
    filtros.push("vehiculos_id = ?");
    parametros.push(Number(modelo));
  }

  let sql =
    "SELECT v.id, v.marca, v.capacidad_carga, AS vehiculos " +
    "FROM vehiculos v ";

  if (filtros.length > 0) {
    sql += " WHERE " + filtros.join(" AND ");
  }

  console.log(sql);
  const [rows] = await db.execute(sql, parametros);
  res.json({ success: true, data: rows });
});

// GET para entregar detalle de producto
router.get("/:id", async (req, res) => {
  // Obtengo id
  const id = Number(req.params.id);


  // Emplear parametros
  const [rows] = await db.execute("SELECT * FROM vehiculos WHERE id=?", [id]);

  if (rows.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "Vehículo no encontrado" });
  }

  res.json({ success: true, data: rows[0] });
});

// POST para crear producto
router.post("/", async (req, res) => {
  // Obtengo body
  const { marca, modelo, cantidad } = req.body;
  const [result] = await db.execute(
    "INSERT INTO vehiculo (marca, modelo, capacidad_carga) VALUES (?,?,?)",
    [marca, modelo, cantidad]
  );
  res.status(201).json({
    success: true,
    data: { id: result.insertId, marca, modelo, cantidad },
  });
});

// PUT para modificar producto a partir de un id
router.put("/:id", async (req, res) => {
  // Obtengo id
  const id = Number(req.params.id);

  // Obtengo body
  const { marca, modelo, cantidad } = req.body;

  await db.execute(
    "UPDATE productos SET marca=?, categoria_id=?, cantidad=? WHERE id=?",
    [marca, modelo, cantidad, id]
  );

  res.json({
    success: true,
    data: { id, marca, modelo, cantidad },
  });
});

// DELETE para quitar un producto a partir de un id
router.delete("/:id", async (req, res) => {
  // Obtengo id
  const id = Number(req.params.id);

  await db.execute("DELETE FROM productos WHERE id=?", [id]);
  res.json({ success: true, data: id });
});

export default router;

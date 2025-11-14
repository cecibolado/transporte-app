import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@picocss/pico";
import "./index.css";
import { Layout } from "./Layout.jsx";
import { Home } from "./Home.jsx";
import { AuthPage, AuthProvider, AuthRol } from "./Auth.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Usuarios } from "./usuarios/Usuarios.jsx";
import { Roles } from "./roles/Roles.jsx";
import { DetallesUsuario } from "./usuarios/DetallesUsuario.jsx";
import { CrearUsuario } from "./usuarios/CrearUsuario.jsx";
import { ModificarUsuario } from "./usuarios/ModificarUsuario.jsx";
import { Vehiculos } from "./vehiculos/Vehiculos.jsx";
import { DetallesVehiculo } from "./vehiculos/DetallesVehiculo.jsx";
import { CrearVehiculo } from "./vehiculos/CrearVehiculo.jsx";
import { ModificarVehiculo } from "./vehiculos/ModificarVehiculo.jsx";
import ModificarViaje from "./viajes/ModificarViaje.jsx";
import CrearViaje from "./viajes/CrearViaje.jsx";
import DetalleViajes from "./viajes/DetalleViajes.jsx";
import Conductores from "./conductores/Conductores.jsx";
import CrearConductores from "./conductores/CrearConductores.jsx";
import DetalleConductores from "./conductores/DetalleConductores.jsx";
import ModificarConductor from "./conductores/ModificarConductor.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="usuarios"
              element={
                <AuthPage>
                  <Usuarios />
                </AuthPage>
              }
            />
            <Route
              path="usuarios/:id"
              element={
                <AuthPage>
                  <DetallesUsuario />
                </AuthPage>
              }
            />
            <Route
              path="usuarios/:id/modificar"
              element={
                <AuthPage>
                  <AuthRol rol="admin">
                    <ModificarUsuario />
                  </AuthRol>
                </AuthPage>
              }
            />
            <Route
              path="usuarios/crear"
              element={
                <AuthPage>
                  <AuthRol rol="admin">
                    <CrearUsuario />
                  </AuthRol>
                </AuthPage>
              }
            />
            <Route
              path="roles"
              element={
                <AuthPage>
                  <Roles />
                </AuthPage>
              }
            />
            <Route
              path="vehiculos"
              element={
                <AuthPage>
                  <Vehiculos />
                </AuthPage>
              }
            />
            <Route
              path="vehiculos/:id"
              element={
                <AuthPage>
                  <DetallesVehiculo />
                </AuthPage>
              }
            />
            <Route
              path="vehiculos/:id/modificar"
              element={
                <AuthPage>
                  <AuthRol rol="admin">
                    <ModificarVehiculo />
                  </AuthRol>
                </AuthPage>
              }
            />
            <Route
              path="vehiculos/crear"
              element={
                <AuthPage>
                  <AuthRol rol="admin">
                    <CrearVehiculo />
                  </AuthRol>
                </AuthPage>
              }
            />
            <Route
              path="viajes"
              element={
                <AuthPage>
                  <DetalleViajes />
                </AuthPage>
              }
            />
            <Route
              path="viajes/nuevo"
              element={
                <AuthPage>
                  <AuthRol rol="admin">
                    <CrearViaje />
                  </AuthRol>
                </AuthPage>
              }
            />
            <Route
              path="viajes/:id/editar"
              element={
                <AuthPage>
                  <AuthRol rol="admin">
                    <ModificarViaje />
                  </AuthRol>
                </AuthPage>
              }
            />
            <Route
              path="conductores"
              element={
                <AuthPage>
                  <Conductores />
                </AuthPage>
              }
            />
            <Route
              path="conductores/:id"
              element={
                <AuthPage>
                  <DetalleConductores />
                </AuthPage>
              }
            />
            <Route
              path="conductores/:id/modificar"
              element={
                <AuthPage>
                  <AuthRol rol="admin">
                    <ModificarConductor />
                  </AuthRol>
                </AuthPage>
              }
            />
            <Route
              path="conductores/crear"
              element={
                <AuthPage>
                  <AuthRol rol="admin">
                    <CrearConductores />
                  </AuthRol>
                </AuthPage>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);


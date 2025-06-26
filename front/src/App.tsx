import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContenidoA from "./screens/ContenidoA.tsx";
import Login from "./screens/Login.tsx";
import Menu from "./screens/Menu.tsx";
import AlumnosAgregar from "./screens/AlumnosAgregar.tsx";
import AlumnosConsultar from "./screens/AlumnosConultar.tsx";
import AlumnosModificar from "./screens/AlumnoModificar.tsx";
import AlumnoEliminar from "./screens/AlumnoEliminar.tsx";
import EnviarMensaje from "./screens/EnviarMensaje.tsx";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/alumnos" element={<Menu />}>
                        <Route index element={<ContenidoA />} />
                        <Route path="agregar" element={<AlumnosAgregar />} />
                        <Route path="consultar" element={<AlumnosConsultar />} />
                        <Route path="modificar" element={<AlumnosModificar />} />
                        <Route path="eliminar" element={<AlumnoEliminar />} />
                        <Route path="enviar-mensaje" element={<EnviarMensaje matriculaUsuario="1234567891" />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
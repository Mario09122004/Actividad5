import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContenidoA from "./screens/ContenidoA.tsx";
import Login from "./screens/Login.tsx";
import Menu from "./screens/Menu.tsx";
import AlumonosAgregar from "./screens/AlumnosAgregar.tsx";
import './App.css';
import AlumnosConsultar from "./screens/AlumnosConultar.tsx";
import AlumnosModificar from "./screens/AlumnoModificar.tsx";
import AlumnoEliminar from "./screens/AlumnoEliminar.tsx";

function App(){
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/alumnos" element={<Menu />}>
                        <Route index element={<ContenidoA />} />
                        <Route path="agregar" element={<AlumonosAgregar />} />
                        <Route path="consultar" element={<AlumnosConsultar />} />
                        <Route path="modificar" element={<AlumnosModificar />} />
                        <Route path="eliminar" element={<AlumnoEliminar />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
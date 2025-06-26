import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContenidoA from "./screens/ContenidoA.tsx";
import Login from "./screens/Login.tsx";
import Menu from "./screens/Menu.tsx";
import AlumnosAgregar from "./screens/AlumnosAgregar.tsx";
import AlumnosConsultar from "./screens/AlumnosConultar.tsx";
import AlumnosModificar from "./screens/AlumnoModificar.tsx";
import AlumnoEliminar from "./screens/AlumnoEliminar.tsx";
import './App.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Menu />}>
                        <Route index element={<ContenidoA />} />
                        <Route path="alumnos/agregar" element={<AlumnosAgregar />} />
                        <Route path="alumnos/consultar" element={<AlumnosConsultar />} />
                        <Route path="alumnos/modificar" element={<AlumnosModificar />} />
                        <Route path="alumnos/eliminar" element={<AlumnoEliminar />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
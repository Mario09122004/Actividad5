import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Login from './modules/auth/Login';
import Dashboard from './modules/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Register from './modules/auth/Register';
import AlumnosList from './components/AlumnosList';
import Mensajes from './modules/mensajes/Mensajes';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import AlumnosAgregar from './modules/alumnos/registrarAlumno';
import AlumnoEliminar from './modules/alumnos/eliminarAlumno'
import AlumnoModificar from './modules/alumnos/modificarAlumon'
import AlumnosConsultar from './modules/alumnos/mostrarAlumnos'

function App() {
  return (
    <GoogleOAuthProvider clientId="45364968687-f7t0sulvh4cnjoppqh2b0fppqu0bm7i3.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas agrupadas con Layout */}
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/alumnos" element={<AlumnosList />} />
            <Route path="/mensajes" element={<Mensajes />} />
            <Route path="/registrarAlumno" element= {<AlumnosAgregar/>} />
            <Route path="/eliminarAlumno" element={<AlumnoEliminar />} />
            <Route path="/modificarAlumno" element={<AlumnoModificar />} />
            <Route path="/mostrarAlumno" element={<AlumnosConsultar />} />
          </Route>

          {/* Ruta para manejar 404 - debe ir dentro de Routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

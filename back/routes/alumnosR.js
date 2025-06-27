import express from "express";
import {
  obtenerAlumnoPorMatricula,
  obtenerTodosLosAlumnos,
  agregarAlumno,
  actualizarAlumno,
  eliminarAlumno,
  buscarAlumnoPorNombre
} from "./../controllers/alumnosR.js";

const alumnosR  = express.Router();

alumnosR.get("/alumnos/:matricula", obtenerAlumnoPorMatricula);
alumnosR.get("/alumnos", obtenerTodosLosAlumnos);
alumnosR.post("/alumnos/agregar", agregarAlumno);
alumnosR.put("/alumnos/actualizar/:matricula", actualizarAlumno);
alumnosR.delete("/alumnos/eliminar/:matricula", eliminarAlumno);
alumnosR.get("/alumno/traer/:nombre", buscarAlumnoPorNombre);

export default alumnosR;

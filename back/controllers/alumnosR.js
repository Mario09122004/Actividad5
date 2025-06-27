import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "./../config/mysqlConfig.js";

const JWT_SECRET = process.env.JWT_SECRET || 'aqzwsxecd8645rftvgybuhij7946asdfghjklqwertyuiop1234567890';

export const obtenerAlumnoPorMatricula = (req, res) => {
  const { matricula } = req.params;
  const sql = 'SELECT * FROM alumnos WHERE matricula = ?';
  pool.query(sql, [matricula], (error, results) => {
    if (error) return res.status(500).json({ status: 100, ...error });
    if (!results.length) return res.status(404).json({ status: 404, message: 'Alumno no encontrado' });
    res.json({ status: 200, message: 'Alumno encontrado', results: [results[0]] });
  });
};

export const obtenerTodosLosAlumnos = (req, res) => {
  const sql = 'SELECT * FROM alumnos';
  pool.query(sql, (error, results) => {
    if (error) return res.status(500).json({ status: 100, ...error });
    res.json({ status: 200, message: 'Alumnos encontrados', results });
  });
};

export const agregarAlumno = async (req, res) => {
  try {
    const datos = req.body;
    const hashedPassword = await bcrypt.hash(datos.Contraseña, 10);
    const sql = `INSERT INTO alumnos (
      matricula, aPaterno, aMaterno, nombre, sexo,
      aTelefono, aCorreo, aFacebook, aInstagram, tiposangre,
      contrasenha, dCalle, dNumero, dColonia, dCodigoPostal,
      nombreContacto, telefonoContacto
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [datos.matricula, datos.APaterno, datos.MPaterno, datos.nombre, datos.sexo, datos.Telefono, datos.CorreoElectrnico, datos.PerfilFacebook, datos.Instagram, datos.TipoSangre, hashedPassword, datos.dCalle, datos.Numero, datos.Colonia, datos.CodigoPostal, datos.dNombreContacto, datos.TelefonoContacto];
    pool.query(sql, values, (error, results) => {
      if (error) return res.status(500).json({ status: 100, ...error });
      res.json({ status: 200, message: 'Alumno agregado', results });
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Error interno', error: err.message });
  }
};

export const actualizarAlumno = async (req, res) => {
  const { matricula } = req.params;
  const datos = req.body;

  try {
    const hashedPassword = await bcrypt.hash(datos.Contraseña, 10);

    const sql = `UPDATE alumnos SET 
        aPaterno = ?, 
        aMaterno = ?, 
        nombre = ?, 
        sexo = ?, 
        aTelefono = ?, 
        aCorreo = ?, 
        aFacebook = ?, 
        aInstagram = ?, 
        tiposangre = ?, 
        contrasenha = ?, 
        dCalle = ?, 
        dNumero = ?, 
        dColonia = ?, 
        dCodigoPostal = ?, 
        nombreContacto = ?, 
        telefonoContacto = ?
      WHERE matricula = ?`;

    const values = [
      datos.APaterno,
      datos.MPaterno,
      datos.nombre,
      datos.sexo,
      datos.Telefono,
      datos.CorreoElectrnico,
      datos.PerfilFacebook,
      datos.Instagram,
      datos.TipoSangre,
      hashedPassword,
      datos.dCalle,
      datos.Numero,
      datos.Colonia,
      datos.CodigoPostal,
      datos.dNombreContacto,
      datos.TelefonoContacto,
      matricula
    ];

    pool.query(sql, values, (error, results) => {
      if (error) return res.status(500).json({ status: 100, ...error });
      res.json({ status: 200, message: 'Alumno actualizado', results });
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Error interno', error: err.message });
  }
};

export const eliminarAlumno = (req, res) => {
  const { matricula } = req.params;
  const sql = 'DELETE FROM alumnos WHERE matricula = ?';
  pool.query(sql, [matricula], (error, results) => {
    if (error) return res.status(500).json({ status: 100, ...error });
    if (!results.affectedRows) return res.status(404).json({ status: 404, message: 'Alumno no encontrado' });
    res.json({ status: 200, message: 'Alumno eliminado', results });
  });
};

export const buscarAlumnoPorNombre = (req, res) => {
  const nombre = req.params.nombre.trim();
  const sql = 'SELECT * FROM alumnos WHERE nombre LIKE ?';
  pool.query(sql, [`%${nombre}%`], (error, results) => {
    if (error) return res.status(500).json({ status: 100, ...error });
    if (!results.length) return res.status(404).json({ status: 404, message: 'Alumno no encontrado' });
    res.json({ status: 200, message: 'Alumno encontrado', results });
  });
};

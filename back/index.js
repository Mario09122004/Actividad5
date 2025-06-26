import mysql from "mysql2";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  host: '189.197.187.187',
  user: 'umoodle',
  password: 'Umoodl@2024$',
  database: 'alumnos',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Consultar un solo alumo
app.get('/alumnos/:matricula', (req, res) => {
  const { matricula } = req.params;
  console.log(`Consulting alumno with matricula: ${matricula}`);
  const sql = 'SELECT * FROM alumnos WHERE matricula = ?';

  pool.query(sql, [matricula], (error, results) => {
    if (error) {
      res.send({
        status: 100,
        errNo: error.errno,
        errMsg: error.sqlMessage,
        codigo: error
      });
    } else if (results.length === 0) {
      res.send({
        status: 404,
        message: 'Alumno not found'
      });
    } else {
      res.send({
        status: 200,
        message: 'Alumno retrieved successfully',
        results: [results[0]]
      });
    }
  });
});

app.get('/alumnos', (req, res) => {
  const sql = 'SELECT * FROM alumnos';

  pool.query(sql, (error, results) => {
    if (error) {
      res.send({
        status: 100,
        errNo: error.errno,
        errMsg: error.sqlMessage,
        codigo: error
      });
    } else {
      res.send({
        status: 200,
        message: 'Alumnos retrieved successfully',
        results
      });
    }
  });
});

app.post('/alumnos/agregar', (req, res) => {
  const {
    matricula,
    nombre,
    APaterno,
    MPaterno,
    sexo,
    Telefono,
    CorreoElectrnico,
    PerfilFacebook,
    Instagram,
    TipoSangre,
    Contraseña,
    dCalle,
    Numero,
    Colonia,
    CodigoPostal,
    dNombreContacto,
    TelefonoContacto
  } = req.body;

  const sql = `
    INSERT INTO alumnos (
      matricula, aPaterno, aMaterno, nombre, sexo,
      aTelefono, aCorreo, aFacebook, aInstagram, tiposangre,
      contrasenha, dCalle, dNumero, dColonia, dCodigoPostal,
      nombreContacto, telefonoContacto
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(sql, [
    matricula,
    APaterno,
    MPaterno,
    nombre,
    sexo,
    Telefono,
    CorreoElectrnico,
    PerfilFacebook,
    Instagram,
    TipoSangre,
    Contraseña,
    dCalle,
    Numero,
    Colonia,
    CodigoPostal,
    dNombreContacto,
    TelefonoContacto
  ], (error, results) => {
    if (error) {
      console.error(error);
      res.send({
        status: 100,
        errNo: error.errno,
        errMsg: error.sqlMessage,
        codigo: error
      });
    } else {
      res.send({
        status: 200,
        message: 'Alumno agregado correctamente',
        results
      });
    }
  });
});

app.put('/alumnos/actualizar/:matricula', (req, res) => {
  const { matricula } = req.params;
  const {
    nombre,
    APaterno,
    MPaterno,
    sexo,
    Telefono,
    CorreoElectrnico,
    PerfilFacebook,
    Instagram,
    TipoSangre,
    Contraseña,
    dCalle,
    Numero,
    Colonia,
    CodigoPostal,
    dNombreContacto,
    TelefonoContacto
  } = req.body;

  const sql = `
    UPDATE alumnos SET 
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
    WHERE matricula = ?
  `;

  pool.query(sql, [
    APaterno,
    MPaterno,
    nombre,
    sexo,
    Telefono,
    CorreoElectrnico,
    PerfilFacebook,
    Instagram,
    TipoSangre,
    Contraseña,
    dCalle,
    Numero,
    Colonia,
    CodigoPostal,
    dNombreContacto,
    TelefonoContacto,
    matricula
  ], (error, results) => {
    if (error) {
      console.error(error);
      res.send({
        status: 100,
        errNo: error.errno,
        errMsg: error.sqlMessage,
        codigo: error
      });
    } else {
      res.send({
        status: 200,
        message: 'Alumno actualizado correctamente',
        results
      });
    }
  });
});

app.delete('/alumnos/eliminar/:matricula', (req, res) => {
  const { matricula } = req.params;
  const sql = 'DELETE FROM alumnos WHERE matricula = ?';

  pool.query(sql, [matricula], (error, results) => {
    if (error) {
      res.send({
        status: 100,
        errNo: error.errno,
        errMsg: error.sqlMessage,
        codigo: error
      });
    } else if (results.affectedRows === 0) {
      res.send({
        status: 404,
        message: 'Alumno not found'
      });
    } else {
      res.send({
        status: 200,
        message: 'Alumno deleted successfully',
        results
      });
    }
  });
}
);

app.get('/alumno/traer/:nombre', (req, res) => {
  let nombre = req.params.nombre.trim();
  const sql = 'SELECT * FROM alumnos WHERE nombre LIKE ?';

  pool.query(sql, [`%${nombre}%`], (error, results, fields) => {
    if (error) {
      res.send({
        status: 100,
        errNo: error.errno,
        errMsg: error.sqlMessage,
        codigo: error
      });
    } else if (results.length === 0) {
      res.send({
        status: 404,
        message: 'Alumno not found'
      });
    } else {
      res.send({
        status: 200,
        message: 'Alumno retrieved successfully',
        results
      });
    }
  });
});

app.post('/api/auth/login-user', async (req, res) => {
  const { correo, password, captcha } = req.body;

  console.log(`Checando captcha: ${captcha}`);

  if (!captcha) {
    return res.status(400).json({ success: false, message: 'Captcha no enviado' });
  }

  const secretKey = '6LcdkW0rAAAAAK8ikxGKphBteU9IVDP2MIep2hC8';
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

  try {
    const captchaRes = await fetch(verifyURL, { method: 'POST' });
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      console.error('Captcha verification failed:', captchaData['error-codes']);
      return res.status(403).json({ success: false, message: 'Verificación del CAPTCHA fallida' });
    }

    // Simulación de validación de usuario
    console.log('Valido el capcha correctamente');
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error en la verificación del captcha' });
  }
});

app.all('/*splat', (req, res) => {
    res.send('Route not found');
});
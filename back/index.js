import mysql from "mysql2";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";
import bcrypt from "bcryptjs";
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const JWT_SECRET = 'aqzwsxecd8645rftvgybuhij7946asdfghjklqwertyuiop1234567890';


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

const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
  console.error("❌ URI de MongoDB no definida. Verifica tu archivo .env");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(() => {
    console.log("✅ MongoDB conectado");
  }).catch(err => {
    console.error("❌ Error conectando a MongoDB:", err);
  });
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("MongoDB conectado");
  }).catch(err => {
    console.error("Error conectando a MongoDB:", err);
});

const mensajeSchema = new mongoose.Schema({
  emisor: { type: String, required: true },    // matrícula del emisor
  receptor: { type: String, required: true },  // matrícula del receptor
  mensaje: { type: String, required: true },   // contenido del mensaje
  fecha: { type: Date, default: Date.now }     // fecha automática
});


const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
  console.error("❌ URI de MongoDB no definida. Verifica tu archivo .env");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(() => {
    console.log("✅ MongoDB conectado");
  }).catch(err => {
    console.error("❌ Error conectando a MongoDB:", err);
  });
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("MongoDB conectado");
  }).catch(err => {
    console.error("Error conectando a MongoDB:", err);
});

const mensajeSchema = new mongoose.Schema({
  emisor: { type: String, required: true },    // matrícula del emisor
  receptor: { type: String, required: true },  // matrícula del receptor
  mensaje: { type: String, required: true },   // contenido del mensaje
  fecha: { type: Date, default: Date.now }     // fecha automática
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

app.post('/alumnos/agregar',async (req, res) => {
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

  // Hash the password before storing it
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(Contraseña, salt);

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
    hashedPassword,
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

    const sql = 'SELECT * FROM alumnos WHERE aCorreo = ?';

    pool.query(sql, [correo], async (error, results) => {
      if (error) {
        console.error('Error en la consulta de login:', error);
        return res.status(500).json({
          success: false,
          message: 'Error al consultar usuario',
          error
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Correo o contraseña incorrectos'
        });
      }

      const usuario = results[0];
      const match = await bcrypt.compare(password, usuario.contrasenha);

      if (!match) {
        return res.status(401).json({
          success: false,
          message: 'Correo o contraseña incorrectos'
        });
      }

      // ✅ Generar JWT con la matrícula
      const token = jwt.sign(
        { matricula: usuario.matricula }, // Payload
        JWT_SECRET, // Clave secreta
        { expiresIn: '2h' } // Duración del token
      );

      return res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        token, // 🔑 Aquí va el JWT
        usuario: {
          matricula: usuario.matricula,
          nombre: usuario.nombre,
          correo: usuario.aCorreo
        }
      });
    });

  } catch (err) {
    console.error('Error en la verificación del captcha:', err);
    return res.status(500).json({
      success: false,
      message: 'Error en la verificación del captcha',
      error: err.message
    });
  }
});

const GOOGLE_CLIENT_ID = "656169630035-1s360encavdbr859j38ndt73s8trm6j0.apps.googleusercontent.com"; // Reemplaza con tu client ID

app.post('/api/auth/google-login', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, message: 'Token no proporcionado' });
  }

  try {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    if (!email.endsWith('@utd.edu.mx')) {
      return res.status(403).json({ success: false, message: 'Solo se permite acceso con correo institucional' });
    }

    const match = email.match(/_(\w+)@utd\.edu\.mx$/);
    const matricula = match ? match[1] : null;
    if (!matricula) {
      return res.status(400).json({ success: false, message: 'No se pudo extraer la matrícula del correo' });
    }

    // Aquí busca la matrícula en tu base de datos y responde según corresponda
    return res.status(200).json({ success: true, message: 'Inicio de sesión con Google exitoso', matricula });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error al verificar el token de Google', error: err.message });
  }
});

  app.post('/mensajes/enviar', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    // decoded should have a 'matricula' property if the token was signed as such

    const emisor = decoded.matricula;
    const { receptor, mensaje } = req.body;

    if (!receptor || !mensaje) {
      return res.status(400).json({ success: false, message: "Receptor y mensaje requeridos" });
    }

    const nuevoMensaje = new Mensaje({
      emisor,
      receptor,
      mensaje
    });

    await nuevoMensaje.save();

    return res.status(200).json({
      success: true,
      message: "Mensaje guardado correctamente",
      data: nuevoMensaje
    });

  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al enviar mensaje",
      error: error.message
    });
  }
});

const GOOGLE_CLIENT_ID = "656169630035-1s360encavdbr859j38ndt73s8trm6j0.apps.googleusercontent.com"; // Reemplaza con tu client ID

app.post('/api/auth/google-login', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, message: 'Token no proporcionado' });
  }

  try {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    if (!email.endsWith('@utd.edu.mx')) {
      return res.status(403).json({ success: false, message: 'Solo se permite acceso con correo institucional' });
    }

    const match = email.match(/_(\w+)@utd\.edu\.mx$/);
    const matricula = match ? match[1] : null;
    if (!matricula) {
      return res.status(400).json({ success: false, message: 'No se pudo extraer la matrícula del correo' });
    }

    // Aquí busca la matrícula en tu base de datos y responde según corresponda
    return res.status(200).json({ success: true, message: 'Inicio de sesión con Google exitoso', matricula });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error al verificar el token de Google', error: err.message });
  }
});

  app.post('/mensajes/enviar', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    // decoded should have a 'matricula' property if the token was signed as such

    const emisor = decoded.matricula;
    const { receptor, mensaje } = req.body;

    if (!receptor || !mensaje) {
      return res.status(400).json({ success: false, message: "Receptor y mensaje requeridos" });
    }

    const nuevoMensaje = new Mensaje({
      emisor,
      receptor,
      mensaje
    });

    await nuevoMensaje.save();

    return res.status(200).json({
      success: true,
      message: "Mensaje guardado correctamente",
      data: nuevoMensaje
    });

  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al enviar mensaje",
      error: error.message
    });
  }
});

app.all('/*splat', (req, res) => {
    res.send('Route not found');
});

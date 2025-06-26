import { useState } from "react";
import { Col, Container, Row, FloatingLabel, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import React from "react";
import Swal from 'sweetalert2';
import axios from "axios";

// Tipos de datos
type mensajeData = {
    emisor: string;     // quien envía
    receptor: string;   // quien recibe
    mensaje: string;
};

type Props = {
    matriculaUsuario: string; // matrícula del usuario actual (emisor)
};

const initialState: mensajeData = {
    emisor: "",
    receptor: "",
    mensaje: ""
};

function EnviarMensaje({ matriculaUsuario }: Props) {
    const [mensaje, setMensaje] = useState<mensajeData>({ ...initialState, emisor: matriculaUsuario });
    const [buscarMatricula, setBuscarMatricula] = useState("");
    const [nombreReceptor, setNombreReceptor] = useState<string | null>(null);

    const handleBuscarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuscarMatricula(e.target.value);
    };

    const buscarAlumno = async () => {
        if (buscarMatricula.trim() === "") {
            Swal.fire("Campo vacío", "Por favor ingresa una matrícula", "warning");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/alumnos/${buscarMatricula}`);
            if (response.data && response.data.results && response.data.results.length > 0) {
                const datos = response.data.results[0];
                setMensaje({
                    ...mensaje,
                    receptor: datos.matricula,
                    mensaje: "", // opcional, limpia el mensaje al cambiar de receptor
                });
                setNombreReceptor(datos.nombre);
            } else {
                setMensaje({ ...mensaje, receptor: "", mensaje: "" });
                setNombreReceptor(null);
                Swal.fire("No encontrado", "No se encontró ningún alumno con esa matrícula", "error");
            }
        } catch (error) {
            setMensaje({ ...mensaje, receptor: "", mensaje: "" });
            setNombreReceptor(null);
            Swal.fire("Error", "No se pudo buscar el alumno", "error");
            console.error(error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setMensaje({ ...mensaje, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!mensaje.receptor) {
            Swal.fire("Falta receptor", "Busca primero a quién enviarás el mensaje", "warning");
            return;
        }

        if (!mensaje.mensaje.trim()) {
            Swal.fire("Campo vacío", "Por favor escribe un mensaje", "warning");
            return;
        }

        try {
            await axios.post(`http://localhost:5000/mensajes/enviar`, mensaje);
            Swal.fire("Enviado", "Mensaje enviado correctamente", "success");
            setMensaje({ ...initialState, emisor: matriculaUsuario });
            setBuscarMatricula("");
            setNombreReceptor(null);
        } catch (error) {
            Swal.fire("Error", "No se pudo enviar el mensaje", "error");
            console.error(error);
        }
    };

    return (
        <Container fluid>
            <h1>Enviar Mensaje</h1>

            {/* Buscar receptor */}
            <Row className="mb-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <InputGroup>
                        <FormControl
                            placeholder="Matrícula del receptor"
                            value={buscarMatricula}
                            onChange={handleBuscarChange}
                        />
                        <Button variant="primary" onClick={buscarAlumno}>
                            Buscar
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            {/* Nombre del receptor */}
            {nombreReceptor !== null && (
                <Row className="mb-3">
                    <Col md={{ span: 6, offset: 3 }} className="text-center">
                        <h5>
                            Alumno: <strong>{nombreReceptor}</strong>
                        </h5>
                    </Col>
                </Row>
            )}

            {/* Formulario de mensaje */}
            {mensaje.receptor && (
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={{ span: 6, offset: 3 }}>
                            <FloatingLabel label="Mensaje">
                                <Form.Control
                                    as="textarea"
                                    name="mensaje"
                                    style={{ height: '150px' }}
                                    value={mensaje.mensaje}
                                    onChange={handleInputChange}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Row className="text-center">
                        <Col>
                            <Button type="submit" variant="success">Enviar Mensaje</Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Container>
    );
}

export default EnviarMensaje;

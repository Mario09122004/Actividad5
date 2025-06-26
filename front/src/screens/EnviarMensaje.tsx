import { useState } from "react";
import { Col, Container, Row, FloatingLabel, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import React from "react";
import Swal from 'sweetalert2';
import axios from "axios";

type alumnoMensaje = {
    matricula: string;
    nombre?: string;
    mensaje: string;
}

const initialState: alumnoMensaje = {
    matricula: "",
    nombre: "",
    mensaje: ""
}

function EnviarMensaje() {
    const [alumno, setAlumno] = useState<alumnoMensaje>(initialState);
    const [buscarMatricula, setBuscarMatricula] = useState("");
    const [nombreEncontrado, setNombreEncontrado] = useState<string | null>(null);

    const handleBuscarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuscarMatricula(e.target.value);
    }

    const buscarAlumno = async () => {
        if (buscarMatricula.trim() === "") {
            Swal.fire("Campo vacío", "Por favor ingresa una matrícula", "warning");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/alumnos/${buscarMatricula}`);
            if (response.data && response.data.results && response.data.results.length > 0) {
                const datos = response.data.results[0];
                setAlumno({
                    matricula: datos.matricula,
                    nombre: datos.nombre,
                    mensaje: ""
                });
                setNombreEncontrado(datos.nombre);
            } else {
                setAlumno(initialState);
                setNombreEncontrado(null);
                Swal.fire("No encontrado", "No se encontró ningún alumno con esa matrícula", "error");
            }
        } catch (error) {
            setAlumno(initialState);
            setNombreEncontrado(null);
            Swal.fire("Error", "No se pudo encontrar el alumno", "error");
            console.error(error);
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setAlumno({ ...alumno, [name]: value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!alumno.mensaje.trim()) {
            Swal.fire("Campo vacío", "Por favor escribe un mensaje", "warning");
            return;
        }

        try {
            // Puedes ajustar la ruta y datos del body según tu backend
            await axios.post(`http://localhost:5000/alumnos/mensaje/${alumno.matricula}`, {
                mensaje: alumno.mensaje
            });
            Swal.fire("Enviado", "Mensaje enviado correctamente", "success");
            setAlumno(initialState);
            setBuscarMatricula("");
            setNombreEncontrado(null);
        } catch (error) {
            Swal.fire("Error", "No se pudo enviar el mensaje", "error");
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <h1>Enviar Mensaje a Alumno</h1>

            {/* Buscador de matrícula */}
            <Row className="mb-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <InputGroup>
                        <FormControl
                            placeholder="Buscar matrícula"
                            value={buscarMatricula}
                            onChange={handleBuscarChange}
                        />
                        <Button variant="primary" onClick={buscarAlumno}>
                            Buscar
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            {/* Resultado de la búsqueda */}
            {nombreEncontrado !== null && (
                <Row className="mb-3">
                    <Col md={{ span: 6, offset: 3 }} className="text-center">
                        <h5>
                            {nombreEncontrado ? (
                                <>Alumno: <strong>{nombreEncontrado}</strong></>
                            ) : (
                                <span className="text-danger">Alumno no encontrado</span>
                            )}
                        </h5>
                    </Col>
                </Row>
            )}

            {/* Formulario para mensaje */}
            {alumno.matricula && (
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={{ span: 6, offset: 3 }}>
                            <FloatingLabel label="Mensaje">
                                <Form.Control
                                    as="textarea"
                                    name="mensaje"
                                    style={{ height: '150px' }}
                                    value={alumno.mensaje}
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
// 
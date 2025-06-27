import { useState } from "react";
import { Button, Container, FloatingLabel, Form, Card, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

function AlumnoEliminar() {
    const [matricula, setMatricula] = useState("");
    const [alumno, setAlumno] = useState(null);

    const handleInputChange = (event) => {
        setMatricula(event.target.value);
    };

    const buscarAlumno = async (event) => {
        event.preventDefault();

        if (matricula.trim() === "") {
            Swal.fire("Error", "Ingrese una matrícula válida", "error");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/alumnos/${matricula}`);
            if (response.data && response.data.results && response.data.results.length > 0) {
                setAlumno(response.data.results[0]);
            } else {
                Swal.fire("No encontrado", "No se encontró el alumno", "warning");
                setAlumno(null);
            }
        } catch (error) {
            console.error("Error al buscar el alumno:", error);
            Swal.fire("Error", "Ocurrió un error al buscar el alumno", "error");
            setAlumno(null);
        }
    };

    const eliminarAlumno = async () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Esta acción eliminará el alumno!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:5000/alumnos/eliminar/${matricula}`);
                    Swal.fire("Eliminado", "El alumno ha sido eliminado", "success");
                    setAlumno(null);
                    setMatricula("");
                } catch (error) {
                    console.error("Error al eliminar:", error);
                    Swal.fire("Error", "No se pudo eliminar el alumno", "error");
                }
            }
        });
    };

    const cancelar = () => {
        setAlumno(null);
    };

    return (
        <Container fluid>
            <div
                style={{
                    maxWidth: 700,
                    margin: "40px auto",
                    padding: 32,
                    background: "linear-gradient(135deg, #fff 80%, #e74c3c11 100%)",
                    borderRadius: 16,
                    boxShadow: "0 8px 32px rgba(44,62,80,0.12)",
                    border: "1.5px solid #1a73e8",
                    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                }}
            >
                <h2 style={{
                    color: "#e74c3c",
                    marginBottom: 24,
                    fontWeight: 700,
                    textAlign: "center",
                    letterSpacing: 1
                }}>Eliminar Alumno</h2>
                <Form onSubmit={buscarAlumno}>
                    <FloatingLabel label="Matrícula" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Matrícula"
                            value={matricula}
                            onChange={handleInputChange}
                            style={{
                                padding: 12,
                                borderRadius: 8,
                                border: "1.5px solid #e74c3c",
                                fontSize: 16,
                                outline: "none",
                                background: "#fff"
                            }}
                        />
                    </FloatingLabel>
                    <Button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: 14,
                            fontSize: 18,
                            fontWeight: "700",
                            background: "linear-gradient(90deg, #1a73e8 60%, #e74c3c 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: 8,
                            cursor: "pointer",
                            boxShadow: "0 2px 8px #e74c3c22",
                            transition: "background 0.3s",
                            marginBottom: 10
                        }}
                    >
                        Buscar
                    </Button>
                </Form>

                {alumno && (
                    <Card className="mt-4" style={{
                        borderRadius: 14,
                        border: "1.5px solid #e74c3c",
                        boxShadow: "0 2px 8px #e74c3c22",
                        background: "#fff"
                    }}>
                        <Card.Body>
                            <Card.Title style={{ color: "#1a73e8", fontWeight: 700 }}>Alumno Encontrado</Card.Title>
                            <Row>
                                <Col><strong>Nombre:</strong> {`${alumno.nombre} ${alumno.aPaterno} ${alumno.aMaterno}`}</Col>
                            </Row>
                            <Row>
                                <Col><strong>Teléfono:</strong> {alumno.aTelefono}</Col>
                                <Col><strong>Correo:</strong> {alumno.aCorreo}</Col>
                            </Row>
                            <Row>
                                <Col><strong>Nombre Contacto:</strong> {alumno.nombreContacto}</Col>
                                <Col><strong>Tel. Contacto:</strong> {alumno.telefonoContacto}</Col>
                            </Row>

                            <div className="mt-3 d-flex justify-content-end">
                                <Button
                                    style={{
                                        background: "linear-gradient(90deg, #e74c3c 60%, #1a73e8 100%)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: 8,
                                        fontWeight: "bold",
                                        boxShadow: "0 2px 8px #e74c3c22",
                                        marginRight: 8,
                                        transition: "background 0.3s"
                                    }}
                                    onClick={eliminarAlumno}
                                >
                                    Eliminar
                                </Button>
                                <Button
                                    style={{
                                        background: "#fff",
                                        color: "#e74c3c",
                                        border: "1.5px solid #e74c3c",
                                        borderRadius: 8,
                                        fontWeight: "bold",
                                        boxShadow: "0 2px 8px #e74c3c22",
                                        transition: "background 0.3s, color 0.3s"
                                    }}
                                    onClick={cancelar}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </Container>
    );
}

export default AlumnoEliminar;
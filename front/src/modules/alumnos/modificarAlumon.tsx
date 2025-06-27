import { useState } from "react";
import { Col, Container, Row, FloatingLabel, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import React from "react";
import Swal from 'sweetalert2';
import axios from "axios";

type alumnosEstructura = {
    matricula: string;
    nombre: string;
    APaterno: string;
    MPaterno: string;
    sexo: string;
    Telefono: string;
    CorreoElectrnico: string;
    PerfilFacebook: string;
    Instagram: string;
    TipoSangre: string;
    Contraseña: string;
    dCalle: string;
    Numero: number | string;
    Colonia: string;
    CodigoPostal: number | string;
    dNombreContacto: string;
    TelefonoContacto: string;
}

const initialState: alumnosEstructura = {
    matricula: "",
    nombre: "",
    APaterno: "",
    MPaterno: "",
    sexo: "",
    Telefono: "",
    CorreoElectrnico: "",
    PerfilFacebook: "",
    Instagram: "",
    TipoSangre: "",
    Contraseña: "",
    dCalle: "",
    Numero: "",
    Colonia: "",
    CodigoPostal: "",
    dNombreContacto: "",
    TelefonoContacto: ""
}

function AlumnoModificar() {
    const [alumno, setAlumno] = useState(initialState);
    const [buscarMatricula, setBuscarMatricula] = useState("");

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
                const alumnoData: alumnosEstructura = {
                    matricula: datos.matricula,
                    nombre: datos.nombre,
                    APaterno: datos.aPaterno,
                    MPaterno: datos.aMaterno,
                    sexo: String(datos.sexo),
                    Telefono: datos.aTelefono,
                    CorreoElectrnico: datos.aCorreo,
                    PerfilFacebook: datos.aFacebook,
                    Instagram: datos.aInstagram,
                    TipoSangre: datos.tiposangre,
                    Contraseña: datos.contrasenha,
                    dCalle: datos.dCalle,
                    Numero: datos.dNumero,
                    Colonia: datos.dColonia,
                    CodigoPostal: datos.dCodigoPostal,
                    dNombreContacto: datos.nombreContacto,
                    TelefonoContacto: datos.telefonoContacto
                }
                setAlumno(alumnoData);
            } else {
                Swal.fire("No encontrado", "No se encontró ningún alumno con esa matrícula", "error");
                setAlumno(initialState);
            }
        } catch (error) {
            Swal.fire("Error", "No se pudo encontrar el alumno", "error");
            setAlumno(initialState);
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = event.target;
        setAlumno({ ...alumno, [name]: value });
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        let { name, value } = event.target;
        setAlumno({ ...alumno, [name]: value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:5000/alumnos/actualizar/${alumno.matricula}`, alumno);
            Swal.fire("Éxito", "Alumno actualizado correctamente", "success");
            setAlumno(initialState);
            setBuscarMatricula("");
        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar el alumno", "error");
        }
    }

    const handleCancelar = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No se guardarán los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setAlumno(initialState);
                setBuscarMatricula("");
                Swal.fire('Cancelado', 'Los cambios no se guardaron.', 'info');
            }
        });
    }

    return (
        <Container fluid>
            <div
                style={{
                    maxWidth: 900,
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
                    marginBottom: 25,
                    color: "#1a73e8",
                    fontWeight: 700,
                    textAlign: "center",
                    letterSpacing: 1
                }}>
                    Modificar Alumno
                </h2>

                {/* Buscador de matrícula */}
                <Row className="mb-4">
                    <Col md={{ span: 6, offset: 3 }}>
                        <InputGroup>
                            <FormControl
                                placeholder="Buscar matrícula"
                                value={buscarMatricula}
                                onChange={handleBuscarChange}
                                style={{
                                    padding: 12,
                                    borderRadius: 8,
                                    border: "1.5px solid #e74c3c",
                                    fontSize: 16,
                                    outline: "none",
                                    background: "#fff"
                                }}
                            />
                            <Button
                                style={{
                                    background: "linear-gradient(90deg, #1a73e8 60%, #e74c3c 100%)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: 8,
                                    fontWeight: "bold",
                                    boxShadow: "0 2px 8px #e74c3c22",
                                    transition: "background 0.3s"
                                }}
                                onClick={buscarAlumno}
                            >
                                Buscar
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

                {/* Formulario de edición */}
                <Form onSubmit={handleSubmit}>
                    <Row className="mt-3">
                        <Col>
                            <FloatingLabel label="Matricula" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="matricula"
                                    value={alumno.matricula}
                                    disabled
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#f4f6f8"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="Nombre" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={alumno.nombre}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <FloatingLabel label="Apellido Paterno" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="APaterno"
                                    value={alumno.APaterno}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                        <Col>
                            <FloatingLabel label="Apellido Materno" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="MPaterno"
                                    value={alumno.MPaterno}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <FloatingLabel label="Sexo" className="mb-3">
                                <Form.Select
                                    name="sexo"
                                    value={alumno.sexo}
                                    onChange={handleSelectChange}
                                    required
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Masculino</option>
                                    <option value="2">Femenino</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="Teléfono" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="Telefono"
                                    value={alumno.Telefono}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <FloatingLabel label="Correo Electrónico" className="mb-3">
                                <Form.Control
                                    type="email"
                                    name="CorreoElectrnico"
                                    value={alumno.CorreoElectrnico}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                        <Col>
                            <FloatingLabel label="Perfil Facebook" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="PerfilFacebook"
                                    value={alumno.PerfilFacebook}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <FloatingLabel label="Instagram" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="Instagram"
                                    value={alumno.Instagram}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                        <Col>
                            <FloatingLabel label="Tipo Sangre" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="TipoSangre"
                                    value={alumno.TipoSangre}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <FloatingLabel label="Contraseña" className="mb-3">
                                <Form.Control
                                    type="password"
                                    name="Contraseña"
                                    value={alumno.Contraseña}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                    </Row>

                    <Row className="mt-3 text-center">
                        <Col>
                            <span style={{ color: "#e74c3c", fontWeight: 600, fontSize: 18 }}>Dirección</span>
                        </Col>
                    </Row>
                    <Row className="mt-3 mb-3">
                        <Col>&nbsp;</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <FloatingLabel label="Calle" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="dCalle"
                                    value={alumno.dCalle}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                        <Col>
                            <FloatingLabel label="Número" className="mb-3">
                                <Form.Control
                                    type="number"
                                    name="Numero"
                                    value={alumno.Numero}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <FloatingLabel label="Colonia" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="Colonia"
                                    value={alumno.Colonia}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                        <Col>
                            <FloatingLabel label="Código Postal" className="mb-3">
                                <Form.Control
                                    type="number"
                                    name="CodigoPostal"
                                    value={alumno.CodigoPostal}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                    </Row>

                    <Row className="mt-3 text-center">
                        <Col>
                            <span style={{ color: "#e74c3c", fontWeight: 600, fontSize: 18 }}>Contacto</span>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <FloatingLabel label="Nombre Contacto" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="dNombreContacto"
                                    value={alumno.dNombreContacto}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                        <Col>
                            <FloatingLabel label="Teléfono Contacto" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="TelefonoContacto"
                                    value={alumno.TelefonoContacto}
                                    onChange={handleInputChange}
                                    required
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
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            &nbsp;
                        </Col>
                        <Col>
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
                                    marginTop: 10,
                                }}
                            >
                                Guardar Cambios
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                style={{
                                    width: "100%",
                                    padding: 14,
                                    fontSize: 18,
                                    fontWeight: "700",
                                    background: "#fff",
                                    color: "#e74c3c",
                                    border: "1.5px solid #e74c3c",
                                    borderRadius: 8,
                                    cursor: "pointer",
                                    boxShadow: "0 2px 8px #e74c3c22",
                                    transition: "background 0.3s, color 0.3s",
                                    marginTop: 10,
                                }}
                                onClick={handleCancelar}
                            >
                                Cancelar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>
    );
}

export default AlumnoModificar;
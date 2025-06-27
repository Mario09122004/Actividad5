import { useState } from "react";
import { Col, Container, Row, FloatingLabel, Form, Button } from "react-bootstrap";
import React from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
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

const initialState:alumnosEstructura = {
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
    Numero: 0,
    Colonia: "",
    CodigoPostal: 0,
    dNombreContacto: "",
    TelefonoContacto: ""
}

function AlumnosAgregar() {
    const [alumono, setAlumno] = useState(initialState);
    const navigate = useNavigate();

    const { matricula, nombre, APaterno, MPaterno, sexo, Telefono, CorreoElectrnico, PerfilFacebook, Instagram, TipoSangre, Contraseña, dCalle, Numero, Colonia, CodigoPostal, dNombreContacto, TelefonoContacto } = alumono;

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addAlumno(alumono);
    }

    const addAlumno = async (datos:alumnosEstructura) => {
        const response = await axios.post(
            "http://localhost:5000/alumnos/agregar", 
            datos
        ).then((response) => {
            notify(response.data.status);
        }
        );
        return response;
    }

    const notify = (num:number) => {
        if (num === 100) {
            Swal.fire({
                title: 'Upssss!',
                text: 'No se agregó el lumno',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } else {
            Swal.fire({
                title: '¡Alumno agregado!',
                text: 'El alumno se ha agregado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            navigate('/alumnos'); // Redirect to the alumnos list
        }
    }

    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = event.target;
        setAlumno({...alumono, [name]: value });
    }

    const handleSelectChange = (event:React.ChangeEvent<HTMLSelectElement>):void => {
        let { name, value } = event.target;
        setAlumno({...alumono, [name]: value });
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
                setAlumno(initialState); // Reset the form
                Swal.fire(
                    'Cancelado',
                    'Los cambios no se guardaron.',
                    'error'
                );
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
                    Registrar Alumno
                </h2>
                <Form onSubmit={ handleSubmit }>
                    <Row className="mt-3">
                        <Col>{"\u00A0"}</Col>
                        <Col>
                            <FloatingLabel label="Matricula" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="matricula"
                                    onChange={ handleInputChange }
                                    value={ matricula }
                                    name="matricula"
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="Nombre" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa tu nombre"
                                    onChange={ handleInputChange }
                                    name="nombre"
                                    value={ nombre }
                                    required
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>{"\u00A0"}</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>{"\u00A0"}</Col>
                        <Col>
                            <FloatingLabel label="Apellido Paterno" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Apellido Paterno"
                                    onChange={ handleInputChange }
                                    value={ APaterno }
                                    name="APaterno"
                                    required
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
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
                                    placeholder="Apellido Materno"
                                    onChange={ handleInputChange }
                                    value={ MPaterno}
                                    name="MPaterno"
                                    required
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>{"\u00A0"}</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>{"\u00A0"}</Col>
                        <Col>
                            <FloatingLabel label="Sexo" className="mb-3">
                                <Form.Select
                                    name="sexo"
                                    value={ sexo }
                                    onChange={ handleSelectChange }
                                    required
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
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
                            <FloatingLabel label="Telefono" className="mb-3">
                                <Form.Control
                                    type="text"
                                    value={ Telefono }
                                    placeholder="Telefono de ejemplo: (618) 166 7980"
                                    name="Telefono"
                                    required
                                    onChange={ handleInputChange }
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>{"\u00A0"}</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>{"\u00A0"}</Col>
                        <Col>
                            <FloatingLabel label="CorreoElectrnico" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Correo Electrnico"
                                    value={ CorreoElectrnico }
                                    name="CorreoElectrnico"
                                    required
                                    onChange={ handleInputChange }
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="PerfilFacebook" className="mb-3">
                                <Form.Control
                                    type="text"
                                    value={ PerfilFacebook }
                                    placeholder="PerfilFacebook"
                                    name="PerfilFacebook"
                                    required
                                    onChange={ handleInputChange }
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>{"\u00A0"}</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>{"\u00A0"}</Col>
                        <Col>
                            <FloatingLabel label="Instagram" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Instagram"
                                    value={ Instagram }
                                    name="Instagram"
                                    required
                                    onChange={ handleInputChange }
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="TipoSangre" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="TipoSangre"
                                    name="TipoSangre"
                                    value={ TipoSangre }
                                    required
                                    onChange={ handleInputChange }
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>{"\u00A0"}</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>{"\u00A0"}</Col>
                        <Col>
                            <FloatingLabel label="Contraseña" className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    name="Contraseña"
                                    value={ Contraseña }
                                    required
                                    onChange={ handleInputChange }
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>{"\u00A0"}</Col>
                    </Row>
                    <Row className="mt-3 text-center">
                        <Col>
                            <span style={{ color: "#e74c3c", fontWeight: 600, fontSize: 18 }}>Dirección</span>
                        </Col>
                    </Row>
                    <Row className="mt-3 mb-3">
                        <Col>
                            &nbsp;
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>{"\u00A0"}</Col>
                        <Col>
                            <FloatingLabel label="Calle" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Calle"
                                    onChange={ handleInputChange }
                                    name="dCalle"
                                    value={ dCalle }
                                    required
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="Numero" className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="Numero"
                                    onChange={ handleInputChange }
                                    name="Numero"
                                    value={ Numero }
                                    required
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>{"\u00A0"}</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>{"\u00A0"}</Col>
                        <Col>
                            <FloatingLabel label="Colonia" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Colonia"
                                    onChange={ handleInputChange }
                                    value={ Colonia }
                                    name="Colonia"
                                    required
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="CodigoPostal" className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="CodigoPostal"
                                    onChange={ handleInputChange }
                                    value={ CodigoPostal }
                                    name="CodigoPostal"
                                    required
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>{"\u00A0"}</Col>
                    </Row>
                    <Row className="mt-3 text-center">
                        <Col>
                            <span style={{ color: "#e74c3c", fontWeight: 600, fontSize: 18 }}>Contacto</span>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>{"\u00A0"}</Col>
                        <Col>
                            <FloatingLabel label="dNombreContacto" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="dNombreContacto"
                                    onChange={ handleInputChange }
                                    value={ dNombreContacto }
                                    name="dNombreContacto"
                                    required
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="Telefono del contacto" className="mb-3">
                                <Form.Control
                                    type="text"
                                    value={ TelefonoContacto }
                                    onChange={ handleInputChange }
                                    placeholder="Telefono de ejemplo: (618) 166 7980"
                                    name="TelefonoContacto"
                                    required
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1.5px solid #e74c3c",
                                        marginBottom: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        background: "#fff"
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>{"\u00A0"}</Col>
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
                                Guardar
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
                                onClick={ handleCancelar }
                            >
                                Cancelar
                            </Button>
                        </Col>
                        <Col>
                            &nbsp;
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>
    );
}

export default AlumnosAgregar;
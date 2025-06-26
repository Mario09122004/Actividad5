import React from "react";
import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menu(){
    return(
        <Container fluid>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/alumnos">5A BIS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/alumnos">Home</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/alumnos/agregar">Agregar</NavDropdown.Item>
                    <NavDropdown.Item href="/alumnos/Modificar">
                        Modificar
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Eliminar</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/alumnos/consultar">
                        Consultar
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/alumnos/enviar-mensaje">
                        Enviar Mensaje
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        <Outlet />
        </Container>

    )
}

export default Menu;
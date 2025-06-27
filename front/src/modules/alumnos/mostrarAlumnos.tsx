import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Row, InputGroup, Col, FormControl } from "react-bootstrap";

function AlumnosConsultar() {
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [buscar, setBuscar] = useState("");

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/alumnos");
      if (Array.isArray(response.data.results)) {
        setAlumnos(response.data.results);
      } else {
        console.error("Estructura inesperada:", response.data);
      }
    } catch (error) {
      console.error("Error al obtener los alumnos:", error);
    } finally {
      setCargando(false);
    }
  };

  const alumnoConsultar = async (matricula) => {
    try {
      const response = await axios.get(`http://localhost:5000/alumnos/${matricula}`);
      if (response.data && (response.data.result || response.data.results)) {
        const alumno = response.data.result || response.data.results[0];
        setAlumnoSeleccionado(alumno);
        setShowModal(true);
      } else {
        console.error("No se encontró el alumno:", response.data);
      }
    } catch (error) {
      console.error("Error al consultar el alumno:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAlumnoSeleccionado(null);
  };

  const handleInputChange = (e) => {
    setBuscar(e.target.value);
  };

  const handleBuscar = async () => {
    if (buscar.trim() === "") {
      setCargando(true);
      await fetchAlumnos();
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/alumno/traer/${buscar}`);
      if (response.data && (response.data.result || response.data.results)) {
        const alumno = response.data.result || response.data.results[0];
        setAlumnos([alumno]);
      } else {
        setAlumnos([]);
      }
    } catch (error) {
      console.error("Error al buscar el alumno:", error);
      setAlumnos([]);
    }
  };

  return (
    <div
      style={{
        maxWidth: 1100,
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
        color: "#1a73e8",
        marginBottom: 24,
        fontWeight: 700,
        textAlign: "center",
        letterSpacing: 1
      }}>
        Consultar Alumnos
      </h2>
      {cargando ? (
        <p style={{ textAlign: "center", color: "#e74c3c", fontWeight: 600 }}>Cargando...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <Row className="mb-3">
            <Col>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Buscar por matrícula"
                  aria-label="Buscar"
                  value={buscar}
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
                <Button
                  variant="outline-secondary"
                  onClick={handleBuscar}
                  style={{
                    border: "1.5px solid #1a73e8",
                    color: "#1a73e8",
                    fontWeight: 600,
                    borderRadius: 8,
                    marginLeft: 8,
                    transition: "background 0.2s, color 0.2s"
                  }}
                >
                  Buscar
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Table
            striped
            bordered
            hover
            responsive
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: "1.5px solid #1a73e8",
              boxShadow: "0 2px 12px rgba(231,76,60,0.08)",
              background: "#fff"
            }}
          >
            <thead style={{ background: "linear-gradient(90deg, #1a73e8 60%, #e74c3c 100%)", color: "#fff" }}>
              <tr>
                <th>#</th>
                <th>Matrícula</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Contacto</th>
                <th>Tel. Contacto</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.length > 0 ? (
                alumnos.map((alumno, index) => (
                  <tr key={alumno.matricula || index}>
                    <td>{index + 1}</td>
                    <td>{alumno.matricula}</td>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.aCorreo}</td>
                    <td>{alumno.aTelefono}</td>
                    <td>{alumno.nombreContacto}</td>
                    <td>{alumno.telefonoContacto}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => alumnoConsultar(alumno.matricula)}
                        style={{
                          background: "linear-gradient(90deg, #1a73e8 60%, #e74c3c 100%)",
                          border: "none",
                          borderRadius: 8,
                          fontWeight: 600,
                          boxShadow: "0 2px 8px #e74c3c22",
                          transition: "background 0.3s"
                        }}
                      >
                        Consultar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", color: "#e74c3c", fontWeight: 600 }}>
                    No se encontraron alumnos
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton style={{ background: "#1a73e8", color: "#fff" }}>
          <Modal.Title>
            {alumnoSeleccionado ? `Matrícula: ${alumnoSeleccionado.matricula}` : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alumnoSeleccionado && (
            <div>
              <p><strong>Nombre:</strong> {alumnoSeleccionado.nombre}</p>
              <p><strong>Apellido Paterno:</strong> {alumnoSeleccionado.aPaterno}</p>
              <p><strong>Apellido Materno:</strong> {alumnoSeleccionado.aMaterno}</p>
              <p><strong>Sexo:</strong> {alumnoSeleccionado.sexo === 1 ? "Femenino" : "Masculino"}</p>
              <p><strong>Correo:</strong> {alumnoSeleccionado.aCorreo}</p>
              <p><strong>Teléfono:</strong> {alumnoSeleccionado.aTelefono}</p>
              <p><strong>Facebook:</strong> {alumnoSeleccionado.aFacebook}</p>
              <p><strong>Instagram:</strong> {alumnoSeleccionado.aInstagram}</p>
              <p><strong>Tipo de Sangre:</strong> {alumnoSeleccionado.tiposangre}</p>
              <p><strong>Calle:</strong> {alumnoSeleccionado.dCalle}</p>
              <p><strong>Número:</strong> {alumnoSeleccionado.dNumero}</p>
              <p><strong>Colonia:</strong> {alumnoSeleccionado.dColonia}</p>
              <p><strong>CP:</strong> {alumnoSeleccionado.dCodigoPostal}</p>
              <p><strong>Contacto:</strong> {alumnoSeleccionado.nombreContacto}</p>
              <p><strong>Tel. Contacto:</strong> {alumnoSeleccionado.telefonoContacto}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            style={{
              background: "#fff",
              color: "#e74c3c",
              border: "1.5px solid #e74c3c",
              borderRadius: 8,
              fontWeight: 600,
              transition: "background 0.2s, color 0.2s"
            }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AlumnosConsultar;
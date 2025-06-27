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
      console.log("Respuesta de la consulta:", response.data);
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
    <div>
      <h1>Consultar Alumnos</h1>
      {cargando ? (
        <p>Cargando...</p>
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
                />
                <Button variant="outline-secondary" onClick={handleBuscar}>Buscar</Button>
              </InputGroup>
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
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
                      <Button variant="primary" onClick={() => alumnoConsultar(alumno.matricula)}>
                        Consultar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="8">No se encontraron alumnos</td></tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AlumnosConsultar;
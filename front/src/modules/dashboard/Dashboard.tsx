import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { MdPeopleAlt, MdMarkEmailRead, MdListAlt } from "react-icons/md";

const Dashboard = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      maxWidth: 700,
      margin: '40px auto',
      padding: 32,
      background: 'linear-gradient(135deg, #fff 80%, #e74c3c11 100%)',
      borderRadius: 18,
      boxShadow: '0 8px 32px rgba(44,62,80,0.12)',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      border: '1.5px solid #1a73e8'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        marginBottom: 32
      }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #e74c3c 60%, #1a73e8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 38,
          color: '#fff',
          fontWeight: 700,
          boxShadow: '0 2px 8px #e74c3c22'
        }}>
          {usuario?.nombre?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <h1 style={{
            color: '#1a73e8',
            fontWeight: 800,
            fontSize: 28,
            margin: 0,
            letterSpacing: 1
          }}>
            ¡Bienvenido, <span style={{ color: '#e74c3c' }}>{usuario?.nombre || 'Usuario'}</span>!
          </h1>
          <p style={{ color: '#555', fontSize: 18, margin: 0 }}>
            <span style={{ color: '#1a73e8', fontWeight: 600 }}>{usuario?.email}</span>
          </p>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: 24,
        justifyContent: 'center',
        marginBottom: 32,
        flexWrap: 'wrap'
      }}>
        <Link to="/alumnos" style={{
          flex: 1,
          minWidth: 160,
          background: "#fff",
          border: "1.5px solid #1a73e8",
          borderRadius: 12,
          padding: 24,
          textAlign: "center",
          color: "#1a73e8",
          fontWeight: 700,
          fontSize: 18,
          textDecoration: "none",
          boxShadow: "0 2px 8px #e74c3c22",
          transition: "background 0.2s, color 0.2s"
        }}>
          <MdPeopleAlt style={{ fontSize: 32, marginBottom: 8 }} />
          <div>Alumnos</div>
        </Link>
        <Link to="/mensajes" style={{
          flex: 1,
          minWidth: 160,
          background: "#fff",
          border: "1.5px solid #e74c3c",
          borderRadius: 12,
          padding: 24,
          textAlign: "center",
          color: "#e74c3c",
          fontWeight: 700,
          fontSize: 18,
          textDecoration: "none",
          boxShadow: "0 2px 8px #e74c3c22",
          transition: "background 0.2s, color 0.2s"
        }}>
          <MdMarkEmailRead style={{ fontSize: 32, marginBottom: 8 }} />
          <div>Mensajes</div>
        </Link>
        <Link to="/mostrarAlumno" style={{
          flex: 1,
          minWidth: 160,
          background: "#fff",
          border: "1.5px solid #1a73e8",
          borderRadius: 12,
          padding: 24,
          textAlign: "center",
          color: "#1a73e8",
          fontWeight: 700,
          fontSize: 18,
          textDecoration: "none",
          boxShadow: "0 2px 8px #e74c3c22",
          transition: "background 0.2s, color 0.2s"
        }}>
          <MdListAlt style={{ fontSize: 32, marginBottom: 8 }} />
          <div>Lista de Alumnos</div>
        </Link>
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: '12px 32px',
          background: 'linear-gradient(90deg, #e74c3c 60%, #1a73e8 100%)',
          border: 'none',
          borderRadius: 8,
          color: '#fff',
          cursor: 'pointer',
          fontSize: 18,
          fontWeight: 700,
          transition: 'background 0.3s',
          boxShadow: '0 2px 8px #e74c3c22',
          display: 'block',
          margin: '0 auto'
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#c0392b')}
        onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #e74c3c 60%, #1a73e8 100%)')}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;

import React, { useState, useContext } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MdDashboard, MdPeople, MdMessage, MdPersonAdd, MdEdit, MdDelete, MdList, MdLogout, MdMenu } from "react-icons/md";

const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
  { to: "/alumnos", label: "Alumnos", icon: <MdPeople /> },
  { to: "/mensajes", label: "Mensajes", icon: <MdMessage /> },
  { to: "/registrarAlumno", label: "Registrar alumno", icon: <MdPersonAdd /> },
  { to: "/modificarAlumno", label: "Modificar alumno", icon: <MdEdit /> },
  { to: "/eliminarAlumno", label: "Eliminar alumno", icon: <MdDelete /> },
  { to: "/mostrarAlumno", label: "Mostrar alumnos", icon: <MdList /> },
];

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const pathnames = location.pathname.split("/").filter((x) => x);

  // Función para cerrar sesión y redirigir
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* Sidebar */}
      <nav
        style={{
          position: "fixed",
          zIndex: 1000,
          top: 0,
          bottom: 0,
          width: menuOpen ? 220 : 64,
          background: 'linear-gradient(135deg, #1a73e8 80%, #e74c3c 100%)',
          color: "#fff",
          transition: "width 0.3s",
          overflow: "hidden",
          boxShadow: "2px 0 16px rgba(44,62,80,0.10)",
          borderRight: "3px solid #e74c3c",
          borderRadius: menuOpen ? "0 14px 14px 0" : "0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Botón Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            padding: 15,
            width: "100%",
            cursor: "pointer",
            fontSize: 28,
            textAlign: menuOpen ? "left" : "center",
            userSelect: "none",
            outline: "none",
            marginBottom: 10,
          }}
          aria-label="Toggle menu"
          title={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <MdMenu />
        </button>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            flexGrow: 1,
          }}
        >
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 24px",
                  color: "white",
                  textDecoration: "none",
                  background: location.pathname.startsWith(item.to)
                    ? "linear-gradient(90deg, #e74c3c 60%, #1a73e8 100%)"
                    : "transparent",
                  borderRadius: 8,
                  gap: menuOpen ? 16 : 0,
                  justifyContent: menuOpen ? "flex-start" : "center",
                  fontWeight: 600,
                  fontSize: 18,
                  transition: "background 0.2s",
                  boxShadow: location.pathname.startsWith(item.to)
                    ? "0 2px 8px #e74c3c22"
                    : "none",
                }}
              >
                <span style={{ fontSize: 26 }}>{item.icon}</span>
                {menuOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botón Cerrar Sesión */}
        {menuOpen && (
          <button
            onClick={handleLogout}
            style={{
              marginBottom: 28,
              marginLeft: 24,
              padding: "12px 24px",
              background: 'linear-gradient(90deg, #e74c3c 60%, #1a73e8 100%)',
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
              width: "calc(100% - 18px)",
              userSelect: "none",
              fontSize: 18,
              boxShadow: '0 2px 8px #e74c3c22',
              transition: "background 0.3s",
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "center",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#c0392b')}
            onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #e74c3c 60%, #1a73e8 100%)')}
          >
            <MdLogout style={{ fontSize: 20 }} />
            Cerrar sesión
          </button>
        )}
      </nav>

      {/* Main content */}
      <main style={{
        marginLeft: menuOpen ? 200 : 60,
        flexGrow: 1,
        padding: 24,
        backgroundColor: "#f4f6f8",
        transition: "margin-left 0.3s"
      }}>
        {/* Breadcrumbs */}
        <nav
          aria-label="breadcrumb"
          style={{
            marginBottom: 20,
            fontSize: 14,
            color: "#555",
          }}
        >
          <ol
            style={{
              listStyle: "none",
              display: "flex",
              gap: 8,
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <Link to="/" style={{ color: "#3498db", textDecoration: "none" }}>
                Inicio
              </Link>
              <span> / </span>
            </li>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              return (
                <li key={routeTo}>
                  {!isLast ? (
                    <>
                      <Link
                        to={routeTo}
                        style={{ color: "#3498db", textDecoration: "none" }}
                      >
                        {name}
                      </Link>
                      <span> / </span>
                    </>
                  ) : (
                    <span style={{ color: "#333" }}>{name}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 28,
            boxShadow: "0 2px 12px rgba(231,76,60,0.08)",
            minHeight: "80vh",
          }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;

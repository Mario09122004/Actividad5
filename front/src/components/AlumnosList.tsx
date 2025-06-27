import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface Alumno {
  _id: string;
  nombre: string;
  email: string;
  carrera?: string;
  semestre?: string;
}

const AlumnosList: React.FC = () => {
  const { token } = useContext(AuthContext);

  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const cargarAlumnos = async () => {
    if (!token) return;

    setLoading(true);
    setError('');
    try {
      const query = new URLSearchParams();
      if (debouncedSearch) query.append('search', debouncedSearch);
      if (carrera) query.append('carrera', carrera);
      if (semestre) query.append('semestre', semestre);

      const res = await fetch(`http://localhost:5000/api/alumnos?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Error al obtener alumnos');
      const data = await res.json();
      setAlumnos(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAlumnos();
  }, [debouncedSearch, carrera, semestre, token]);

  return (
    <div style={{
      maxWidth: 900,
      margin: '40px auto',
      padding: 32,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(135deg, #fff 80%, #e74c3c11 100%)",
      borderRadius: 16,
      boxShadow: '0 8px 32px rgba(44,62,80,0.12)',
      border: "1.5px solid #1a73e8"
    }}>
      <h2 style={{
        color: '#1a73e8',
        marginBottom: 24,
        fontWeight: 700,
        textAlign: "center",
        letterSpacing: 1
      }}>Lista de Alumnos</h2>

      <div style={{
        marginBottom: 25,
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Buscar por nombre o email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: 12,
            flexGrow: 1,
            borderRadius: 8,
            border: '1.5px solid #e74c3c',
            fontSize: 16,
            outline: "none",
            transition: 'border-color 0.3s',
            background: "#fff"
          }}
          onFocus={e => e.currentTarget.style.borderColor = '#1a73e8'}
          onBlur={e => e.currentTarget.style.borderColor = '#e74c3c'}
        />

        <select
          value={carrera}
          onChange={e => setCarrera(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            border: '1.5px solid #e74c3c',
            fontSize: 16,
            minWidth: 160,
            outline: "none",
            cursor: 'pointer',
            transition: 'border-color 0.3s',
            background: "#fff"
          }}
          onFocus={e => e.currentTarget.style.borderColor = '#1a73e8'}
          onBlur={e => e.currentTarget.style.borderColor = '#e74c3c'}
        >
          <option value="">Todas las carreras</option>
          <option value="Sistemas">Sistemas</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Industrial">Industrial</option>
          <option value="Civil">Civil</option>
        </select>

        <select
          value={semestre}
          onChange={e => setSemestre(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            border: '1.5px solid #e74c3c',
            fontSize: 16,
            minWidth: 140,
            outline: "none",
            cursor: 'pointer',
            transition: 'border-color 0.3s',
            background: "#fff"
          }}
          onFocus={e => e.currentTarget.style.borderColor = '#1a73e8'}
          onBlur={e => e.currentTarget.style.borderColor = '#e74c3c'}
        >
          <option value="">Todos los semestres</option>
          {[...Array(9)].map((_, i) => (
            <option key={i + 1} value={`${i + 1}`}>{i + 1}°</option>
          ))}
        </select>
      </div>

      {error && <p style={{ color: '#e74c3c', fontWeight: '600' }}>{error}</p>}

      {loading ? (
        <p style={{ fontSize: 18, color: '#666' }}>Cargando...</p>
      ) : (
        <div style={{
          maxHeight: 450,
          overflowY: 'auto',
          borderRadius: 8,
          border: '1.5px solid #1a73e8',
          background: '#fff',
          boxShadow: 'inset 0 1px 4px rgb(44 62 80 / 0.08)',
          padding: 10
        }}>
          {alumnos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#777', fontSize: 16, marginTop: 40 }}>
              No se encontraron alumnos.
            </p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {alumnos.map(a => (
                <li
                  key={a._id}
                  style={{
                    padding: '14px 18px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    fontSize: 16,
                    color: '#222'
                  }}
                >
                  <strong style={{ fontSize: 18, color: '#1a73e8' }}>{a.nombre}</strong>
                  <span>{a.email}</span>
                  <span style={{ fontStyle: 'italic', color: '#555' }}>
                    {a.carrera ?? 'Carrera no especificada'} {a.semestre ? `- ${a.semestre}° semestre` : ''}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AlumnosList;

## Sistema de Gestión de Alumnos

Aplicación web para la gestión de alumnos, mensajes y administración, desarrollada con **React + TypeScript + Vite** en el frontend y **Node.js/Express** en el backend.

---

## Requisitos Previos

- Node.js (v18 o superior recomendado)
- npm (v9 o superior recomendado)
- Tener los puertos 3000 (frontend) y 5000 (backend) libres

---

## Instalación

### 1. Clona el repositorio

```sh
git clone <URL_DEL_REPOSITORIO>
cd Actividad5
```

### 2. Instala dependencias

#### Backend

```sh
cd back
npm install
```

#### Frontend

```sh
cd ../front
npm install
```

---

## Ejecución

### 1. Inicia el backend

```sh
cd back
npm run dev
```
El backend se ejecutará en [http://localhost:5000](http://localhost:5000)

### 2. Inicia el frontend

En otra terminal:

```sh
cd front
npm run dev
```
El frontend se ejecutará en [http://localhost:3000](http://localhost:3000)

---

### Frontend

No requiere configuración adicional por defecto.

---

## Funcionalidades principales

- **Login y Registro** de usuarios/alumnos
- **Dashboard** con acceso rápido a módulos
- **Gestión de alumnos**: registrar, modificar, eliminar, consultar
- **Mensajes** entre usuarios
- **Lista de alumnos** con filtros y búsqueda

---

## Notas

- El frontend utiliza Bootstrap y estilos personalizados para una apariencia elegante y formal.
- Si tienes problemas con CORS, asegúrate de que ambos servidores estén corriendo y revisa la configuración de CORS en el backend.
- Para desarrollo, puedes modificar los endpoints en los archivos de frontend si tu backend corre en otra URL o puerto.

---

## Scripts útiles

### Backend

- `npm run dev` — Ejecuta el backend en modo desarrollo con recarga automática.
- `npm start` — Ejecuta el backend en modo producción.

### Frontend

- `npm run dev` — Ejecuta el frontend en modo desarrollo.
- `npm run build` — Compila el frontend para producción.
- `npm run preview` — Previsualiza el frontend compilado.

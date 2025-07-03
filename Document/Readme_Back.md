# 🔧 Backend - Sistema de Administración IoT
Backend para la aplicación de administración IoT con autenticación, gestión de sensores y reportes.

## 📂 Estructura del proyecto
backend/
├── src/
│   ├── config/
│   │   └── db.ts              # Configuración de base de datos
│   ├── controllers/
│   │   ├── auth.controller.ts # Controlador de autenticación
│   │   ├── report.controller.ts # Controlador de reportes
│   │   └── sensor.controller.ts # Controlador de sensores
│   ├── models/
│   │   ├── loginHistory.ts    # Modelo de historial de login
│   │   ├── report.ts          # Modelo de reportes
│   │   ├── sensor.ts          # Modelo de sensores
│   │   └── user.ts            # Modelo de usuarios
│   ├── routes/
│   │   ├── auth.routes.ts     # Rutas de autenticación
│   │   ├── report.routes.ts   # Rutas de reportes
│   │   └── sensor.routes.ts   # Rutas de sensores
│   ├── utils/
│   │   ├── cache.ts           # Utilidades de caché
│   │   └── generateToken.ts   # Generación de tokens JWT
│   └── index.ts               # Punto de entrada
├── .gitignore
├── package-lock.json
├── package.json
└── tsconfig.json

## 🛠️ Instalación y ejecución
1. Entrar a la carpeta del backend:
cd backend

2. Instalar dependencias:
npm install

3. Configurar variables de entorno (crear archivo .env):
PORT=3000
MONGODB_URI=mongodb://localhost:27017/iot-db
JWT_SECRET=mi_secreto_jwt

4. Iniciar servidor:
npm start
El servidor estará en http://localhost:3000

## 🔐 Endpoints principales
- POST /api/auth/login - Autenticación de usuarios
- GET /api/sensors - Obtener datos de sensores
- POST /api/reports - Generar reportes
- GET /api/users - Administración de usuarios

## 📌 Tecnologías usadas
- Node.js
- TypeScript
- Express
- MongoDB (u otra DB según db.ts)
- JSON Web Tokens (JWT)
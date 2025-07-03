# 🚀 Frontend - Administrador IoT
Aplicación web para administración de dispositivos IoT con autenticación y panel de control.

## 📦 Estructura del proyecto
frontend/
├── src/
│   ├── assets/                
│   ├── components/            
│   │   ├── SideMenuComponents/
│   │   │   ├── Hero.tsx       
│   │   │   ├── SideMenu.tsx   
│   │   │   └── TabNavigator.tsx 
│   ├── screens/               
│   │   ├── App.tsx            
│   │   └── main.tsx           
│   └── ...
├── public/                    
└── package.json               

## 🛠️ Instalación y ejecución
1. Entrar a la carpeta del frontend:
cd frontend

2. Instalar dependencias:
npm install

3. Iniciar servidor de desarrollo:
npm run dev
Abre http://localhost:5173 en tu navegador

## 🔐 Funcionalidades clave
- Login de administrador (acceso protegido)
- Menú lateral con opciones:
  • Data.tsx: Visualización de datos
  • History.tsx: Historial de eventos
  • IOT.tsx: Gestión de dispositivos
  • Users.tsx: Administración de usuarios

## 🛡️ Variables de entorno
Crea un archivo .env con:
VITE_API_URL=http://tu-backend.com/api

## 📌 Tecnologías usadas
- TypeScript
- React + Vite
- CSS Modules
- ESLint (configuración en eslint.config.js)
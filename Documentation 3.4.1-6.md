# 3.4. Código Fuente

## 3.4.1 Métodos

### Auth Controller
- `login(username, password)`  
  Autentica usuarios, genera JWT (15min), maneja errores de credenciales/usuario inactivo

- `getTimeToken(userId)`  
  Consulta tiempo restante del token (segundos y hora expiración)

- `updateToken(userId)`  
  Renueva token por 15 minutos adicionales

- `getAllUser()`  
  Lista todos los usuarios registrados

- `getUserByUsername(username)`  
  Busca usuario por nombre exacto (404 si no existe)

- `saveUser(userData)`  
  Crea nuevo usuario con password encriptado

- `updateUser(userId, userData)`  
  Actualiza datos de usuario, valida unicidad de email

- `deleteUser(userId)`  
  Desactiva usuario (soft delete)

### Sensor Controller
- `createReport(reportData)`  
  Crea reporte con geolocalización (GeoJSON Point)

- `getAllReports(filters)`  
  Lista reportes con filtros opcionales (tipo/estado)

- `getReportsNearLocation(coords)`  
  Busca reportes en radio de 1km (geoespacial)

- `updateReportStatus(reportId, status)`  
  Cambia estado (PENDIENTE/EN_PROCESO/RESUELTO)

## 3.4.2 Atributos

### Modelos
```typescript
// User
{
  username: string,  // unique
  password: string,  // encrypted
  role: string,
  status: boolean,   // active/inactive
  deleteDate?: Date
}

// SensorReading
{
  deviceId: string,  // indexed
  timestamp: Date,
  sensors: {
    temperature: { value: number, unit: "Celsius" },
    humidity: { value: number, unit: "%" },
    soilMoisture: { rawValue: number, percentage: number }
  }
}

// Report
{
  location: GeoJSON Point,  // [long, lat]
  status: "PENDIENTE" | "EN_PROCESO" | "RESUELTO",
  reportType: "URGENTE" | "Comun"
}
```

## 3.4.3 Variables

```env
MONGO_URL=mongodb://...
JWT_ACCESS_SECRET=mi_clave_secreta
JWT_EXPIRES_IN=15m
PORT=3000
```

## Configuración

```typescript
// generateToken.ts
const tokenConfig = {
  expiresIn: process.env.JWT_EXPIRES_IN || "15m"
}

// db.ts
const DB_CONFIG = {
  autoIndex: true,
  maxPoolSize: 5
}
```

## 3.4.4 Conexión a BD

```typescript
mongoose.connect(process.env.MONGO_URL!, {
  autoIndex: true,
  maxPoolSize: 5
});
```

### Características
- Conexión asíncrona con validación de ENV  
- Índices automáticos para consultas rápidas  
- Pool de conexiones limitado a 5

## 3.4.5 Componentes

```plaintext
src/
├── config/       # db.ts, env vars
├── controllers/  # Lógica de endpoints
├── models/       # Esquemas MongoDB
├── routes/       # Definición de rutas
├── utils/        # Helpers (tokens, cache)
└── index.ts      # Config Express
```

### Dependencias Clave

| Módulo        | Uso                        |
|---------------|----------------------------|
| express       | Servidor HTTP              |
| mongoose      | ODM para MongoDB           |
| cors          | Manejo de CORS             |
| morgan        | Logging de requests        |
| jsonwebtoken  | Autenticación JWT          |

## 3.4.6 Excepciones

### Tipos de Errores

| Código | Tipo          | Ejemplo                        |
|--------|---------------|--------------------------------|
| 400    | Bad Request   | Validación de datos fallida    |
| 401    | Unauthorized  | Token inválido/expirado        |
| 404    | Not Found     | Usuario no existe              |
| 500    | Server Error  | Fallo de conexión a BD         |

### Manejo

```typescript
try {
  // Operación riesgosa
} catch (err) {
  if (err instanceof MongoError) {
    // Error específico de MongoDB
  } else {
    // Error genérico
  }
}
```

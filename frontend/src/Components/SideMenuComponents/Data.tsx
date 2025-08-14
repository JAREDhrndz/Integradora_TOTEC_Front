// frontend/src/Components/SideMenuComponents/Data.tsx
import { useState, useEffect } from "react";
import "./data.css";
import {
  ChromeOutlined,
  CloudOutlined,
  AimOutlined,
  ApiOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Map.tsx"

// Tipos para los datos del sensor
interface SensorData {
  deviceId: string;
  timestamp: string;
  sensors: {
    ambientTemperature?: {
      value: number;
      unit: string;
    };
    ambientHumidity?: {
      value: number;
      unit: string;
    };
    soilMoisture?: {
      rawValue: number;
      percentage: number;
      unit: string;
    };
    motion?: {
      detected: boolean;
      unit: boolean;
    };
    airQuality?: {
      value: number;
      unit: string;
      riskLevel: string;
    };
  };
}

const options = [
  {
    icon: <ChromeOutlined />,
    main: "DT11",
    sub: "Temperatura y humedad",
    background: "url(https://miro.medium.com/v2/resize:fit:1400/1*zBkvNO-k6jP8SG9ukLjQ-w.gif)",
  },
  {
    icon: <CloudOutlined />,
    main: "YL‑69",
    sub: "Humedad del suelo",
    background: "url(https://i.pinimg.com/originals/2b/18/33/2b1833b224b74cc2adf1ea4c6e04343b.gif)",
  },
  {
    icon: <AimOutlined />,
    main: "PIR",
    sub: "Sensor de movimiento",
    background: "url(https://eoimages.gsfc.nasa.gov/images/imagerecords/92000/92178/Foraging.gif)",
  },
  {
    icon: <ApiOutlined />,
    main: "MQ-135",
    sub: "Calidad del aire",
    background: "url(https://media1.tenor.com/m/3GgX9XG4fe0AAAAC/blue-fly.gif)",
  },
  {
    icon: <CameraOutlined />,
    main: "ESP32 CAM",
    sub: "Cámara con WiFi",
    background: "url(https://i.pinimg.com/originals/8d/9e/ce/8d9ecece041e3f7e4a15b1b106b5f2ba.gif)",
  },
];

const Data = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openDetailIndex, setOpenDetailIndex] = useState<number | null>(null);
  const [sensorReadings, setSensorReadings] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/sensor/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSensorReadings(data);
      } catch (err) {
        console.error("Error fetching sensor data:", err);
        setError("Error al cargar los datos del sensor");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleClick = (index: number) => {
    setActiveIndex(index);
    setOpenDetailIndex(null);
  };

  // Obtener el último registro de sensores
  const latestReading = sensorReadings[0] || {
    sensors: {
      ambientTemperature: { value: 0, unit: "Celsius" },
      ambientHumidity: { value: 0, unit: "%" },
      soilMoisture: { rawValue: 0, percentage: 0, unit: "%" },
      motion: { detected: false, unit: false },
      airQuality: { value: 0, unit: "ppm", riskLevel: "Desconocido" }
    }
  };

  // Generar datos para mostrar basados en los sensores reales
const sensorData = latestReading?.sensors ? [
  {
    quick: [
      `${latestReading.sensors.ambientTemperature?.value?.toFixed(1) ?? 'N/A'}°C`,
      `${latestReading.sensors.ambientHumidity?.value ?? 'N/A'}% HR`
    ],
    details: [
      `Temperatura actual: ${latestReading.sensors.ambientTemperature?.value?.toFixed(1) ?? 'N/A'}°C`,
      `Humedad relativa: ${latestReading.sensors.ambientHumidity?.value ?? 'N/A'}%`,
      `Última actualización: ${latestReading.timestamp ? new Date(latestReading.timestamp).toLocaleTimeString() : 'N/A'}`
    ],
  },
  {
    quick: [
      `${latestReading.sensors.soilMoisture?.percentage ?? 'N/A'}%`
    ],
    details: [
      `Humedad en la tierra: ${latestReading.sensors.soilMoisture?.percentage ?? 'N/A'}%`,
      `Valor crudo: ${latestReading.sensors.soilMoisture?.rawValue ?? 'N/A'}`,
      `Estado: ${typeof latestReading.sensors.soilMoisture?.percentage === 'number' ?
        (latestReading.sensors.soilMoisture.percentage > 70 ? "Muy húmedo" :
         latestReading.sensors.soilMoisture.percentage > 30 ? "Óptimo" : "Seco") : 'N/A'}`
    ],
  },
  {
    quick: [
      `Movimiento: ${latestReading.sensors.motion?.detected ? "Detectado" : "No detectado"}`
    ],
    details: [
      `Estado: ${latestReading.sensors.motion?.detected ? "Movimiento detectado" : "Sin movimiento"}`,
      `Última detección: ${latestReading.timestamp ? new Date(latestReading.timestamp).toLocaleTimeString() : 'N/A'}`,
      `Sensibilidad: Alta`
    ],
  },
  {
    quick: [
      `Aire: ${latestReading.sensors.airQuality?.riskLevel ?? 'N/A'}`
    ],
    details: [
      `Calidad del aire: ${latestReading.sensors.airQuality?.riskLevel ?? 'N/A'}`,
      `Valor crudo: ${latestReading.sensors.airQuality?.value ?? 'N/A'} ppm`,
      `Nivel: ${typeof latestReading.sensors.airQuality?.value === 'number' ?
        (latestReading.sensors.airQuality.value > 200 ? "Peligroso" :
         latestReading.sensors.airQuality.value > 100 ? "Alto" :
         latestReading.sensors.airQuality.value > 50 ? "Moderado" : "Bajo") : 'N/A'}`
    ],
  },
  {
    quick: ["Cámara activa"],
    details: ["La cámara está conectada vía WiFi"],
    isCam: true,
  },
] : [];


  if (loading) {
    return (
      <div className="data-container">
        <h2>Datos de Sensores</h2>
        <p>Cargando datos en tiempo real...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="data-container">
        <h2>Datos de Sensores</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="data-container">
      <h2>Datos de Sensores</h2>
      <p>Visualización de datos en tiempo real.</p>

      <div className="options">
        {options.map((option, index) => {
          const isActive = activeIndex === index;
          const data = sensorData[index];
          const isCam = data.isCam;

          return (
            <div
              key={index}
              className={`option ${isActive ? "active" : ""}`}
              style={{
                "--optionBackground": option.background,
              }}
              onClick={() => handleClick(index)}
            >
              <div className="shadow" />

              {isCam && isActive && (
// Cambia el Link del botón a:
              <Link 
                to="../map"  // Navega un nivel arriba (/menu/map)
                className="cam-link"
                onClick={(e) => e.stopPropagation()}
              >
                Ver mapa
              </Link>
              )}

              {isActive && !isCam && (
                <div className="widget-data">
                  {data.quick.map((item, i) => (
                    <div key={i} className="widget-value">
                      {item}
                    </div>
                  ))}
                  <button
                    className="more-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDetailIndex(index);
                    }}
                  >
                    + Más info
                  </button>
                </div>
              )}

              <div className="label">
                <div className="icon">{option.icon}</div>
                <div className="info">
                  <div className="main">{option.main}</div>
                  <div className="sub">{option.sub}</div>
                </div>
              </div>

              {!isCam && openDetailIndex === index && (
                <div
                  className="floating-details"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="floating-box">
                    {data.details.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                    <button
                      className="close-detail"
                      onClick={() => setOpenDetailIndex(null)}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Data;
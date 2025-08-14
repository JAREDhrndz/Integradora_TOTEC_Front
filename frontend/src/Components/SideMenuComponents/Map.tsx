// src/components/SideMenuComponents/Map.tsx
import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import axios from 'axios';
// IMPORTA COMO NAMED EXPORT (con llaves)
import { WeatherWidget } from '@daniel-szulc/react-weather-widget';
import './Map.css';  // Importa el CSS separado

// Función auxiliar para obtener el color basado en la temperatura
const getColorByTemperature = (temp: number | null) => {
  if (temp === null) return 'gray';
  if (temp < 15) return '#0096FF';  // Azul para frío
  if (temp < 28) return '#00C800';  // Verde para normal
  if (temp < 35) return '#FFA500';  // Naranja para alto
  return '#FF0000';  // Rojo para peligroso
};

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);

  const fetchTemperature = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sensor/readings?sensorType=ambientTemperature`);
      const latest = res.data[0];
      const temp = latest?.sensors?.ambientTemperature?.value;
      setTemperature(temp ?? null);
    } catch (error) {
      console.error('Error fetching temperature:', error);
      setTemperature(null);
    }
  };

  useEffect(() => {
    fetchTemperature();
    const interval = setInterval(fetchTemperature, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    const size = 200;

    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
      context: null as CanvasRenderingContext2D | null,

      onAdd() {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        this.context = canvas.getContext('2d');
      },

      render() {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;
        if (!context) return false;

        context.clearRect(0, 0, size, size);

        const color = getColorByTemperature(temperature);

        context.beginPath();
        context.arc(size / 2, size / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = `${color.replace(')', `, ${1 - t})`)}`;
        context.fill();

        context.beginPath();
        context.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
        context.fillStyle = color;
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        this.data = context.getImageData(0, 0, size, size).data;
        mapRef.current?.triggerRepaint();
        return true;
      }
    };

    const center = [-104.548185, 23.980764];

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center,
      zoom: 13,
      pitch: 75,
      bearing: 0,
      antialias: true
    });

    mapRef.current = map;

    map.on('load', () => {
      map.addImage('pulsing-dot', pulsingDot as any, { pixelRatio: 2 });

      map.addSource('point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: center,
              }
            }
          ]
        }
      });

      map.addLayer({
        id: 'layer-with-pulsing-dot',
        type: 'symbol',
        source: 'point',
        layout: {
          'icon-image': 'pulsing-dot'
        }
      });

      const rotateCamera = (time: number) => {
        const rotationSpeed = 0.02;
        if (mapRef.current) {
          const bearing = mapRef.current.getBearing();
          mapRef.current.rotateTo(bearing + rotationSpeed, { duration: 0 });
        }
        requestAnimationFrame(rotateCamera);
      };
      rotateCamera(0);
    });

    return () => {
      map.remove();
    };
  }, [temperature]);

  const getTempLabel = (temp: number | null) => {
    if (temp === null) return 'Sin datos';
    if (temp < 15) return 'Bajo';
    if (temp < 28) return 'Normal';
    if (temp < 35) return 'Alto';
    return 'Peligroso';
  };

  // Obtener el color actual basado en la temperatura
  const currentColor = getColorByTemperature(temperature);

  return (
    <div className="map-wrapper">
      <div ref={mapContainer} className="map-container" />

      {/* Cuadro temperatura DHT11 */}
      <div className="temperature-box">
        <div 
          className="temperature-value" 
          style={{ color: currentColor }}
        >
          {temperature !== null ? `${temperature.toFixed(1)}°C` : 'N/A'}
        </div>
        <div 
          className="temperature-label" 
          style={{ color: currentColor }}
        >
          {getTempLabel(temperature)}
        </div>
      </div>

      {/* Widget clima OpenWeatherMap */}
      <div className="weather-widget-container">
        <WeatherWidget
          apiKey="14dfab7947079516309faf23c62de61d"
          lat={24.02032}
          lon={-104.65756}
          units="metric"
          lang="es"
        />
      </div>
    </div>
  );
};

export default Map;
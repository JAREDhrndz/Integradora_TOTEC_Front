import React, { useEffect, useState } from 'react';
import './IOT.css';

interface Report {
  _id: string;
  userId: string;
  reportType: string;
  status: 'PENDIENTE' | 'EN_PROCESO' | 'RESUELTO';
  location: {
    type: string;
    coordinates: [number, number];
  };
  data: {
    description: string;
    severity?: string;
  };
  createDate: string;
  solutionDate?: string;
}

const IOT: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchReports = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reports`);
          if (!response.ok) {
            throw new Error('Error al obtener los reportes');
          }
          const data = await response.json();
          setReports(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
          setLoading(false);
        }
      };

      fetchReports();
    }, []);


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDIENTE':
        return 'status-pending';
      case 'EN_PROCESO':
        return 'status-in-progress';
      case 'RESUELTO':
        return 'status-resolved';
      default:
        return '';
    }
  };

  if (loading) return <div className="loading">Cargando reportes...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="iot-container">
      <h2>Reportes IOT</h2>
      <div className="table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Fecha Creación</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report._id.substring(0, 6)}...</td>
                <td>{report.userId.substring(0, 6)}...</td>
                <td>{report.reportType}</td>
                <td>{report.data.description}</td>
                <td>
                  {report.location.coordinates[1].toFixed(4)}, 
                  {report.location.coordinates[0].toFixed(4)}
                </td>
                <td>
                  <span className={`status-badge ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </td>
                <td>{new Date(report.createDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IOT;
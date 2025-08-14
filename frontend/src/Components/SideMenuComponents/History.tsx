import React, { useEffect, useState } from 'react';
import { FaSync, FaSearch, FaUser, FaEnvelope, FaLaptop } from 'react-icons/fa';
import { Table, Pagination, Button, Input, Select } from 'antd';
import './History.css';

const History = () => {
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState<'username' | 'email' | 'userAgent'>('username');

  const fetchLoginHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login-history/`);
      if (!response.ok) {
        throw new Error('Error al obtener el historial');
      }
      const data = await response.json();
      setLoginHistory(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoginHistory();
  }, []);

  const filteredHistory = loginHistory.filter((item: any) => {
    const value = item[searchField];
    return typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase());
  });

  const columns = [
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Dispositivo/Navegador',
      dataIndex: 'userAgent',
      key: 'userAgent',
    },
    {
      title: 'Estado',
      dataIndex: 'success',
      key: 'success',
      render: (success: boolean, record: any) => (
        <span className={success ? 'status-active' : 'status-inactive'}>
          {success ? 'Éxito' : `Fallido (${record.failureReason || 'sin razón'})`}
        </span>
      ),
    },
    {
      title: 'Fecha/Hora',
      dataIndex: 'loginAt',
      key: 'loginAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  if (loading) return <div className="loading">Cargando historial...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="users-content">
      <div className="users-header">
        <div>
          <h2>Historial de Sesiones</h2>
          <p>Registro de actividades de usuarios.</p>
        </div>
        
        <Button
          type="primary"
          icon={<FaSync />}
          onClick={fetchLoginHistory}
          loading={loading}
          className="refresh-button"
        >
          Actualizar
        </Button>
      </div>

      <div className="search-container">
        <div className="search-bar">
          <Select
            defaultValue="username"
            style={{ width: 200 }}
            onChange={(value) => setSearchField(value)}
            options={[
              { value: 'username', label: (
                <span>
                  <FaUser style={{ marginRight: 8 }} />
                  Usuario
                </span>
              ) },
              { value: 'email', label: (
                <span>
                  <FaEnvelope style={{ marginRight: 8 }} />
                  Email
                </span>
              ) },
              { value: 'userAgent', label: (
                <span>
                  <FaLaptop style={{ marginRight: 8 }} />
                  Dispositivo/Navegador
                </span>
              ) },
            ]}
            className="dark-select"
          />
          <Input
            placeholder="Buscar..."
            allowClear
            prefix={<FaSearch style={{ color: '#bbb' }} />}
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            className="dark-input"
          />
        </div>
      </div>
      
      <div className="history-table-container">
        <Table
          className="dark-table"
          columns={columns}
          dataSource={filteredHistory}
          rowKey={(record) => record.loginAt + record.userAgent}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredHistory.length,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            position: ['bottomCenter'],
            style: { marginTop: '16px' },
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default History;
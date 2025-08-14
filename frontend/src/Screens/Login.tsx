// frontend/src/Screens/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginImage from '../assets/images/login.png';

interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Credenciales Incorrectas");
      }

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('username', formData.username);
      localStorage.setItem('userRole', data.user.role); // Guardamos el rol
      navigate('/menu');

    } catch (err) {
      setError("Credenciales Incorrectas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="image-section">
        <div className="totec-overlay">tótec</div>
        <img 
          src={loginImage} 
          alt="Imagen decorativa" 
          className="login-image"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            console.error('Error al cargar la imagen de login');
          }}
        />
      </div>
      
      <div className="form-section">
        <div className="login-container">
          <h1 className="login-title">Plataforma Inteligente de Monitoreo <br/> Agrícola para <span className="highlight-nogal">Nogaleras</span></h1>
          <h2 className="login-subtitle">Inicia sesión para entrar al centro de <br/> gestión y administración</h2>
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
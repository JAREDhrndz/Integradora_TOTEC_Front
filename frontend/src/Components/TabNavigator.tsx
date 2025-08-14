import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TabNavigator.css';
import logo from '../assets/images/logos/icon.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  const closeMobileMenu = () => setIsMenuOpen(false);

  const goToMenu = () => {
    closeMobileMenu();
    navigate('/menu');
  };

  return (
    <header className="navbar-container">
      <div className="navbar">
        <div className="navbar-brand">
          <Link to="/" onClick={closeMobileMenu}>
            <img src={logo} alt="Logo" className="navbar-logo" />
          </Link>
        </div>
        
        {/* Menú desktop */}
        <nav className="navbar-links">
          <Link to="/" onClick={closeMobileMenu}>Inicio</Link>
          {isLoggedIn ? (
            <div className="user-section">
              <span className="username-link" onClick={goToMenu}>
                {username}
              </span>
              <button onClick={handleLogout} className="logout-btn">
                <i className="logout-icon">×</i>
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={closeMobileMenu}>Iniciar Sesión</Link>
          )}
        </nav>

        {/* Botón móvil */}
        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <nav className="navbar-mobile-links">
          <Link to="/" onClick={closeMobileMenu}>Inicio</Link>
          {isLoggedIn ? (
            <div className="mobile-user-section">
              <span className="username-link" onClick={goToMenu}>
                {username}
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={closeMobileMenu}>Login</Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
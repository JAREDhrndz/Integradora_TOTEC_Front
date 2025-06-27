import { useState } from 'react';
import { Link } from 'react-router-dom';
import './TabNavigator.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para cerrar el menú móvil al navegar
  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar-container">
      <div className="navbar">
        <div className="navbar-brand">
          <Link to="/" onClick={closeMobileMenu}>LOGO</Link>
        </div>
        
        {/* Menú desktop */}
        <nav className="navbar-links">
          <Link to="/" onClick={closeMobileMenu}>Inicio</Link>
          <Link to="/servicios" onClick={closeMobileMenu}>Servicios</Link>
          <Link to="/productos" onClick={closeMobileMenu}>Productos</Link>
          <Link to="/login" onClick={closeMobileMenu}>Login</Link>
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
          <Link to="/servicios" onClick={closeMobileMenu}>Servicios</Link>
          <Link to="/productos" onClick={closeMobileMenu}>Productos</Link>
          <Link to="/login" onClick={closeMobileMenu}>Login</Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
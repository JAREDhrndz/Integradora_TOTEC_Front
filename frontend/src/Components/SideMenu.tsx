import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { 
  FaUsers, 
  FaHistory, 
  FaChartLine, 
  FaNetworkWired, 
  FaSignOutAlt,
  FaHome
} from 'react-icons/fa';
import Users from './SideMenuComponents/Users';
import History from './SideMenuComponents/History';
import Data from './SideMenuComponents/Data';
import IOT from './SideMenuComponents/IOT';
import logo from '../../public/assets/icons/logo.png';
import './SideMenu.css';

const SideMenu = () => {
  const location = useLocation();

  // Rutas Absolutas para el menú
  const getMenuPath = (path: string) => {
    return `/menu/${path}`;
  };

  return (
    <div className="side-menu-container">
      {/* Barra lateral - Siempre visible */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        
        <nav className="sidebar-menu">
          <ul>
            <li>
              <Link to="/">
                <FaHome />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link to={getMenuPath("users")} replace>
                <FaUsers />
                <span>Usuarios</span>
              </Link>
            </li>
            <li>
              <Link to={getMenuPath("history")} replace>
                <FaHistory />
                <span>Historial sesión</span>
              </Link>
            </li>
            <li>
              <Link to={getMenuPath("data")} replace>
                <FaChartLine />
                <span>Datos sensores</span>
              </Link>
            </li>
            <li>
              <Link to={getMenuPath("iot")} replace>
                <FaNetworkWired />
                <span>Estado IOT</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-button">
            <FaSignOutAlt />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        <Routes location={location}>
          <Route path="users" element={<Users />} />
          <Route path="history" element={<History />} />
          <Route path="data" element={<Data />} />
          <Route path="iot" element={<IOT />} />
          <Route path="*" element={<div>Seleccione una opción del menú</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default SideMenu;
import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import ConfirmModal from './modal/ConfirmModal';
import { 
  FaUsers, 
  FaHistory, 
  FaChartLine, 
  FaNetworkWired, 
  FaSignOutAlt,
  FaMapMarkedAlt
} from 'react-icons/fa';
import Users from './SideMenuComponents/Users';
import History from './SideMenuComponents/History';
import Data from './SideMenuComponents/Data';
import IOT from './SideMenuComponents/IOT';
import Map from './SideMenuComponents/Map';
import logo from '../assets/images/logos/tótec_logo.png';
import './SideMenu.css';
import { useEffect, useState } from 'react';

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const allItems = [
    { to: "/menu/data", icon: <FaChartLine />, label: "Datos sensores" },
    { to: "/menu/users", icon: <FaUsers />, label: "Usuarios" },
    { to: "/menu/history", icon: <FaHistory />, label: "Historial sesión" },
    { to: "/menu/iot", icon: <FaNetworkWired />, label: "Estado IOT" },
    { to: "/menu/mapa", icon: <FaMapMarkedAlt />, label: "Mapa" },
  ];

  const items = userRole === 'admin' 
    ? allItems 
    : allItems.filter(item => 
        item.label !== "Usuarios" && 
        item.label !== "Historial sesión" && 
        item.label !== "Estado IOT"
      );

  const totalItems = items.length; // Calcula el número de items dinámicamente

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location.pathname === '/menu') {
      navigate('/menu/data', { replace: true });
      return;
    }

    const currentIndex = items.findIndex((item) => 
      !item.external && item.to === location.pathname
    );
    if (currentIndex !== -1) setSelectedIndex(currentIndex);
  }, [location.pathname, navigate]);

  const handleNavigation = (to: string, external: boolean, index: number) => {
    setSelectedIndex(index);
    if (external) {
      window.location.href = to;
    } else {
      navigate(to);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const openLogoutModal = () => {
    setShowModal(true);
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  const confirmLogout = () => {
    setShowModal(false);
    handleLogout();
  };

  return (
    <div className="side-menu-container">
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div 
          className="radio-container"
          style={{ '--total-radio': totalItems } as React.CSSProperties}
        >
          {items.map(({ to, icon, label, external = false }, index) => (
            <div key={label} className="radio-item">
              <input
                id={`menu-${index}`}
                name="menu"
                type="radio"
                checked={selectedIndex === index}
                onChange={() => handleNavigation(to, external, index)}
              />
              <label htmlFor={`menu-${index}`}>
                {icon}
                <span style={{ marginLeft: '10px' }}>{label}</span>
              </label>
            </div>
          ))}
          <div className="glider-container">
            <div
              className="glider"
              style={{ transform: `translateY(${selectedIndex * 100}%)` }}
            />
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={openLogoutModal}>
            <FaSignOutAlt />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="data" replace />} />
          {userRole === 'admin' && (
            <>
              <Route path="users" element={<Users />} />
              <Route path="history" element={<History />} />
              <Route path="iot" element={<IOT />} />
            </>
          )}
          <Route path="data/*" element={<Data />} />
          <Route path="mapa" element={<Map />} /> 
          <Route path="data/map" element={<Map />} />
        </Routes>
      </div>

      <ConfirmModal
        isOpen={showModal}
        title="¿Cerrar sesión?"
        message="¿Estás seguro que deseas cerrar sesión?"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
};

export default SideMenu;
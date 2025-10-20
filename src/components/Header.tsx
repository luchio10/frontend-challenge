import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>MarketPlace</h1>
        </Link>
        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <span className="welcome-text">Hola, {user?.name}</span>
              <button onClick={logout} className="logout-btn">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-link">Iniciar Sesión</Link>
              <Link to="/register" className="auth-link register">Registrarse</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

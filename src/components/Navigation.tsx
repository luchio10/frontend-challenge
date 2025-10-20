import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-list">
          <li>
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Inicio
            </Link>
          </li>
          
          {isAuthenticated && (
            <>
             <li>
                <Link to="/products" className={`nav-link ${isActive('/products')}`}>
                Productos
                </Link>
                </li>
              <li>
                <Link to="/my-products" className={`nav-link ${isActive('/my-products')}`}>
                  Mis Productos
                </Link>
              </li>
              <li>
                <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
                  Perfil
                </Link>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <li>
              <Link to="/about" className={`nav-link ${isActive('/about')}`}>
                Acerca de
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

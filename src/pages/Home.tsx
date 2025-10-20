import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenido a MarketPlace</h1>
          <p className="hero-subtitle">
            La mejor plataforma para comprar y vender tus productos
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <>
                <Link to="/products" className="btn btn-primary">
                  Ver Productos
                </Link>
                <Link to="/my-products" className="btn btn-primary">
                  Mis Productos
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">
                  Comenzar Ahora
                </Link>
                <Link to="/products" className="btn btn-secondary">
                  Explorar Productos
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2>¿Por qué elegirnos?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Fácil de Usar</h3>
              <p>Interfaz intuitiva y fácil de navegar para todos los usuarios</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Seguro</h3>
              <p>Autenticación JWT para proteger tus datos y transacciones</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Rápido</h3>
              <p>Carga rápida y rendimiento optimizado</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Confiable</h3>
              <p>Miles de usuarios confían en nuestra plataforma</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>¿Listo para empezar?</h2>
          <p>Únete a nuestra comunidad y comienza a vender hoy</p>
          {!isAuthenticated && (
            <Link to="/register" className="btn btn-primary btn-large">
              Crear Cuenta Gratis
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

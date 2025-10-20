import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>Acerca de MarketPlace</h1>
        <p className="about-intro">
          Tu plataforma de confianza para comprar y vender productos en línea
        </p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>¿Quiénes Somos?</h2>
          <p>
            MarketPlace es una plataforma moderna diseñada para conectar compradores y vendedores
            de manera segura y eficiente. Nuestra misión es facilitar el comercio electrónico
            proporcionando una interfaz intuitiva y herramientas poderosas.
          </p>
        </section>

        <section className="about-section">
          <h2>Nuestra Tecnología</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <h3>Frontend Moderno</h3>
              <p>Construido con React y TypeScript para una experiencia de usuario excepcional</p>
            </div>
            <div className="tech-card">
              <h3>Backend Robusto</h3>
              <p>Powered by Spring Boot con arquitectura RESTful</p>
            </div>
            <div className="tech-card">
              <h3>Seguridad JWT</h3>
              <p>Autenticación segura con JSON Web Tokens</p>
            </div>
            <div className="tech-card">
              <h3>Diseño Responsivo</h3>
              <p>Funciona perfectamente en todos los dispositivos</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Nuestros Valores</h2>
          <ul className="values-list">
            <li>
              <strong>Confianza:</strong> Construimos relaciones basadas en la transparencia
            </li>
            <li>
              <strong>Innovación:</strong> Mejoramos constantemente nuestra plataforma
            </li>
            <li>
              <strong>Comunidad:</strong> Fomentamos una comunidad de usuarios activa y participativa
            </li>
            <li>
              <strong>Calidad:</strong> Nos comprometemos con la excelencia en todo lo que hacemos
            </li>
          </ul>
        </section>

        <section className="about-section cta-section">
          <h2>¿Listo para Comenzar?</h2>
          <p>
            Únete a miles de usuarios que ya confían en MarketPlace para sus transacciones
          </p>
          <div className="cta-buttons">
            <a href="/register" className="cta-button primary">Crear Cuenta</a>
            <a href="/products" className="cta-button secondary">Ver Productos</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

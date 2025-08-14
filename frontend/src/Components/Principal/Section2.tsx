import './Section2.css';

export default function Section2() {
  return (
    <section className="section2">
      <div className="section2-content">
        <h2>Explora nuestras soluciones</h2>
        
        <div className="features-grid">
          {/* Elemento 1 */}
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Monitoreo en tiempo real</h3>
            <p>Tecnología avanzada para seguimiento preciso</p>
          </div>

          {/* Elemento 2 */}
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Cuidado inteligente</h3>
            <p>Alertas automatizadas para tu cultivo</p>
          </div>

          {/* Elemento 3 */}
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Control móvil</h3>
            <p>Gestiona desde cualquier dispositivo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
import './Footer.css';
import TotecLogo from '../assets/images/logos/tótec_logo.png';
import SynapseLogo from '../assets/images/logos/synapse_logo.png';

export default function Footer() {
  return (
<footer className="footer">
  <div className="footer-container">
    
    {/* SECCIÓN SUPERIOR - LOGOS */}
    <div className="logo-section">
      <div className="logos-container">
        <img src={TotecLogo} alt="Tótec Logo" className="footer-logo" />
        <div className="powered-by-container">
          <span className="powered-by-text">powered by</span>
          <img src={SynapseLogo} alt="Synapse Logo" className="footer-logo" />
        </div>
      </div>
    </div>

    {/* SECCIÓN MEDIA - CONTACTO + MAPA */}
    <div className="content-section">
      <div className="contact-section">
        <h4>Contacto</h4>
        <p>contacto@totec.com</p>
        <p>+52 123 456 7890</p>
        <p>Av. Nogales 123, Hermosillo, México</p>
      </div>

      <div className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.1600933193545!2d-104.62015572494472!3d23.990123179531498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bb833da45df2b%3A0x2392fefbf317535!2sUniversidad%20Tecnol%C3%B3gica%20de%20Durango!5e0!3m2!1ses!2smx!4v1752006333777!5m2!1ses!2smx" 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>

    {/* SECCIÓN INFERIOR - LEGAL */}
    <div className="legal-section">
      <p>© {new Date().getFullYear()} Tótec. Todos los derechos reservados.</p>
      <div className="legal-links">
        <a href="/privacidad">Política de Privacidad</a>
        <a href="/terminos">Términos de Servicio</a>
      </div>
    </div>

  </div>
</footer>
  );
}
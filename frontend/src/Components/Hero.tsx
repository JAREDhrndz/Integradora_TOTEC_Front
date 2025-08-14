// Hero.tsx
import './Hero.css';
import smallImage from '../assets/images/walnut.png'; 
import leftImage from '../assets/images/totec.png'; 
import rightImage from '../assets/images/totec.png'; 

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h3>Plataforma Inteligente de Monitoreo <br></br> Agrícola para Nogaleras</h3>
        <h1>tótec</h1>
        <p>"El guardián de la tierra del nogal"</p>
        <img src={smallImage} alt="Imagen pequeña descriptiva" className="small-image" />
      </div>
      <div className="image-container">
        <img src={leftImage} alt="Imagen izquierda" className="side-image left-image" />
        <img src={rightImage} alt="Imagen derecha" className="side-image right-image" />
      </div>
    </section>
  );
}
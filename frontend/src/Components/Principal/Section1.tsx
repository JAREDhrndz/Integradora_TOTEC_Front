import './Section1.css';
import sectionBg from '../../assets/images/section_one 1.png';

export default function Section1() {
  return (
    <section className="section1" style={{ backgroundImage: `url(${sectionBg})` }}>
      <div className="section1-content">
        <h2>Misión</h2>
        <p>Diseñar soluciones tecnológicas accesibles, inteligentes y adaptables que fortalezcan la seguridad, productividad y sostenibilidad en el sector agrícola, mediante el uso de sensores IoT, visión por computadora y plataformas intuitivas que empoderen a los agricultores con información en tiempo real.</p>
      </div>
    </section>
  );
}
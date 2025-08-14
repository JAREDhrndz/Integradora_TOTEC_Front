import './Section3.css';
import sectionBg from '../../assets/images/section_three.jpg';

export default function Section3() {
  return (
    <section className="section3" style={{ backgroundImage: `url(${sectionBg})` }}>
      <div className="section3-content">
        <h2>Objetivo</h2>
        <p>Implementar una plataforma integral de monitoreo para plantaciones de nogal que permita detectar condiciones críticas como incendios, sequías o intrusiones, mediante el uso de sensores IoT, cámaras inteligentes y alertas automáticas, todo desde una interfaz multiplataforma accesible.
</p>
      </div>
    </section>
  );
}
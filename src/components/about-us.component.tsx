import { motion } from "framer-motion";
import AboutUsImage from "../assets/armarios-1.jpg";

export const AboutUs = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
    return (
        <div className="about-us-container">
      
        <section className="about-us-container">
          <div className="about-us-image">
          <img src={AboutUsImage} alt="armarios" />
            <h1 className="about-us-title">ALUVIPAC</h1>
          </div>
          <div className="about-us-text">
          <motion.div
      initial={{ opacity: 0, x: 100 }} // Estado inicial
      animate={{ opacity: 1, x: 0 }}   // Estado final
      transition={{ duration: 1 }}   // Duración de la animación
    >
            <div className="about-us-content-back">

            </div>

            <div className="about-us-content">
              <h2>¿Quiénes somos?</h2>
              <p>
                En Aluvipac, contamos con 25 años de experiencia brindando
                soluciones en vidrio y aluminio de alta calidad. 
              </p>
              <p>
              Desde nuestra
                sede en Cancún, trabajamos en todo Quintana Roo, ofreciendo a
                profesionales y empresas innovación, puntualidad y un servicio
                personalizado que garantiza la excelencia en cada proyecto.
              </p>
            </div>
            </motion.div>
            <div style={{display: "flex", justifyContent: "center"}}>
              <button className="about-us-button" onClick={() => scrollToSection("quotes")}>Hacer una cotización</button>
            </div>
          </div>
        </section>
      </div>
    );
  };
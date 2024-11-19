import AboutUsImage from "../assets/armarios-1.jpg";

export const AboutUs = () => {
    return (
        <div className="about-us-container">
      
        <section className="about-us-container">
          <div className="about-us-image">
          <img src={AboutUsImage} alt="armarios" />
            <h1 className="about-us-title">ALUVIPAC</h1>
          </div>
          <div className="about-us-text">
            <div className="about-us-content-back">

            </div>
            <div className="about-us-content">
              <h2>¿Quiénes somos?</h2>
              <p>
                En Aluvipac, contamos con 25 años de experiencia brindando
                soluciones en vidrio y aluminio de alta calidad. Desde nuestra
                sede en Cancún, trabajamos en todo Quintana Roo, ofreciendo a
                profesionales y empresas innovación, puntualidad y un servicio
                personalizado que garantiza la excelencia en cada proyecto.
              </p>
            </div>
            <div>
              <button className="about-us-button">Hacer una cotización</button>
            </div>
          </div>
        </section>
      </div>
    );
  };
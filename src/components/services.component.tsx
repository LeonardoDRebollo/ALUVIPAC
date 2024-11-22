import { motion, useInView } from "framer-motion";
import { SetStateAction, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const services = [
  {
    image: "/images/puertas.jpg",
    title: "PUERTAS",
    description: "Instalación de puertas en vidrio y aluminio",
  },
  {
    image: "/images/ventanas.jpg",
    title: "ARMARIOS",
    description: "Instalación de armarios",
  },
  {
    image: "/images/armarios.jpg",
    title: "VENTANAS",
    description: "Instalación de ventanas, el marco puede ser de vidrio o aluminio",
  },
  {
    image: "/images/canceles.jpeg",
    title: "CANCELES",
    description: "Instalación de canceles",
  },
  {
    image: "/images/cocina.jpg",
    title: "COCINA",
    description: "Instalación de cocinas integrales",
  },
  {
    image: "/images/puertas-aluminio.jpg",
    title: "PUERTAS ALUMINIO",
    description: "Instalación de puertas en aluminio",
  },
  {
    image: "/images/barandales.jfif",
    title: "BARANDALES DE ALUMINIO",
    description: "Instalación de barandales en aluminio para escaleras",
  },{
    image: "/images/baños.jfif",
    title: "BAÑOS",
    description: "Instalación de baños y lavabos",
  },



];

export const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0); 
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: (current: SetStateAction<number>) => setActiveIndex(current), 
  };

  return (
    <div className="services" ref={sectionRef}> 
      <div className="services-title">
        <h2 style={{ marginTop: "4%", marginLeft: "4%" }}>Servicios y productos</h2>
      </div>

      <div className="services-container-mobile">
        <Slider {...sliderSettings}>
          {services.map((service, index) => (
            <div key={index}>
              <div
                className={`service-card ${
                  index === activeIndex ? "active" : ""
                }`} 
              >
                <img src={service.image} alt={service.title} />
                <div className="service-content">
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

       <div className="services-container">
        {services.map((service, index) => (
          <motion.div
            className="service-card"
            key={index}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: 1,
              ease: "linear",
              delay: index * 0.4,
            }}
          >
            <img src={service.image} alt={service.title} />
            <div className="service-content">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
 
    </div>
  );
};
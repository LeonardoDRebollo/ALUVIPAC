import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const services = [
  {
    image: "public/images/puertas.jpg",
    title: "PUERTAS",
    description: "Contenido de la sección de puertas",
  },
  {
    image: "public/images/ventanas.jpg",
    title: "ARMARIOS",
    description: "Contenido de la sección de armarios",
  },
  {
    image: "public/images/armarios.jpg",
    title: "VENTANAS",
    description: "Contenido de la sección de ventanas",
  },
  {
    image: "public/images/canceles.jpeg",
    title: "CANCELES",
    description: "Contenido de la sección de canceles",
  },
  {
    image: "public/images/cocina.jpg",
    title: "COCINA",
    description: "Contenido de la sección de cocina",
  },
];

export const Services = () => {
  const sectionRef = useRef(null); 
  const isInView = useInView(sectionRef, { once: true }); 

  return (
    <div className="services" ref={sectionRef}>
      <div className="services-title">
        <h2 style={{ marginTop: "4%", marginLeft: "4%" }}>
          Servicios y productos
        </h2>
      </div>
      <div className="services-container">
        {services.map((service, index) => (
          <motion.div
            className="service-card"
            key={index}
            initial={{ opacity: 0}}
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

import { motion, useInView } from "framer-motion";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface ServiceInterface {
  id_servicio: number;
  imagen: string | null; 
  nombre_servicio: string;
  descripcion_servicio: string;
}


export const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [services, setServices] = useState<ServiceInterface[]>([]);
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

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:8855/api/servicios");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error al cargar los servicios:", error);
    } 
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="services" ref={sectionRef}>
      <div className="services-title">
        <h2 style={{ marginTop: "4%", marginLeft: "4%" }}>
          Servicios y productos
        </h2>
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
                <img src={service.imagen || ""} alt={service.nombre_servicio} />
                <div className="service-content">
                  <h2>{service.nombre_servicio}</h2>
                  <p>{service.descripcion_servicio}</p>
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
    {service.imagen ? (
      <img
        src={`data:image/png;base64,${service.imagen}`} 
        alt={service.nombre_servicio}
      />
    ) : (
      <div>No hay imagen disponible</div>
    )}
    <div className="service-content">
      <h2>{service.nombre_servicio}</h2>
      <p>{service.descripcion_servicio}</p>
    </div>
  </motion.div>
))}

      </div>
    </div>
  );
};

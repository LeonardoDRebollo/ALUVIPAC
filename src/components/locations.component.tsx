import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const Locations = () => {
    const sectionRef = useRef(null); 
    const isInView = useInView(sectionRef, { once: true }); 
  return (
             <motion.div
            initial={{ opacity: 0}}
            animate={isInView ? { opacity: 1 } : {} }
            className="locations-container"
            transition={{
              duration: 1,
              ease: "linear",
            }}
            ref={sectionRef}
          >
      <div className="services-title">
        <h2 style={{ marginTop: "4%", marginLeft: "4%", color: "#080808" }}>
          Nuestra ubicación
        </h2>
      </div>
      <div className="locations-body">
 
            
        <div className="locations-text">
          <div className="locations-text-content1"></div>
          <div className="locations-text-content2">
            <h2>¿En donde estamos ubicados?</h2>
            <p>Cancún, Mexico, 77510</p>
            <p>
              Damos cobertura a: Cancun, Puerto Morelos, Playa del Carmen,
              Tulum, Toda la Riviera Maya
            </p>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <p>Horarios de atención:</p>
              <section className="schedule">
              <div>
                <p>Lunes a Viernes:</p>
                <p>Sabados:</p>
                <p>Domingos:</p>
              </div>
              <div>
                <p>830 am a 7:00 pm</p>
                <p>830 am a 5:00 pm</p>
                <p>Cerrado</p>
              </div>
              </section>

            </div>
          </div>
        </div>
   
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15002.604143852768!2d-86.8461261426594!3d21.18254959231495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2c3e84fa9d43%3A0xa34cbeec33d4fea9!2s77510%20Canc%C3%BAn%2C%20Q.R.!5e1!3m2!1ses!2smx!4v1732068923761!5m2!1ses!2smx"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
      </div>
    
      </motion.div>
  );
};

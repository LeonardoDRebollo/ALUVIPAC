export const services = [
    {
        image: "src/assets/puertas.jpg",
        title: "PUERTAS",
        description: "Contenido de la sección de puertas",
    },
    {
        image: "src/assets/ventanas.jpg",
        title: "ARMARIOS",
        description: "Contenido de la sección de armarios",
    },
    {
        image: "src/assets/armarios.jpg"
        , title: "VENTANAS",
        description: "Contenido de la sección de ventanas",
    },
    {
        image: "src/assets/canceles.jpeg",
        title: "CANCELES",
        description: "Contenido de la sección de canceles",
    },
    {
        image: "src/assets/cocina.jpg",
        title: "COCINA",
        description: "Contenido de la sección de cocina",
    }


]


export const Services = () => {
    return (
        <div className="services">
            <div className="services-title">
                <h2 style={{ marginTop: "4%", marginLeft: "4%" }}>Servicios y productos</h2>
            </div>
            <div className="services-container">
                {services.map((service, index) => (
                    <div className="service-card" key={index}>
                        <img src={service.image} alt={service.title} />
                        <div className="service-content">
                            <h2>{service.title}</h2>
                            <p>{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );

};
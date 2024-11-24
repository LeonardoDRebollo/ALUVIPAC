import { TextField, Autocomplete } from "@mui/material";
import { ServiceInterface } from "./services.component";
import Background from "../assets/puerta_plegable.jpeg";
import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion, useInView } from "framer-motion";
import { enqueueSnackbar } from "notistack";

type CotizacionRequest = {
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  id_servicio: number;
  mensaje?: string | null;
};

export const Pricing = () => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setCorreo] = useState("");
  const [Servicio, setServicio] = useState("");
  const [Mensaje , setMensaje] = useState("");
  const [id_servicio, setid_servicio] = useState(0);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [OtrosServicios, setOtrosServicios] = useState("");
  const [SuccesReponse, setSuccesResponse] = useState(false);
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true });
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const emailDataDefault = {
      to_email: email,
      full_name: nombres + " " + apellidos,
      phone: telefono,
      service: Servicio,
      mensaje: Mensaje 
    };

    const emailData = {
      to_email: email,
      full_name: nombres + " " + apellidos,
      phone: telefono,
      service: OtrosServicios,
    };

    emailjs
      .send(
        "service_b0i453n",
        "template_g1jzqje",
        Servicio != "Otros servicios" ? emailDataDefault : emailData,
        "BUibgAnmSfVl9AqTa"
      )
      .then((_response) => {
        setSuccesResponse(true);
      })
      .catch((error) => {
        console.error("Error al enviar el correo:", error);
        enqueueSnackbar("Hubo un error al enviar el correo: " + error, {
          variant: "error",
        });
      });
  };

  const postCotization = async () => {
    const body: CotizacionRequest = {
      nombres,
      apellidos,
      telefono,
      email,
      id_servicio,
    };
  
    if (Servicio !== "Otros servicios") {
      body.mensaje = Mensaje;
    }
  
    try {
      const response = await fetch("http://localhost:8855/api/cotizaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (response.ok) {
        console.log("Cotización enviada con éxito.");
      } else {
        console.error("Error al enviar la cotización.");
      }
    } catch (error) {
      console.error("Error al enviar la cotización:", error);
    }
  };
  
  

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:8855/api/servicios");
      const data = await response.json();
      const transformedData = data.map((service: any) => ({
        ...service,
        imagenURL: service.imagen
          ? URL.createObjectURL(new Blob([service.imagen]))
          : null,
      }));

      setServices(transformedData);
    } catch (error) {
      enqueueSnackbar("Error al cargar los servicios: " + error, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (SuccesReponse) {
      setTimeout(() => {
        postCotization();
        setSuccesResponse(false);
        setNombres("");
        setApellidos("");
        setTelefono("");
        setCorreo("");
        setServicio("");
      }, 5000);
    }
  }, [SuccesReponse]);

  const formValidation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombres.trim()) {
      enqueueSnackbar("El campo 'nombres' es obligatorio.", { variant: "warning" });
      return;
    }

    if (!apellidos.trim()) {
      enqueueSnackbar("El campo 'apellidos' es obligatorio.", { variant: "warning" });
      return;
    }
  
    // Validar teléfono
    const phoneRegex = /^[0-9]{10,}$/; 
    if (!telefono.trim()) {
      enqueueSnackbar("El campo 'teléfono' es obligatorio.", { variant: "warning" });
      return;
    }
    if (!phoneRegex.test(telefono)) {
      enqueueSnackbar("El teléfono debe contener al menos 10 números válidos.", { variant: "warning" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!email.trim()) {
      enqueueSnackbar("El campo 'email' es obligatorio.", { variant: "warning" });
      return;
    }
    if (!emailRegex.test(email)) {
      enqueueSnackbar("Por favor, introduce un correo electrónico válido.", { variant: "warning" });
      return;
    }
    if (!Servicio.trim()) {
      enqueueSnackbar("El campo 'servicio' es obligatorio.", { variant: "warning" });
      return;
    }
    if (Servicio === "Otros servicios" && !OtrosServicios.trim()) {
      enqueueSnackbar("Por favor, describe los 'Otros servicios'.", { variant: "warning" });
      return;
    }
    handleSendEmail(e);
  };
  

  return (
    <div
      className="pricing-container"
      ref={sectionRef}
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1,
        }}
      />
      <motion.div
        className="pricing-form"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        style={{
          zIndex: 2,
        }}
        transition={{
          duration: 1,
          ease: "linear",
          delay: 0.4,
        }}
      >
        {SuccesReponse ? (
          <motion.div
            className="succes-response"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              ease: "linear",
              delay: 0.4,
            }}
          >
            <CheckCircleIcon sx={{ color: "white", fontSize: "6rem" }} />
            <h3>Correo enviado con exito</h3>
          </motion.div>
        ) : (
          <>
            <h3
              style={{ color: "#fff", fontWeight: "400", marginBottom: "10%" }}
            >
              Envia tu cotización, y nosotros le daremos seguimiento inmediato
            </h3>
            <form className="form-fields" onSubmit={formValidation}>
              <div className="form-fields-row">
                <TextField
                  label="Nombres"
                  variant="outlined"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  fullWidth
                  InputLabelProps={{ style: { color: "#fff" } }}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "#fff",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                  }}
                />
                <TextField
                  label="Apellidos"
                  variant="outlined"
                  fullWidth
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "#fff",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                  }}
                />
              </div>
              <div className="form-fields-row">
                <TextField
                  label="Correo"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setCorreo(e.target.value)}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "#fff",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                  }}
                />
                <TextField
                  label="Teléfono"
                  variant="outlined"
                  fullWidth
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "#fff",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                  }}
                />
              </div>

              <Autocomplete
                disablePortal
                value={Servicio}
                onChange={(_event, value) => {
                  const selectedService = services.find(
                    (service) => service.nombre_servicio === value
                  );
                  if (selectedService) {
                    setServicio(selectedService.nombre_servicio);
                    setid_servicio(selectedService.id_servicio);
                  } else {
                    setServicio(value || "");
                    setid_servicio(0);
                  }
                }}
                id="combo-box-demo"
                options={[
                  ...services.map((service) => service.nombre_servicio),
                  "Otros servicios",
                ]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Servicio"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    sx={{
                      "& .MuiInputBase-root": {
                        color: "#fff",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                    }}
                  />
                )}
              />

              

              {Servicio === "Otros servicios" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "linear",
                  }}
                >
                  <TextField
                    id="filled-multiline-flexible"
                    label="Especifique el servicio"
                    multiline
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setOtrosServicios(e.target.value)}
                    rows={3}
                    InputLabelProps={{ style: { color: "#fff" } }}
                    sx={{
                      "& .MuiInputBase-root": {
                        color: "#fff",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                    }}
                  />
                </motion.div>
              )}

           {Servicio !== "Otros servicios" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "linear",
                  }}
                >
                  <TextField
                    id="filled-multiline-flexible"
                    label="Mensaje *Opcional*"
                    multiline
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setMensaje(e.target.value)}
                    rows={3}
                    InputLabelProps={{ style: { color: "#fff" } }}
                    sx={{
                      "& .MuiInputBase-root": {
                        color: "#fff",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                    }}
                  />
                </motion.div>
              )}

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button className="pricing-button" type="submit">
                  Enviar
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

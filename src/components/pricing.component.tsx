import { TextField, Autocomplete } from "@mui/material";
import { services } from "./services.component";
import Background from "../assets/puerta_plegable.jpeg";
import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion, useInView } from "framer-motion";

export const Pricing = () => {
  const [Nombres, setNombres] = useState("");
  const [Apellidos, setApellidos] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Servicio, setServicio] = useState("");
  const [OtrosServicios, setOtrosServicios] = useState("");
  const [SuccesReponse, setSuccesResponse] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const emailDataDefault = {
      to_email: Correo,
      full_name: Nombres + " " + Apellidos,
      phone: Telefono,
      service: Servicio,
    };

    const emailData = {
      to_email: Correo,
      full_name: Nombres + " " + Apellidos,
      phone: Telefono,
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
        alert("Hubo un error al enviar el correo.");
      });
  };

  useEffect(() => {
    if (SuccesReponse) {
      setTimeout(() => {
        setSuccesResponse(false);
        setNombres("");
        setApellidos("");
        setTelefono("");
        setCorreo("");
        setServicio("");
      }, 5000);
    }
  }, [SuccesReponse]);

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
            <form className="form-fields" onSubmit={handleSendEmail}>
              <div className="form-fields-row">
                <TextField
                  label="Nombres"
                  variant="outlined"
                  value={Nombres}
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
                  value={Apellidos}
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
                  value={Correo}
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
                  value={Telefono}
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
                onChange={(_event, value) =>
                  value !== null && setServicio(value)
                }
                id="combo-box-demo"
                options={[
                  ...services.map((service) => service.title),
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
                    maxRows={4}
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

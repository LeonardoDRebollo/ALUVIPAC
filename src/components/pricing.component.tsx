import { TextField, Autocomplete, Box } from "@mui/material";
import { services } from "./services.component";
import Background from '../assets/puerta_plegable.jpeg';

export const Pricing = () => {
  return (
    <div
      className="pricing-container"
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
      <div
        className="pricing-form"
        style={{
          zIndex: 2, 
        }}
      >
        <h3 style={{ color: "#fff", fontWeight: "400", marginBottom: "10%" }}>Envia tu cotización, y nosotros le daremos seguimiento inmediato</h3>
        <div className="form-fields">
        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField
            label="Nombres"
            variant="outlined"
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
            </Box>
        
            <Box sx={{ display: "flex", gap: 2 , marginBottom: 2 }}>
            <TextField
            label="Correo"
            variant="outlined"
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
            label="Teléfono"
            variant="outlined"
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

            </Box>
          
          <Autocomplete
            disablePortal
            options={services.map((service) => service.title)}
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
             <div style={{display: "flex", justifyContent: "center"}}>
              <button className="pricing-button">Enviar</button>
            </div>
        </div>
      </div>
    </div>
  );
};

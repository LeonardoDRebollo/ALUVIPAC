import { useState, useEffect } from "react";
import Logo from "../assets/logo-comprimido.jpg";
import { Dialog, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

export const Navbar: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false); 

  const menuItems = [
    { label: "Sobre nosotros", id: "about-us" },
    { label: "Servicios y productos", id: "services" },
    { label: "Cotizaciones", id: "quotes" },
    { label: "Ubicación", id: "location" },
    { label: "Login", id: "login" },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      menuItems.forEach((item, index) => {
        const section = document.getElementById(item.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
          if (isVisible) {
            setSelectedIndex(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuItems]);

  return (
    <>
      {/* Navbar */}
      <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-logo">
          <img
            src={Logo}
            alt="logo"
            style={{ display: isScrolled ? "none" : "block" }}
          />
          <p
            style={{
              display: isScrolled ? "block" : "none",
              color: "white",
              fontFamily: "Urbanist",
            }}
          >
            ALUVIPAC
          </p>
        </div>
        <div className="navbar-menu">
          {menuItems.map((item, index) => (
            <span
              key={index}
              className={selectedIndex === index ? "selected" : ""}
              onClick={() => {
                if (item.label === "Login") {
                  setIsLoginDialogOpen(true); 
                } else {
                  setSelectedIndex(index);
                  scrollToSection(item.id);
                }
              }}
            >
              <p>{item.label}</p>
            </span>
          ))}
        </div>
      </div>

      {/* Dialogo de Login */}
      <Dialog
        open={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
        aria-labelledby="login-dialog-title"
      >
        <DialogTitle id="login-dialog-title">Iniciar sesión</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              fullWidth
              margin="normal"
              label="Usuario"
              type="text"
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              type="password"
              variant="outlined"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
              onClick={() => alert("Iniciando sesión...")}
            >
              Iniciar sesión
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

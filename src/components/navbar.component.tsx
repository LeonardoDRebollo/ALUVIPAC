import { useState, useEffect } from "react";
import Logo from "../assets/logo-comprimido.jpg";
import { Dialog, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


interface navbarProps {
  onLoggedIn: () => void;
  onLoggedOut: () => void;
  onCotizaciones: () => void;
  onServicios: () => void;
}
export const Navbar: React.FC<navbarProps> = ({ onLoggedIn, onLoggedOut, onCotizaciones, onServicios }) => {
  const User = "admin";
  const Password = "123";
  const [DigitedUser, setDigitedUser] = useState("");
  const [DigitedPassword, setDigitedPassword] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [LoggedIn, setLoggedIn] = useState(sessionStorage.getItem("LoggedIn") === "true" ? true : false);

  const [BadUser, setBadUser] = useState(false);
  const [BadPassword, setBadPassword] = useState(false);

  const menuItems = [
    { label: "Sobre nosotros", id: "about-us" },
    { label: "Servicios y productos", id: "services" },
    { label: "Cotizaciones", id: "quotes" },
    { label: "Ubicación", id: "location" },
    { label: "Login", id: "login" },
  ];

  const menuItemsAdmin = [
    { label: "Cotizaciones", id: "quotes-admin" },
    { label: "Servicios", id: "services-admin" },
    { label: "Cerrar sesión", id: "login" },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); 
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

  const Login = () => {
    if (DigitedPassword === Password && DigitedUser === User) {
      setDigitedPassword("");
      setDigitedUser("");
      setBadPassword(false);
      setBadUser(false);
      onLoggedIn();
      setLoggedIn(true);
      setSelectedIndex(0);
      setIsLoginDialogOpen(false);

      sessionStorage.setItem("LoggedIn", "true");
    }else{
      setBadPassword(true);
      setBadUser(true);
      setSelectedIndex(0);
    }
  }

  return (
    <>
      {/* Navbar */}
      <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="menu-icon-mobile">
        <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)} >
          {isMenuOpen ? (
            <CloseIcon style={{ color: "white", fontSize: "2rem" }} />
          ) : (
            <MenuIcon style={{ color: "white", fontSize: "2rem" }} />
          )}
        </IconButton>
        </div>
   
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
          {LoggedIn ? (
            menuItemsAdmin.map((item, index) => (
              <span
              key={index}
              className={selectedIndex === index ? "selected" : ""}
              onClick={() => {
                if (item.label === "Cerrar sesión") {
                  setLoggedIn(false);
                  sessionStorage.clear();
                  onLoggedOut();
                } else if(item.label === "Cotizaciones"){
                  onCotizaciones();
                  setSelectedIndex(index);
                }else if(item.label === "Servicios"){
                  setSelectedIndex(index);
                  onServicios();

                }
              }}
            >
              <p>{item.label}</p>
            </span>
        ))
          ):(
            menuItems.map((item, index) => (
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
            ))
          )}
          
          
        </div>
      </div>

       {/* Menú desplegable */}
       <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
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

      {/* Dialogo de Login */}
      <Dialog
        open={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
        aria-labelledby="login-dialog-title"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)",}}
      >
        <DialogTitle id="login-dialog-title">Iniciar sesión</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              fullWidth
              error={BadUser}
              margin="normal"
              label="Usuario"
              type="text"
              value={DigitedUser}
              variant="outlined"
              onChange={(e) => setDigitedUser(e.target.value)}
              helperText={BadUser ? "Usuario incorrecto" : ""}
            />
            <TextField
              fullWidth
              error={BadPassword}
              margin="normal"
              label="Contraseña"
              type="password"
              variant="outlined"
              value={DigitedPassword}
              onChange={(e) => setDigitedPassword(e.target.value)}
              helperText={BadPassword ? "Contraseña incorrecta" : ""}
            />
            <div style={{ display: "flex", justifyContent: "center", fontFamily: "Urbanist", }}>
              <a className="about-us-button" onClick={Login}>Iniciar sesión</a> 
            </div>
          
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

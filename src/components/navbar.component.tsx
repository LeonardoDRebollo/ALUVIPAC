import { useState, useEffect } from "react";
import Logo from "../assets/logo-comprimido.jpg";

export const Navbar: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

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
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
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
              setSelectedIndex(index);
              scrollToSection(item.id);
            }}
          >
            <p>{item.label}</p>
          </span>
        ))}
      </div>
    </div>
  );
};

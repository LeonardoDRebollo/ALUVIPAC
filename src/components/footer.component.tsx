import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { IconButton } from '@mui/material';

export  const Footer = () => {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      };
    return (
        <div className="footer">
            <div className="footer-left">
            <p>© 2023 Aluvipac. Todos los derechos reservados.</p>
            </div>
            <div className="footer-center">
            <p onClick={() => scrollToSection("about-us")}>Sobre nosotros</p>
            <p onClick={() => scrollToSection("services")}>Servicios y productos</p>
            <p onClick={() => scrollToSection("quotes")}>Cotizaciones</p>
            <p onClick={() => scrollToSection("location")}>Ubicación</p>
            </div>
            <div className="footer-right">
              <IconButton href="https://www.facebook.com/ALUVIPAC" target='_blank'>
              <FacebookRoundedIcon sx={{ color: "white" }}/>
              </IconButton>
              <IconButton href="mailto:aluminioyvidriopanoramico@hotmail.com" target='_blank'>
              <MailRoundedIcon sx={{ color: "white" }}/>
              </IconButton>
           
               <IconButton href="https://wa.me/9982538489" target='_blank'>
               <WhatsAppIcon sx={{ color: "white" }}/>
              </IconButton>
             
            </div>
          
        </div>
    );
};
import { AboutUs } from "./components/about-us.component.js";
import { Navbar } from "./components/navbar.component.js";
import './components/components.css';
import { Services } from "./components/services.component.js";
import { Pricing } from "./components/pricing.component.js";
import { Locations } from "./components/locations.component.js";
import { Footer } from "./components/footer.component.js";
import { useState } from "react";
import CotizacionesTable from "./components/table-pricing.component.js";
import ServicesTable from "./components/table-services.component.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("LoggedIn") === "true" ? true : false);
  const [isCotizaciones, setIsCotizaciones] = useState(true);
  const [, setIsServicios] = useState(false);
  const onLoggedOut = () => {
      setLoggedIn(false);
  }
  const onLoggedIn = () => {
      setLoggedIn(true);
  }

  const onCotizaciones = () => {
      setIsCotizaciones(true);
      setIsServicios(false);
  }

  const onServicios = () => {
      setIsCotizaciones(false);
      setIsServicios(true);
  }

  return (
    <div className="App">
      <Navbar onLoggedIn={onLoggedIn} onLoggedOut={onLoggedOut} onCotizaciones={ onCotizaciones} onServicios={onServicios}/>
      {loggedIn ? (
        isCotizaciones ? (
          <section className="AppSection">
          <CotizacionesTable/>
        </section>
        ):(
          <section className="AppSection">
          <ServicesTable />
        </section>
        )
        
      ):(
        <>
         <section id="about-us" className="AppSection">
        <AboutUs />
      </section>
      <section id="services" className="AppSection">
        <Services/>
      </section>
      <section id="quotes" className="AppSection">
        <Pricing/>
      </section>
      <section id="location" className="AppSection">
        <Locations/>
      </section>
        </>
      )}
     
      <section className="AppSection">
        <Footer/>
      </section>
    </div>
  );
}

export default App;

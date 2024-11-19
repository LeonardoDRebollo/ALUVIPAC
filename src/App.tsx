import { AboutUs } from "./components/about-us.component";
import { Navbar } from "./components/navbar.component";
import './components/components.css';
function App() {
  return (
    <>
      <Navbar />
      <section id="about-us">
        <AboutUs />
      </section>
      <section id="services">
        <div className="services"></div>
      </section>
      <section id="quotes">
        <div>Contenido de Cotizaciones</div>
      </section>
      <section id="location">
        <div>Contenido de Ubicación</div>
      </section>
      <section id="login">
        <div>Contenido de Login</div>
      </section>
    </>
  );
}

export default App;

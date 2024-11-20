import { AboutUs } from "./components/about-us.component";
import { Navbar } from "./components/navbar.component";
import './components/components.css';
import { Services } from "./components/services.component";
import { Pricing } from "./components/pricing.component";
import { Locations } from "./components/locations.component";
import { Footer } from "./components/footer.component";
function App() {
  return (
    <div className="App">
      <Navbar />
      <section id="about-us" className="AppSection">
        <AboutUs />
      </section>
      <section id="services" className="AppSection">
        <Services/>
      </section>
      <section id="quotes" className="AppSection">
        <Pricing/>
      </section>
      <section id="location">
        <Locations/>
      </section>
      <section id="login">
        <Footer/>
      </section>
    </div>
  );
}

export default App;

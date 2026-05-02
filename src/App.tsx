import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import OrderSection from './components/OrderSection'
import Footer from './components/Footer'

function App() {
  return (
    <div id="inicio">
      <Navbar />
      <Hero />
      <div id="servicios">
        <Services />
      </div>
      <div id="pedido">
        <OrderSection />
      </div>
      <div id="contacto">
        <Footer />
      </div>
    </div>
  )
}

export default App

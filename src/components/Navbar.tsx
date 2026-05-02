import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="logo">✿ Creaciones <span>Molly's</span></div>
      <button 
        className="hamburger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <a className="nav-link" href="#" onClick={() => setIsOpen(false)}>Inicio</a>
        <a className="nav-link" href="#" onClick={() => setIsOpen(false)}>Servicios</a>
        <a className="nav-link" href="#" onClick={() => setIsOpen(false)}>Redes & contacto</a>
        <a className="nav-link cta" href="#" onClick={() => setIsOpen(false)}>Haz tu pedido</a>
      </div>
    </nav>
  )
}

export default function Footer() {
  return (
    <>
      <div className="redes section">
        <div className="section-label">Encuéntranos</div>
        <div className="section-title" style={{ marginBottom: '16px' }}>Redes sociales & contacto</div>
        <div className="redes-grid">
          <div className="red-tag"><div className="red-dot" style={{ background: '#E4405F' }}></div>Instagram</div>
          <div className="red-tag"><div className="red-dot" style={{ background: '#1877F2' }}></div>Facebook</div>
          <div className="red-tag"><div className="red-dot" style={{ background: '#25D366' }}></div>WhatsApp</div>
          <div className="red-tag"><div className="red-dot" style={{ background: '#EA4335' }}></div>Ubicación</div>
        </div>
      </div>

      <footer>
        <div className="footer-brand">✿ Creaciones <span>Molly's</span></div>
        <div className="footer-copy">© 2026 · Anchetas & Decoraciones con amor 💕</div>
      </footer>
    </>
  )
}

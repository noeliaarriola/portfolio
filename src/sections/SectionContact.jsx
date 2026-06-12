// SectionContact.jsx
export default function SectionContact() {
  return (
    <section id="sec-4" className="section-layout layout-grid">

      <div className="col-left">
        <div className="sec-num">04</div>
        <div className="left-connect-label">LET'S CONNECT</div>
        <div className="copyright-label">© NOEL A. 2026</div>
      </div>

      <div className="col-center">
        <div className="contact-container">
          <h2 className="contact-headline">
            Let's build something<br /><em>meaningful.</em>
          </h2>
          <div className="contact-links">
            <div className="link-item">
              <span className="link-label">EMAIL</span>
              <a href="mailto:noelia.arriola.03@gmail.com" className="contact-link">
                contact me ↗
              </a>
            </div>
            <div className="link-item">
              <span className="link-label">LINKEDIN</span>
              <a
                href="https://www.linkedin.com/in/noelialimp/"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                linkedin.com/in/noelialimp ↗
              </a>
            </div>
            <div className="link-item">
              <span className="link-label">BEHANCE</span>
              <a
                href="https://behance.net/noela"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                behance.net/noela ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-right">
        <div className="right-icon">+</div>
        <div className="back-to-top" id="back-to-top-btn">
          BACK TO TOP ●
        </div>
      </div>

    </section>
  )
}

// SectionContact.jsx
import { Fragment } from 'react'
import { useT } from '../i18n.jsx'

function withBreaks(text) {
  const parts = text.split('\n')
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <br />}
    </Fragment>
  ))
}

export default function SectionContact() {
  const t = useT()
  return (
    <section id="sec-4" className="section-layout layout-grid">

      <div className="col-left">
        <div className="sec-num">04</div>
        <div className="left-connect-label">{t.contact.connect}</div>
        <div className="copyright-label">© NOEL A. 2026</div>
      </div>

      <div className="col-center">
        <div className="contact-container">
          <h2 className="contact-headline">
            {withBreaks(t.contact.headlinePre)}<em>{t.contact.headlineEm}</em>
          </h2>
          <div className="contact-links">
            <div className="link-item">
              <span className="link-label">{t.contact.email}</span>
              <a href="mailto:noelia.arriola.03@gmail.com" className="contact-link">
                {t.contact.contactMe}
              </a>
            </div>
            <div className="link-item">
              <span className="link-label">{t.contact.linkedin}</span>
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
              <span className="link-label">{t.contact.behance}</span>
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
          {t.contact.backToTop}
        </div>
      </div>

    </section>
  )
}

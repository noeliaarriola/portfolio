// SectionHome.jsx
// The landing section. Full viewport, editorial layout with large heading.
// The H1 "THINKING WHILE BUILDING." stays in English across all languages (brand).
// Japanese text translates roughly to: "Experience Design / Simplicity and Human-Centered Design"
import { Fragment } from 'react'
import { useT } from '../i18n.jsx'

export default function SectionHome() {
  const t = useT()
  return (
    <section id="sec-1" className="section-layout layout-grid">

      <div className="col-left">
        <div className="sec-num">01</div>
        <div className="left-bio">
          {t.home.chips.map((chip, i) => (
            <Fragment key={i}>
              <span>{chip}</span>
              {i < t.home.chips.length - 1 && <span className="dot">•</span>}
            </Fragment>
          ))}
        </div>
        <div className="bottom-dot">●</div>
      </div>

      <div className="col-center">
        <div className="hero-date-corner">
          {new Date().toLocaleDateString(t.dateLocale, { year: 'numeric', month: 'long', day: '2-digit' })}
        </div>
        <div className="hero-top">
          <h1 className="giant-heading">
            <span className="word">THINKING</span><br />
            <span className="word">WHILE</span><br />
            <span className="word">BUILDING.</span>
          </h1>
          <p className="hero-tagline">{t.home.tagline}</p>
        </div>

        <div className="hero-cta">
          <button id="cta-view-work" className="cta-btn cta-primary">{t.home.viewWork}</button>
          <button id="cta-contact" className="cta-btn cta-secondary">{t.home.contact}</button>
        </div>
      </div>

      <div className="col-right">
        <div className="right-icon">✳</div>
        <div className="right-jp-text-container">
          <div className="right-jp-text jp-tooltip-wrap">体験の設計
            <span className="jp-tooltip">Experience Design</span>
          </div>
          <div className="right-jp-subtext jp-tooltip-wrap">シンプルさと人間中心のデザイン
            <span className="jp-tooltip">Simplicity and<br /> Human-Centered Design</span></div>
        </div>
        <div className="bottom-dot">●</div>
      </div>

      {/* Mobile/tablet only: the side rails fold away below 900px, so the
          vertical Japanese text from col-right moves to the bottom-left
          corner, smaller (index.css, .mobile-jp). */}
      <div className="mobile-jp" aria-hidden="true">
        <span className="mobile-jp-main">体験の設計</span>
        <span className="mobile-jp-sub">シンプルさと人間中心のデザイン</span>
      </div>

    </section>
  )
}

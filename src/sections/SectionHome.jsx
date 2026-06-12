// SectionHome.jsx
// The landing section. Full viewport, editorial layout with large heading.
// Japanese text translates roughly to: "Experience Design / Simplicity and Human-Centered Design"
export default function SectionHome() {
  return (
    <section id="sec-1" className="section-layout layout-grid">

      <div className="col-left">
        <div className="sec-num">01</div>
        <div className="left-bio">
          <span>UX DESIGNER</span>
          <span className="dot">•</span>
          <span>COMPUTER SCIENCE</span>
          <span className="dot">•</span>
          <span>Argentinian</span>
          <span className="dot">•</span>
          <span>Based in Brazil</span>
          <span className="dot">•</span>
          <span>Always learning</span>
        </div>
        <div className="bottom-dot">●</div>
      </div>

      <div className="col-center">
        <div className="hero-date-corner">
          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}
        </div>
        <div className="hero-top">
          <h1 className="giant-heading">
            <span className="word">THINKING</span><br />
            <span className="word">WHILE</span><br />
            <span className="word">BUILDING.</span>
          </h1>
          <p className="hero-tagline">A UX Design Portfolio by Noelia Limp A.</p>
        </div>

        <div className="hero-cta">
          <button id="cta-view-work" className="cta-btn cta-primary">VIEW WORK ↓</button>
          <button id="cta-contact" className="cta-btn cta-secondary">CONTACT</button>
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

    </section>
  )
}

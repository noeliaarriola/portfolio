// SectionAbout.jsx
// The "about me" section. Two info lists on the left, bio paragraph in the center.
export default function SectionAbout() {
  return (
    <section id="sec-2" className="section-layout layout-grid">

      <div className="col-left">
        <div className="sec-num">02</div>
        <div className="left-info-block">
          <div className="info-group">
            <h4>FOCUS</h4>
            <ul>
              <li>UX Design</li>
              <li>Interaction</li>
              <li>Systems</li>
              <li>Frontend</li>
            </ul>
          </div>
          <div className="divider-dash">—</div>
          <div className="info-group">
            <h4>TOOLS</h4>
            <ul>
              <li>Figma</li>
              <li>Framer</li>
              <li>React</li>
              <li>Spline</li>
            </ul>
          </div>
        </div>
        <div className="bottom-dot">●</div>
      </div>

      <div className="col-center">
        <div className="about-text-container">
          <h2 className="section-headline">
            Precision in<br />every <em>detail.</em>
          </h2>
          <p className="bio-paragraph">
            I believe UX design is not just about how things look, but how they function,
            adapt, and feel. My work lies at the intersection of systematic logic and human
            emotion, translating complex technical frameworks into simple, intuitive, and
            delightful digital experiences.
          </p>
        </div>
        <div className="about-photo-container">
          <canvas id="profile-canvas" data-src="/media/Profile.jpg" className="about-photo" />
        </div>
      </div>

      <div className="col-right">
        <div className="right-icon">+</div>
        <div className="bottom-dot">●</div>
      </div>

    </section>
  )
}

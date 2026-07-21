// SectionAbout.jsx
// The "about me" section. Two info lists on the left, bio paragraph in the center.
import { Fragment } from 'react'
import { useT } from '../i18n.jsx'

// Render a string with "\n" as <br/> line breaks.
function withBreaks(text) {
  const parts = text.split('\n')
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <br />}
    </Fragment>
  ))
}

export default function SectionAbout() {
  const t = useT()
  return (
    <section id="sec-2" className="section-layout layout-grid">

      <div className="col-left">
        <div className="sec-num">02</div>
        <div className="left-info-block">
          <div className="info-group">
            <h4>{t.about.focus}</h4>
            <ul>
              {t.about.focusItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="divider-dash">—</div>
          <div className="info-group">
            <h4>{t.about.tools}</h4>
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
            {withBreaks(t.about.headlinePre)}<em>{t.about.headlineEm}</em>
          </h2>
          <p className="bio-paragraph">
            {t.about.bio}
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

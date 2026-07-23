import Nav from './components/Nav'
import SectionHome from './sections/SectionHome'
import SectionAbout from './sections/SectionAbout'
import SectionProjects from './sections/SectionProjects'
import SectionContact from './sections/SectionContact'
import HoverPreview from './components/HoverPreview'
import useScrollAnimations from './hooks/useScrollAnimations'
import useProfileEffect from './hooks/useProfileEffect'

export default function App() {
  useScrollAnimations()
  useProfileEffect()

  return (
    <>
      {/* Floating image that follows mouse on project hover */}
      <HoverPreview />

      {/* The tall div creates the scroll distance; the sticky-viewport stays fixed */}
      <div className="scroll-height-holder">
        <div className="sticky-viewport">

          <Nav />

          {/* Three.js canvas sits behind everything in the center column */}
          <div className="canvas-grid-container layout-grid">
            <div className="canvas-center">
              <canvas id="three-canvas" />
            </div>
          </div>

          {/* All four sections stack on top of each other; GSAP fades between them */}
          <div className="sections-stack">
            <SectionHome />
            <SectionAbout />
            <SectionProjects />
            <SectionContact />
          </div>

        </div>
      </div>
    </>
  )
}

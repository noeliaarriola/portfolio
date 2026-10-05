// ProjectRow.jsx
// A single row in the projects list. Receives project data as props.
// `thumb` is the row cover; falls back to `image` (the modal cover) if absent.
//
// Hover: the cover gives way to a "wall" of project screens sliding upward
// (the `wall` prop — see PROJECTS in SectionProjects.jsx). The motion itself
// is CSS (index.css, "Project row hover"); this component only sets each
// column's duration so every column moves at a steady speed, whatever the
// thumbnail size.
import { useEffect, useRef } from 'react'

const WALL_SPEED = 20                          // px per second at factor 1
const WALL_FACTORS = [1, 1.45, 0.8, 1.3, 1.1]  // neighbouring columns move at different speeds
const WALL_DELAYS = [0, -6, -11, -3, -8]       // seconds — keeps columns from starting aligned

export default function ProjectRow({ num, name, tags, year, image, thumb, wall, showWall, onClick }) {
  const tagList = tags.split(' / ')
  const cover = thumb || image
  const wallRef = useRef(null)

  useEffect(() => {
    const el = wallRef.current
    if (!el) return
    const tracks = [...el.querySelectorAll('.wall-track')]
    // Each track holds two identical sets and slides by -50%, so one loop
    // travels half its height. Re-measured as images load and on resize.
    const measure = () => {
      tracks.forEach((track, i) => {
        const setHeight = track.scrollHeight / 2
        if (!setHeight) return
        const seconds = setHeight / (WALL_SPEED * WALL_FACTORS[i % WALL_FACTORS.length])
        track.style.setProperty('--wall-dur', `${seconds.toFixed(2)}s`)
      })
    }
    const observer = new ResizeObserver(measure)
    tracks.forEach((track) => observer.observe(track))
    measure()
    return () => observer.disconnect()
  }, [showWall, wall])

  // The row is the control (mouse, tap and keyboard); the "+" is decorative.
  const onKeyDown = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    onClick()
  }

  return (
    <div className="project-row" role="button" tabIndex={0} onClick={onClick} onKeyDown={onKeyDown}>
      <span className="project-num">{num}</span>
      <div className="project-main">
        <span className="project-name">{name}</span>
        <div className="project-meta">
          {tagList.map((tag, i) => (
            <span key={i} className="project-tag">{tag}</span>
          ))}
          <span className="project-year">{year} ↗</span>
        </div>
      </div>
      <div className="project-thumb">
        {cover && <img className="project-cover" src={cover} alt={name} />}
        {showWall && wall && (
          <div className="project-wall" aria-hidden="true" ref={wallRef}>
            <div className="wall-inner">
              {wall.map((col, i) => {
                // One "set" repeats the screens so it is always taller than
                // the thumbnail; the track is two sets, for a seamless loop.
                const set = [...col.shots, ...col.shots]
                return (
                  <div key={i} className={`wall-col wall-col--${col.kind}`}>
                    <div
                      className="wall-track"
                      style={{ '--wall-delay': `${WALL_DELAYS[i % WALL_DELAYS.length]}s` }}
                    >
                      {[...set, ...set].map((src, j) => (
                        <img key={j} src={src} alt="" draggable={false} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <span className="project-open" aria-hidden="true">
        <span className="project-open-icon">+</span>
      </span>
    </div>
  )
}

// ProjectModal.jsx
// Full-screen case study modal for each project.
// Rendered via createPortal in SectionProjects so it lives outside the GSAP-
// controlled section stack and is never clipped by sec-3's autoAlpha: 0.
//
// Open  → overlay fades in, panel slides up from bottom  (power4.out)
// Close → panel slides down, overlay fades out            (power4.in)
//
// Content structure (4 sections, fill in when ready):
//   content.problem   → Product & Problem
//   content.role      → My Role & Contribution
//   content.decisions → Key Design Decisions
//   content.outcome   → The Outcome
import { useEffect, useRef } from 'react'

// title: the bold DM Sans part
// accent: the PP Editorial New italic word appended after
const SECTIONS = [
  { key: 'problem',   num: '01', label: 'Product',        title: 'The Problem',         accent: 'Worth Solving' },
  { key: 'role',      num: '02', label: 'Team & Process', title: 'My Role &',            accent: 'Contribution' },
  { key: 'decisions', num: '03', label: 'Design Craft',   title: 'Key Design',           accent: 'Decisions' },
  { key: 'outcome',   num: '04', label: 'Impact',         title: 'The',                  accent: 'Outcome' },
]

export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef()
  const panelRef   = useRef()

  // Animate in when project changes to a non-null value
  useEffect(() => {
    const { gsap } = window
    if (!gsap || !project) return

    // Lock page scroll while modal is open
    document.documentElement.style.overflow = 'hidden'

    gsap.fromTo(overlayRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.35, ease: 'power2.out' }
    )
    gsap.fromTo(panelRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.65, ease: 'power4.out' }
    )

    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [project])

  const handleClose = () => {
    const { gsap } = window
    document.documentElement.style.overflow = ''

    if (!gsap) { onClose(); return }

    gsap.to(panelRef.current, {
      yPercent: 100,
      duration: 0.5,
      ease: 'power4.in',
    })
    gsap.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.35,
      delay: 0.18,
      onComplete: onClose,
    })
  }

  // Close on Escape key
  useEffect(() => {
    if (!project) return
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project])

  if (!project) return null

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleClose}>
      <div className="modal-panel" ref={panelRef} onClick={e => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="modal-header-num">{project.num}</span>
            <div className="modal-header-tags">
              {project.tags.split(' / ').map((tag, i) => (
                <span key={i} className="modal-header-tag">{tag}</span>
              ))}
              <span className="modal-header-year">{project.year}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close">
            <span>✕</span>
          </button>
        </div>

        {/* ── Project title ── */}
        <div className="modal-title-row">
          <h2 className="modal-title">{project.name}</h2>
          {project.subtitle && (
            <p className="modal-subtitle">{project.subtitle}</p>
          )}
          {project.tech && (
            <div className="modal-tech">
              {project.tech.map((t) => <span key={t}>{t}</span>)}
            </div>
          )}
          {project.link && (
            <a
              className="modal-project-link"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
            </a>
          )}
        </div>

        {/* ── Cover image placeholder ── */}
        {project.image && (
          <div className="modal-cover">
            <img src={project.image} alt={project.name} />
          </div>
        )}

        {/* ── 4-section body ── */}
        <div className="modal-body">
          {SECTIONS.map(({ key, num, label, title, accent }) => (
            <div className="modal-section" key={key}>
              <div className="modal-section-header">
                <span className="modal-section-num">{num}</span>
                <span className="modal-section-label">{label}</span>
              </div>
              <h3 className="modal-section-title">
                {title} <em>{accent}</em>
              </h3>
              <div className="modal-section-divider" />
              <div className="modal-section-text">
                {project.content?.[key]
                  ? project.content[key]
                  : <span className="modal-placeholder">— Content coming soon</span>
                }
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer close ── */}
        <div className="modal-footer">
          <button className="modal-footer-close" onClick={handleClose}>
            Close ✕
          </button>
        </div>

      </div>
    </div>
  )
}

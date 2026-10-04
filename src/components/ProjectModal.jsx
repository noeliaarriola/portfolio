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
import { useT, useLang } from '../i18n.jsx'

const SECTION_KEYS = ['problem', 'role', 'decisions', 'outcome']
const SECTION_NUMS = { problem: '01', role: '02', decisions: '03', outcome: '04' }

export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef()
  const panelRef   = useRef()
  const t = useT()
  const { lang } = useLang()

  // Content can be flat ({problem,role,...}) or per-language ({en:{...},es,pt}).
  // Fall back to English when a language hasn't been translated yet.
  const body = project?.content?.en
    ? (project.content[lang] || project.content.en)
    : project?.content

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
      // Locking/unlocking overflow can remove or restore the scrollbar,
      // shifting layout width slightly — enough to desync ScrollTrigger's
      // cached page-height measurement (same class of issue as on initial
      // load; see useScrollAnimations.js). Refresh it so the main page's
      // scroll animation doesn't go stale after visiting a project.
      window.ScrollTrigger?.refresh()
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
      onComplete: () => {
        onClose()
        window.ScrollTrigger?.refresh()
      },
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

        {/* ── Cover: looping motion graphic when project.video is set, else image ── */}
        {(project.video || project.image) && (
          <div className="modal-cover">
            {project.video ? (
              <video
                src={project.video}
                poster={project.image}
                aria-label={project.name}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img src={project.image} alt={project.name} />
            )}
          </div>
        )}

        {/* ── 4-section body ── */}
        <div className="modal-body">
          {SECTION_KEYS.map((key) => {
            const s = t.modal.sections[key]
            return (
              <div className="modal-section" key={key}>
                <div className="modal-section-header">
                  <span className="modal-section-num">{SECTION_NUMS[key]}</span>
                  <span className="modal-section-label">{s.label}</span>
                </div>
                <h3 className="modal-section-title">
                  {s.title} <em>{s.accent}</em>
                </h3>
                <div className="modal-section-divider" />
                <div className="modal-section-text">
                  {body?.[key]
                    ? body[key]
                    : <span className="modal-placeholder">{t.modal.soon}</span>
                  }
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Footer close ── */}
        <div className="modal-footer">
          <button className="modal-footer-close" onClick={handleClose}>
            {t.modal.close}
          </button>
        </div>

      </div>
    </div>
  )
}

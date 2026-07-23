import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { useT, LanguageSwitch } from '../i18n.jsx'

export default function Nav() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className={'nav-grid layout-grid' + (open ? ' is-open' : '')}>
      <div className="nav-left">NOEL A.</div>

      {/* Desktop: inline links. Mobile: dropdown panel toggled by the hamburger. */}
      <div className="nav-center">
        <a href="#" className="nav-link active" id="link-home" onClick={close}>{t.nav.home}</a>
        <a href="#" className="nav-link" id="link-about" onClick={close}>{t.nav.about}</a>
        <a href="#" className="nav-link" id="link-projects" onClick={close}>{t.nav.projects}</a>
        <a href="#" className="nav-link" id="link-contact" onClick={close}>{t.nav.contact}</a>

        {/* Language switch lives inside the menu on mobile (safe to duplicate: context-driven) */}
        <div className="nav-menu-lang"><LanguageSwitch /></div>
      </div>

      <div className="nav-right">
        <div className="nav-bar-lang"><LanguageSwitch /></div>
        <ThemeToggle />
        <button
          className={'nav-hamburger' + (open ? ' is-open' : '')}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

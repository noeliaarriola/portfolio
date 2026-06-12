import { useState } from 'react'

const SunSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="19" x2="12" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="2" y1="12" x2="5" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="19" y1="12" x2="22" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="19.78" y1="4.22" x2="17.66" y2="6.34" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="6.34" y1="17.66" x2="4.22" y2="19.78" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const MoonSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    <circle cx="17" cy="4.5" r="1" fill="black" />
    <circle cx="20" cy="8" r="0.7" fill="black" />
  </svg>
)

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  )

  const toggle = () => {
    setDark(prev => {
      const next = !prev
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
      localStorage.setItem('theme', next ? 'dark' : 'light')
      document.dispatchEvent(new CustomEvent('themechange', { detail: { dark: next } }))
      return next
    })
  }

  return (
    <button
      className={`theme-toggle-pill ${dark ? 'is-dark' : 'is-light'}`}
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="toggle-knob">
        {dark ? <MoonSVG /> : <SunSVG />}
      </span>
    </button>
  )
}

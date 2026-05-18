import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const links = [
    ['problem', 'The Problem'],
    ['how-it-works', 'Process'],
    ['who-we-serve', 'Clients'],
    ['impact', 'Impact'],
    ['faq', 'FAQ'],
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="nav">
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => go('hero')}>
          <div className="logo-mark">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="url(#logoGrad)" />
              <path d="M14 6C14 6 8 13 8 17a6 6 0 1012 0c0-4-6-11-6-11z" fill="white" opacity="0.9" />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
                  <stop offset="0%" stopColor="#16a34a" />
                  <stop offset="100%" stopColor="#0d7a34" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">Bio<span className="logo-accent">Cycle</span></span>
        </div>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
          <button className="nav-cta" onClick={() => go('schedule')}>
            Schedule Pickup
          </button>
        </div>

        <button className="nav-cta desktop-cta" onClick={() => go('schedule')}>
          Schedule Pickup
        </button>

        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={open ? 'rotated-1' : ''} />
          <span className={open ? 'hidden' : ''} />
          <span className={open ? 'rotated-2' : ''} />
        </button>
      </div>
    </nav>
  )
}

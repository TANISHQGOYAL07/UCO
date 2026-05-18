import React from 'react'

export default function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill="#16a34a" />
                <path d="M14 6C14 6 8 13 8 17a6 6 0 1012 0c0-4-6-11-6-11z" fill="white" opacity="0.9" />
              </svg>
              <span className="footer-logo-text">Bio<span>Cycle</span></span>
            </div>
            <p className="footer-tagline">
              India's trusted used cooking oil collection network. CPCB certified.
              Free doorstep pickup. Converting waste into clean biofuel since 2024.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              {[['problem', 'The Problem'], ['how-it-works', 'Process'], ['who-we-serve', 'Clients'], ['impact', 'Impact'], ['faq', 'FAQ'], ['schedule', 'Schedule Pickup']].map(([id, label]) => (
                <li key={id}><a href="#" onClick={(e) => { e.preventDefault(); go(id) }}>{label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>We Collect From</h4>
            <ul>
              {['Restaurants', 'Hotels & Banquets', 'Dhabas', 'Cloud Kitchens', 'Canteens', 'Households'].map((t) => (
                <li key={t}><span>{t}</span></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li>📞 +91 70155 46885</li>
              <li>✉️ hello@biocycle.in</li>
              <li>📍 Gurgaon, Haryana, India</li>
              <li style={{ marginTop: 12, opacity: 0.6, fontSize: '0.82rem' }}>Mon – Sat · 8 AM – 7 PM IST</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BioCycle Pvt. Ltd. All rights reserved. CPCB Reg. No. BC/2024/UCO/HR</p>
          <div className="footer-badges">
            <span className="footer-badge">🌿 Carbon Neutral</span>
            <span className="footer-badge">🔒 SSL Secured</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

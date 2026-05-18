import React from 'react'

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="hero">
      <div className="hero-grid-bg" />

      <div className="hero-particles">
        {Array.from({ length: 14 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--size': `${Math.random() * 50 + 12}px`,
              '--delay': `${Math.random() * 8}s`,
              '--duration': `${Math.random() * 12 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="hero-split">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            CPCB Certified · Pan-India Operations
          </div>

          <h1 className="hero-title">
            Your Used Cooking Oil
            <br />
            <span className="hero-gradient-text">Deserves a Second Life</span>
          </h1>

          <p className="hero-subtitle">
            Free doorstep pickup from restaurants, hotels & households across India.
            We convert waste oil into certified biofuel — turning pollution into power.
          </p>

          <div className="hero-actions">
            <button className="btn-hero-primary" onClick={() => go('schedule')}>
              <span className="btn-icon">→</span>
              Schedule Free Pickup
            </button>
            <button className="btn-hero-outline" onClick={() => go('how-it-works')}>
              See How It Works
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-avatars">
              {['🧑‍🍳', '👨‍🍳', '👩‍🍳', '🧑‍🔧'].map((e, i) => (
                <div key={i} className="trust-avatar" style={{ '--i': i }}>{e}</div>
              ))}
            </div>
            <div className="trust-text">
              <strong>500+ establishments</strong> already partner with us
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img src="/hero-illustration.png" alt="BioCycle UCO Collection Process" className="hero-image" />
        </div>
      </div>

      {/* Stats strip */}
      <div className="hero-stats-strip">
        {[
          { value: '70,000+ L', label: 'Oil Collected' },
          { value: '10+', label: 'Cities Active' },
          { value: '175 Tons', label: 'CO₂ Prevented' },
          { value: '< 24h', label: 'Response Time' },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="hero-scroll-hint" onClick={() => go('problem')}>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

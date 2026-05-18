import React from 'react'

const features = [
  { icon: '💰', title: 'Completely Free', desc: 'Zero charges for pickup, transport, or containers. For bulk volumes, we pay you.' },
  { icon: '⚡', title: 'Same-Day Response', desc: 'Book before noon — pickup confirmed the same day across all active cities.' },
  { icon: '📋', title: 'CPCB & FSSAI Compliant', desc: 'Every operation meets Central Pollution Control Board and food safety standards.' },
  { icon: '🔍', title: 'Full Traceability', desc: 'Track exactly where your oil goes with blockchain-verified traceability reports.' },
  { icon: '📊', title: 'Carbon Credit Reports', desc: 'Verified carbon offset certificates for your CSR filings and ESG disclosures.' },
  { icon: '📱', title: 'WhatsApp-First Booking', desc: 'No app download needed. Schedule, track, and receive updates on WhatsApp.' },
]

export default function WhyChooseUs() {
  return (
    <section className="section why-section" id="why">
      <div className="container">
        <div className="why-layout">
          <div className="why-left">
            <span className="section-tag">Why BioCycle</span>
            <h2 className="section-heading">
              The Most <span className="text-green">Trusted</span> UCO Collection Network in India
            </h2>
            <p className="section-desc" style={{ marginBottom: 32 }}>
              We combine technology, certified logistics, and transparent processes 
              to make responsible oil disposal effortless.
            </p>
            <div className="why-trust-badges">
              <div className="trust-badge-item">
                <span>🏅</span> CPCB Registered
              </div>
              <div className="trust-badge-item">
                <span>🌿</span> Carbon Neutral Ops
              </div>
              <div className="trust-badge-item">
                <span>🔒</span> Data Encrypted
              </div>
            </div>
          </div>

          <div className="why-right">
            {features.map((f, i) => (
              <div key={i} className="why-card">
                <div className="why-card-icon">{f.icon}</div>
                <div className="why-card-body">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

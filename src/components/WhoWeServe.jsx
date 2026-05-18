import React from 'react'

const clients = [
  { icon: '🍽️', title: 'Restaurants', volume: '50–500 L/month', desc: 'Fine dining to QSR chains with weekly scheduled routes.' },
  { icon: '🍢', title: 'Dhabas & Street Food', volume: '100–800 L/month', desc: 'High-volume fryers needing reliable, frequent collections.' },
  { icon: '🏨', title: 'Hotels & Banquets', volume: '200–2000 L/month', desc: 'Large-scale kitchens with daily output and compliance needs.' },
  { icon: '🏫', title: 'Institutional Canteens', volume: '80–400 L/month', desc: 'School, college & corporate mess with recurring schedules.' },
  { icon: '🏠', title: 'Residential Societies', volume: '10–50 L/month', desc: 'Monthly drives in apartment complexes. Every litre counts.' },
  { icon: '☁️', title: 'Cloud Kitchens', volume: '100–600 L/month', desc: 'India\'s fastest-growing segment — 100+ partners already.' },
]

export default function WhoWeServe() {
  return (
    <section className="section serve-section" id="who-we-serve">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Who We Serve</span>
          <h2 className="section-heading">
            Built for <span className="text-green">Every Kitchen</span> in India
          </h2>
          <p className="section-desc">From roadside stalls to five-star hotel kitchens — if you fry, we collect.</p>
        </div>

        <div className="serve-grid">
          {clients.map((c, i) => (
            <div key={i} className="serve-card">
              <div className="serve-card-top">
                <span className="serve-icon">{c.icon}</span>
                <span className="serve-volume">{c.volume}</span>
              </div>
              <h3 className="serve-title">{c.title}</h3>
              <p className="serve-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

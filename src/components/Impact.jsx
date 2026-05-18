import React from 'react'
import useCounter from '../hooks/useCounter'
import useInView from '../hooks/useInView'

const stats = [
  { target: 70000, suffix: '+', unit: 'Litres', label: 'UCO Collected', icon: '🫙' },
  { target: 196000, suffix: '', unit: 'kg', label: 'CO₂ Prevented', icon: '🌿' },
  { target: 500, suffix: '+', unit: '', label: 'Partner Outlets', icon: '🤝' },
  { target: 7900, suffix: '+', unit: '', label: 'Trees Equivalent', icon: '🌳' },
]

const sdgs = [
  { num: '7', label: 'Affordable & Clean Energy', color: '#fcc30b' },
  { num: '12', label: 'Responsible Consumption', color: '#bf8b2e' },
  { num: '13', label: 'Climate Action', color: '#3f7e44' },
  { num: '14', label: 'Life Below Water', color: '#0a97d9' },
]

function StatCard({ stat, active }) {
  const n = useCounter(stat.target, 2400, active)
  return (
    <div className="impact-card">
      <div className="impact-card-icon">{stat.icon}</div>
      <div className="impact-card-number">
        {n.toLocaleString('en-IN')}{stat.suffix}
        {stat.unit && <span className="impact-unit"> {stat.unit}</span>}
      </div>
      <div className="impact-card-label">{stat.label}</div>
    </div>
  )
}

export default function Impact() {
  const [ref, inView] = useInView(0.15)

  return (
    <section className="section impact-section" id="impact" ref={ref}>
      <div className="impact-bg-dots" />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-header center">
          <span className="section-tag light">Our Impact</span>
          <h2 className="section-heading light">
            Measurable <span className="text-amber">Environmental</span> Change
          </h2>
          <p className="section-desc light">
            Every litre of oil you give us creates verified, trackable environmental impact.
          </p>
        </div>

        <div className="impact-grid">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} active={inView} />
          ))}
        </div>

        <div className="sdg-bar">
          <p className="sdg-label">Contributing to UN Sustainable Development Goals</p>
          <div className="sdg-chips">
            {sdgs.map((s) => (
              <div key={s.num} className="sdg-chip">
                <span className="sdg-num" style={{ background: s.color }}>{s.num}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

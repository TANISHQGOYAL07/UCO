import React from 'react'

const problems = [
  {
    icon: '🚰',
    title: 'Drain Blockages',
    stat: '₹12,000 Cr',
    statLabel: 'annual municipal repair cost',
    desc: 'Oil solidifies in sewer pipes, causing widespread blockages and expensive citywide repairs.',
  },
  {
    icon: '💧',
    title: 'Water Contamination',
    stat: '1 Million L',
    statLabel: 'water destroyed per litre of oil',
    desc: 'A single litre of cooking oil can permanently contaminate up to 1 million litres of freshwater.',
  },
  {
    icon: '🌱',
    title: 'Soil Degradation',
    stat: '40%',
    statLabel: 'nutrient absorption blocked',
    desc: 'Dumped oil coats soil particles, blocking oxygen and nutrients from reaching plant roots.',
  },
  {
    icon: '💨',
    title: 'Toxic Emissions',
    stat: '2.8 kg CO₂',
    statLabel: 'emitted per litre burned',
    desc: 'Burning waste oil releases carcinogenic fumes and particulates into residential areas.',
  },
]

export default function Problem() {
  return (
    <section className="section problem-section" id="problem">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">The Problem</span>
          <h2 className="section-heading">
            Improper Disposal is <span className="text-red">Devastating</span> Our Environment
          </h2>
          <p className="section-desc">
            India generates over 23 million tonnes of used cooking oil every year. Most of it ends up in drains, landfills, or is illegally resold.
          </p>
        </div>

        <div className="problem-grid">
          {problems.map((p, i) => (
            <div key={i} className="problem-card">
              <div className="problem-card-icon">{p.icon}</div>
              <h3 className="problem-card-title">{p.title}</h3>
              <div className="problem-card-stat">
                <span className="problem-stat-num">{p.stat}</span>
                <span className="problem-stat-label">{p.statLabel}</span>
              </div>
              <p className="problem-card-desc">{p.desc}</p>
              <div className="problem-card-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

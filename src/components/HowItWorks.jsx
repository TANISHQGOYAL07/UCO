import React from 'react'

const steps = [
  {
    num: '01',
    title: 'Schedule Pickup',
    desc: 'Book a free pickup via our form or WhatsApp. Choose your preferred date and time slot.',
    detail: 'No app download required',
    icon: '📅',
  },
  {
    num: '02',
    title: 'We Collect',
    desc: 'Our certified team arrives at your doorstep with clean, leak-proof sealed containers.',
    detail: 'Trained & insured handlers',
    icon: '🚛',
  },
  {
    num: '03',
    title: 'Quality Testing',
    desc: 'Oil is lab-tested for FFA percentage, moisture content, and impurities at our facility.',
    detail: 'ISO-certified lab process',
    icon: '🔬',
  },
  {
    num: '04',
    title: 'Biofuel Conversion',
    desc: 'Refined oil is converted into B20 biodiesel — clean, renewable fuel for transportation.',
    detail: 'Zero waste process',
    icon: '⚡',
  },
  {
    num: '05',
    title: 'Certificate Issued',
    desc: 'Receive a CPCB-compliant traceability certificate proving your environmental contribution.',
    detail: 'Valid for CSR & ESG audits',
    icon: '📋',
  },
]

export default function HowItWorks() {
  return (
    <section className="section howitworks-section" id="how-it-works">
      <div className="container">
        <div className="hiw-top">
          <div className="section-header">
            <span className="section-tag">Our Process</span>
            <h2 className="section-heading">
              From Kitchen to <span className="text-green">Clean Energy</span>
            </h2>
            <p className="section-desc">A transparent, end-to-end process you can trust.</p>
          </div>
          <div className="hiw-image-wrapper">
            <img src="/process-illustration.png" alt="Circular economy of used cooking oil" className="hiw-image" />
          </div>
        </div>

        <div className="hiw-cards-grid">
          {steps.map((s, i) => (
            <div key={i} className="hiw-card">
              <div className="hiw-card-num">{s.num}</div>
              <div className="hiw-card-icon">{s.icon}</div>
              <h3 className="hiw-card-title">{s.title}</h3>
              <p className="hiw-card-desc">{s.desc}</p>
              <span className="hiw-card-detail">✓ {s.detail}</span>
              {i < steps.length - 1 && <div className="hiw-card-connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

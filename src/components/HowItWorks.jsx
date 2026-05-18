import React from 'react'

const steps = [
  {
    num: '01',
    title: 'Schedule Pickup',
    desc: 'Book a free pickup via our form or WhatsApp. Choose your preferred date and time slot.',
    detail: 'No app download required',
  },
  {
    num: '02',
    title: 'We Collect',
    desc: 'Our certified team arrives at your doorstep with clean, leak-proof sealed containers.',
    detail: 'Trained & insured handlers',
  },
  {
    num: '03',
    title: 'Quality Testing',
    desc: 'Oil is lab-tested for FFA percentage, moisture content, and impurities at our facility.',
    detail: 'ISO-certified lab process',
  },
  {
    num: '04',
    title: 'Biofuel Conversion',
    desc: 'Refined oil is converted into B20 biodiesel — clean, renewable fuel for transportation.',
    detail: 'Zero waste process',
  },
  {
    num: '05',
    title: 'Certificate Issued',
    desc: 'Receive a CPCB-compliant traceability certificate proving your environmental contribution.',
    detail: 'Valid for CSR & ESG audits',
  },
]

export default function HowItWorks() {
  return (
    <section className="section howitworks-section" id="how-it-works">
      <div className="container">
        <div className="section-header center">
          <span className="section-tag">Our Process</span>
          <h2 className="section-heading">
            From Kitchen to <span className="text-green">Clean Energy</span>
          </h2>
          <p className="section-desc">A transparent, end-to-end process you can trust.</p>
        </div>

        <div className="steps-timeline">
          <div className="timeline-line" />
          {steps.map((s, i) => (
            <div key={i} className={`step-row ${i % 2 === 1 ? 'reverse' : ''}`}>
              <div className="step-content">
                <div className="step-num-badge">{s.num}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
                <span className="step-detail">✓ {s.detail}</span>
              </div>
              <div className="step-dot">
                <div className="dot-inner" />
              </div>
              <div className="step-spacer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

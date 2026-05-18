import { useState } from 'react'

const faqs = [
  { q: 'Is the pickup really free?', a: 'Yes, 100% free. We collect your UCO at no cost whatsoever. Depending on quantity and quality, we may also offer payment for your oil — making it a revenue source for your kitchen.' },
  { q: 'What is the minimum quantity for collection?', a: 'We collect from as little as 5 litres for households up to thousands of litres for commercial kitchens. There is no minimum limit — every drop matters.' },
  { q: 'What happens to the oil after collection?', a: 'Your UCO is transported to our certified facility, lab-tested for FFA percentage and moisture content, then processed into B20 biodiesel. You receive a traceability certificate as proof.' },
  { q: 'Which cities do you currently serve?', a: 'We actively serve Gurgaon, Delhi NCR, Mumbai, Pune, Nagpur, Ahmedabad, Vadodara, Goa, Kolhapur, Prayagraj — and are rapidly expanding. Enter your pincode on our site to check availability.' },
  { q: 'How should I store oil before pickup?', a: 'Store it in any clean, sealed container — bottles, cans, drums, or the containers we provide. Keep away from direct sunlight. We collect on your scheduled date, no hassle.' },
  { q: 'Can I get a compliance certificate?', a: 'Absolutely. Every commercial pickup comes with a CPCB-compliant traceability certificate, valid for food safety audits, FSSAI inspections, and ESG/CSR reporting.' },
  { q: 'Why should I not pour oil down the drain?', a: '1 litre of cooking oil can contaminate up to 1 million litres of drinking water. It solidifies in pipes causing sewage blockages, and can lead to serious municipal fines for commercial establishments.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="faq-layout">
          <div className="faq-left">
            <span className="section-tag">FAQ</span>
            <h2 className="section-heading">
              Questions? <span className="text-green">Answered.</span>
            </h2>
            <p className="section-desc">
              Everything you need to know about UCO collection with BioCycle.
            </p>
            <div className="faq-contact-box">
              <p>Still have questions?</p>
              <a
                href="https://wa.me/917015546885?text=Hi%2C%20I%20have%20a%20question%20about%20BioCycle"
                target="_blank"
                rel="noopener noreferrer"
                className="faq-wa-btn"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="faq-right">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="faq-q-text">{f.q}</span>
                  <span className="faq-chevron">{open === i ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

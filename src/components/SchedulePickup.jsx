import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '../supabaseClient'

export default function SchedulePickup() {
  const blank = { name: '', type: 'Restaurant', phone: '', city: '', address: '', quantity: '', date: '' }
  const [form, setForm] = useState(blank)
  const [done, setDone] = useState(false)
  const [saving, setSaving] = useState(false)

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)

    // Save to Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        // Save as a supplier
        await supabase.from('suppliers').upsert({
          id: `SUP-${Date.now()}`,
          name: form.name,
          type: form.type,
          contact: form.phone,
          address: `${form.address}, ${form.city}`,
          avg_monthly_oil: Number(form.quantity) || 0,
          status: 'Active',
        })

        // Save as a scheduled pickup
        await supabase.from('pickups').insert({
          id: `PK-${Date.now()}`,
          supplier_name: form.name,
          quantity: Number(form.quantity) || 0,
          pickup_date: form.date || new Date().toISOString().split('T')[0],
          status: 'Scheduled',
          collector: 'Unassigned',
          price_paid: 0,
          quality_ffa: 0,
        })
      } catch (err) {
        console.error('Supabase save error:', err)
      }
    }

    // Also send via WhatsApp
    const msg =
      `🫙 *BIOCYCLE — UCO PICKUP REQUEST*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `🏢 *Type:* ${form.type}\n` +
      `📞 *Phone:* ${form.phone}\n` +
      `🏙️ *City:* ${form.city}\n` +
      `📍 *Address:* ${form.address}\n` +
      `💧 *Est. Quantity:* ${form.quantity || 'Not specified'} Litres\n` +
      `📅 *Preferred Date:* ${form.date || 'Flexible'}\n\n` +
      `Please confirm this pickup. Thank you!`
    window.open(`https://wa.me/917015546885?text=${encodeURIComponent(msg)}`, '_blank')

    setSaving(false)
    setDone(true)
    setTimeout(() => { setDone(false); setForm(blank) }, 6000)
  }

  return (
    <section className="section schedule-section" id="schedule">
      <div className="container">
        <div className="schedule-layout">
          <div className="schedule-left">
            <span className="section-tag">Book Now</span>
            <h2 className="section-heading">
              Schedule Your <span className="text-green">Free Pickup</span>
            </h2>
            <p className="section-desc">
              Fill the form and we'll confirm via WhatsApp within 2 hours. No hidden charges, no obligations.
            </p>

            <div className="schedule-checklist">
              {[
                ['✅', '100% Free — no hidden charges ever'],
                ['⚡', 'Confirmed within 2 hours of booking'],
                ['📜', 'CPCB traceability certificate on completion'],
                ['🔒', 'Your data is 100% private & encrypted'],
                ['🫙', 'We provide containers if you need them'],
              ].map(([icon, text], i) => (
                <div key={i} className="check-item">
                  <span className="check-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="schedule-image-wrapper">
              <img src="/schedule-illustration.png" alt="Schedule a pickup" className="schedule-image" />
            </div>
          </div>

          <div className="schedule-form-card">
            {done ? (
              <div className="form-success">
                <div className="success-checkmark">✓</div>
                <h3>Request Sent Successfully!</h3>
                <p>We've opened WhatsApp with your details. Our team will confirm your pickup within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h3 className="form-card-title">Book a Pickup</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input id="name" name="name" value={form.name} onChange={change} placeholder="Ramesh Kumar" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Establishment *</label>
                    <select id="type" name="type" value={form.type} onChange={change}>
                      {['Restaurant', 'Hotel', 'Dhaba', 'Cloud Kitchen', 'Canteen / Mess', 'Household', 'Other'].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input id="phone" name="phone" value={form.phone} onChange={change} placeholder="+91 98765 43210" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input id="city" name="city" value={form.city} onChange={change} placeholder="Gurgaon" required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Pickup Address *</label>
                  <input id="address" name="address" value={form.address} onChange={change} placeholder="Full address of your establishment" required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="quantity">Estimated Qty (Litres)</label>
                    <input id="quantity" name="quantity" value={form.quantity} onChange={change} placeholder="e.g. 50" type="number" min="1" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Preferred Date</label>
                    <input id="date" name="date" value={form.date} onChange={change} type="date" />
                  </div>
                </div>

                <button type="submit" className="form-submit-btn" disabled={saving}>
                  {saving ? 'Sending...' : 'Send via WhatsApp →'}
                </button>
                <p className="form-note">Your details are sent directly via WhatsApp & saved securely.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

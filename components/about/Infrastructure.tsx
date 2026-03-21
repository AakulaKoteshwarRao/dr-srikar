import { Icon } from '@/lib/icons'

const facilities = [
  { grad: 'linear-gradient(145deg,var(--secondary),var(--primary))', title: 'Advanced Diagnostics', desc: 'High-resolution digital imaging for fast, accurate diagnostics.' },
  { grad: 'linear-gradient(145deg,var(--secondary-deep),var(--secondary))', title: 'Procedure Room', desc: 'Fully equipped minor procedure room for outpatient treatments.' },
  { grad: 'linear-gradient(145deg,var(--primary),var(--primary-dark))', title: 'Rehabilitation Unit', desc: 'Dedicated rehabilitation facility within the clinic premises.' },
  { grad: 'linear-gradient(145deg,var(--primary-dark),var(--secondary-deep))', title: 'Patient Lounge', desc: 'Comfortable waiting area with accessibility features for all patients.' },
]

export default function Infrastructure() {
  return (
    <section className="infra-section">
      <div className="sec-header">
        <div className="sec-label"><span>Facilities</span></div>
        <h2 className="sec-title">Modern infrastructure for better outcomes.</h2>
        <p className="sec-sub">Our clinic is equipped with advanced diagnostic and treatment technology.</p>
      </div>
      <div className="infra-grid">
        {facilities.map((f, i) => (
          <div key={i} className="infra-card">
            <div className="infra-card-visual" style={{ background: f.grad }}>
              <Icon name="pulse" size={32} color="rgba(255,255,255,0.6)" />
            </div>
            <div className="infra-card-body" style={{ padding: '1.25rem' }}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

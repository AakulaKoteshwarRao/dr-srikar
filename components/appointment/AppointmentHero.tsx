const trustItems = [
  {
    grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    label: 'Every journey starts with a conversation',
  },
  {
    grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    label: 'No obligation to proceed',
  },
  {
    grad: 'linear-gradient(135deg,var(--secondary-deep),var(--secondary-deep))',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
    label: 'Your details are private',
  },
]

export default function AppointmentHero() {
  return (
    <section className="appt-hero">
      <div className="sec-label"><span>Book Appointment</span></div>
      <h1>Take the first step towards <em>better health.</em></h1>
      <p className="appt-hero-text">Fill out the form below and our team will reach out to confirm your appointment. Every consultation is thorough, unhurried, and focused on finding the right solution for you.</p>
      <div className="appt-hero-trust">
        {trustItems.map((t, i) => (
          <div key={i} className="trust-item">
            <div className="trust-icon" style={{ background: t.grad }}>{t.icon}</div>
            <span>{t.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

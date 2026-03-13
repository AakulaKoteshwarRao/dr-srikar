import { getConfig } from '@/lib/config'

export default function HowToReach() {
  const config = getConfig()

  const cards = [
    {
      grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      title: 'Nearby Landmarks',
      body: config?.clinic?.address || 'Contact us for our address.',
    },
    {
      grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
      title: 'By Public Transport',
      body: 'Local buses, metro, and cabs are available nearby. Contact us for the most convenient route from your location.',
    },
    {
      grad: 'linear-gradient(135deg,var(--secondary-deep),#0B1A3E)',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
      title: 'By Car',
      body: 'Parking is available near the clinic. Contact us for landmark directions.',
    },
  ]

  return (
    <section className="reach-section">
      <div className="sec-header">
        <div className="sec-label"><span>Directions</span></div>
        <h2 className="sec-title">How to reach us.</h2>
        <p className="sec-sub">Multiple ways to get to our clinic.</p>
      </div>
      <div className="reach-grid">
        {cards.map((c, i) => (
          <div key={i} className="reach-card" style={{ padding: '1.5rem' }}>
            <div className="reach-card-icon" style={{ background: c.grad }}>{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

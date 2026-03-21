import type { ClinicInfo } from '@/lib/types'

export default function Achievements({ clinic }: { clinic: ClinicInfo }) {
  const achievements = [
    {
      grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
      title: 'NABH Accreditation',
      desc: 'Accredited facility meeting national healthcare quality standards.',
    },
    {
      grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
      title: 'Best Clinic Award',
      desc: `Recognised as a leading specialist clinic in ${clinic.city}.`,
    },
    {
      grad: 'linear-gradient(135deg,var(--secondary-deep),var(--secondary-deep))',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
      title: '10,000+ Patients Milestone',
      desc: 'Trusted by over ten thousand patients for specialist care.',
    },
  ]
  return (
    <section className="achieve-section">
      <div className="sec-header">
        <div className="sec-label"><span>Achievements</span></div>
        <h2 className="sec-title">Recognised for quality care.</h2>
        <p className="sec-sub">Milestones and recognitions earned through consistent clinical excellence.</p>
      </div>
      <div className="achieve-grid">
        {achievements.map((a, i) => (
          <div key={i} className="achieve-card">
            <div className="achieve-icon" style={{ background: a.grad }}>{a.icon}</div>
            <div style={{ padding: "0 0.5rem" }}>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

import type { ClinicInfo } from '@/lib/types'
import { Icon } from '@/lib/icons'

export default function Achievements({ clinic }: { clinic: ClinicInfo }) {
  const achievements = [
    { grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', icon: 'award', title: 'NABH Accreditation', desc: 'Accredited facility meeting national healthcare quality standards.' },
    { grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))', icon: 'star', title: 'Best Clinic Award', desc: `Recognised as a leading specialist clinic in ${clinic.city}.` },
    { grad: 'linear-gradient(135deg,var(--secondary-deep),var(--secondary-deep))', icon: 'user', title: '10,000+ Patients Milestone', desc: 'Trusted by over ten thousand patients for specialist care.' },
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
            <div className="achieve-icon" style={{ background: a.grad }}>
              <Icon name={a.icon} size={24} color="#FFFFFF" />
            </div>
            <div style={{ padding: '0 0.5rem' }}>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

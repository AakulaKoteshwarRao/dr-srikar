import defaultData from '../../data/default.json'
import { Icon } from '@/lib/icons'

const d = defaultData
const specialty = (d.entity as any)?.medicalSpecialty || d.doctor?.experience?.[0]?.role || 'specialist care'
const points = [
  'Early-stage conditions can often be managed without surgery',
  'Damage is more reversible when treated promptly',
  'Non-surgical options are more effective in early stages',
  'Recovery time reduces significantly with early intervention',
]

export default function EarlyTreatment() {
  return (
    <section className="early-section">
      <div className="early-inner">
        <div className="early-grid">
          <div className="early-content">
            <div className="sec-label"><span style={{ color: 'var(--primary)' }}>Why It Matters</span></div>
            <h2>Early treatment leads to better outcomes.</h2>
            <p>Many conditions are progressive. What starts as mild discomfort can escalate into serious, harder-to-treat problems if left unaddressed. Timely diagnosis and intervention often means simpler, less invasive treatment -- and significantly better recovery.</p>
            <ul className="early-points">
              {points.map((pt, i) => (
                <li key={i}>
                  <div className="early-check"><Icon name="check" size={16} color="#FFFFFF" /></div>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="early-visual">
            <Icon name="pulse" size={64} color="var(--primary)" />
          </div>
        </div>
      </div>
    </section>
  )
}

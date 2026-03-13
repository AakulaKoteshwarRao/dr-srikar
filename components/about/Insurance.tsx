import type { ClinicInfo } from '@/lib/types'

const DEFAULT_INSURERS = [
  { bg: '#C0392B', initials: 'SH', name: 'Star Health' },
  { bg: '#004B87', initials: 'HE', name: 'HDFC Ergo' },
  { bg: '#B22222', initials: 'IL', name: 'ICICI Lombard' },
  { bg: '#006400', initials: 'NI', name: 'New India Assurance' },
  { bg: '#003399', initials: 'BA', name: 'Bajaj Allianz' },
  { bg: '#E60012', initials: 'MB', name: 'Max Bupa' },
  { bg: '#1A5276', initials: 'UI', name: 'United India' },
  { bg: '#1E3A8A', initials: 'SG', name: 'SBI General' },
]

export default function Insurance({ clinic }: { clinic: ClinicInfo }) {
  const insurers = clinic.insurers || DEFAULT_INSURERS
  return (
    <section className="insurance-section">
      <div className="sec-header">
        <div className="sec-label"><span>Insurance</span></div>
        <h2 className="sec-title">Insurance partners.</h2>
        <p className="sec-sub">We work with all major insurance providers. Cashless facility is available.</p>
      </div>
      <div className="ins-grid">
        {insurers.map((ins, i) => (
          <div key={i} className="ins-card" style={{ padding: "1rem" }}>
            <div className="ins-logo-box" style={{ background: ins.bg }}>
              <span className="ins-logo-text">{ins.initials}</span>
            </div>
            <span className="ins-name">{ins.name}</span>
          </div>
        ))}
      </div>
      <p className="insurance-note">All major TPA networks accepted. Pre-authorisation assistance and claim follow-up support provided.</p>
    </section>
  )
}

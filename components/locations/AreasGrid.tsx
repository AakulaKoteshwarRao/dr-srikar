import type { AreaItem, ClinicInfo } from '@/lib/types'

const pinIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const clockIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

export default function AreasGrid({ areas, clinic }: { areas: AreaItem[]; clinic?: ClinicInfo }) {
  const city = clinic?.city || 'the city'
  return (
    <section className="areas-section">
      <div className="sec-header">
        <div className="sec-label"><span>Areas We Serve</span></div>
        <h2 className="sec-title">Serving patients across {city}.</h2>
        <p className="sec-sub">Patients visit us from across the city. Here are the areas we commonly serve.</p>
      </div>
      <div className="areas-grid">
        {areas.map((a, i) => (
          <a key={i} href={`/locations/${a.slug}`} className="area-card">
            <h3>{a.name}</h3>
            <div className="area-meta">
              <span>{pinIcon}{a.distance}</span>
              <span>{clockIcon}{a.duration}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

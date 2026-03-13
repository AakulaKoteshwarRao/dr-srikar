import type { ClinicInfo } from '@/lib/types'

export default function ClinicStrip({ clinic }: { clinic: ClinicInfo }) {
  return (
    <section className="clinic-strip">
      <div className="clinic-strip-inner">
        <div className="cs-item">
          <div className="cs-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div className="cs-text">
            <h4>Clinic Address</h4>
            <p>{clinic.address}</p>
          </div>
        </div>
        <div className="cs-item">
          <div className="cs-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div className="cs-text">
            <h4>Working Hours</h4>
            <p>{clinic.hours}</p>
          </div>
        </div>
        <div className="cs-item">
          <div className="cs-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </div>
          <div className="cs-text">
            <h4>Phone</h4>
            <p>{clinic.phone}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

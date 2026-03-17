'use client'
import Image from 'next/image'
import type { DoctorInfo, ClinicInfo } from '@/lib/types'

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, color: '#F97316', flexShrink: 0 }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, color: '#F97316', flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)
const LanguageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, color: '#F97316', flexShrink: 0 }}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
)
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 16, height: 16 }}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 64, height: 64, color: 'rgba(255,255,255,0.25)' }}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const iconMap = {
  location: <LocationIcon />,
  clock: <ClockIcon />,
  language: <LanguageIcon />,
}

export default function MeetDoctor({ doctor, clinic }: { doctor: DoctorInfo; clinic: ClinicInfo }) {
  return (
    <section className="doc-hero-section">
      <div className="doc-hero-inner">
        <div className="doc-hero-grid">
          <div className="doc-photo-wrap">
            <div className="doc-photo">
              {doctor.photo ? (
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: 'cover' }}
                  priority={false}
                />
              ) : (
                <>
                  <PersonIcon />
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Doctor Photo</span>
                </>
              )}
            </div>
          </div>

          <div className="doc-info">
            <div className="sec-label">
              <span style={{ color: '#F97316' }}>Meet the Doctor</span>
            </div>
            <h2 className="doc-name">{doctor.name}</h2>
            <p className="doc-degree">{doctor.degrees}</p>

            <div className="doc-specialty-tags">
              {doctor.specialties.map((s, i) => (
                <span key={i} className="doc-spec-tag">{s}</span>
              ))}
            </div>

            <div className="doc-stats-row">
              {doctor.stats.map((stat, i) => (
                <div key={i} className="doc-stat">
                  <span className="doc-stat-num">{stat.number}</span>
                  <span className="doc-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="doc-details">
              {doctor.details.map((detail, i) => (
                <div key={i} className="doc-detail-item">
                  {iconMap[detail.icon]}
                  {detail.link ? (
                    <a href={detail.link} target="_blank" rel="noreferrer"
                      style={{ color: '#F97316', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                      {detail.text}
                    </a>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{detail.text}</span>
                  )}
                </div>
              ))}
            </div>

            <a href="/appointment" className="doc-cta-btn" onClick={e => { e.preventDefault(); typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("openAppointmentModal")) }}>
              {doctor.ctaLabel} <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

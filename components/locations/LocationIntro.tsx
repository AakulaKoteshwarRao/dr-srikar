import defaultData from '../../data/default.json'
import type { ClinicInfo, DoctorInfo } from '@/lib/types'
import { Icon } from '@/lib/icons'

const d = defaultData
const serviceChips = [
  ...(d.services?.conditions || []).slice(0, 3).map((s: any) => s.title),
  ...(d.services?.procedures || []).slice(0, 3).map((p: any) => p.title),
]

export default function LocationIntro({ clinic, doctor }: { clinic: ClinicInfo; doctor: DoctorInfo }) {
  return (
    <section className="intro-section">
      <div className="intro-inner">
        <div className="intro-grid">
          <div className="intro-content">
            <h2>Your trusted {d.entity?.medicalSpecialty || 'specialist'} clinic in {clinic.city}</h2>
            <p>Led by {doctor.name}, a {doctor.experience?.[0]?.role || 'specialist'} with {doctor.stats[0]?.number} years of experience and over {doctor.stats[1]?.number} patients treated. The clinic offers comprehensive services from consultation to treatment and rehabilitation.</p>
            <p>Located at {clinic.street}, {clinic.area} -- one of {clinic.city}'s most accessible and well-connected healthcare hubs.</p>
            <div className="intro-highlights">
              {serviceChips.map((chip, i) => <span key={i} className="intro-chip">{chip}</span>)}
            </div>
          </div>
          <div className="intro-visual">
            <Icon name="location" size={64} color="var(--primary)" />
          </div>
        </div>
      </div>
    </section>
  )
}

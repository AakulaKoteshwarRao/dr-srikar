import type { PackageItem } from '@/lib/types'
import { Icon } from '@/lib/icons'

export default function PackagesGrid({ packages }: { packages: any[] }) {
  return (
    <section className="packages-section" style={{ background: 'var(--primary-light)' }}>
      <div className="sec-header">
        <div className="sec-label"><span>Packages</span></div>
        <h2 className="sec-title">Choose the right package.</h2>
        <p className="sec-sub">Comprehensive treatment packages tailored for patient needs.</p>
      </div>
      <div className="pkg-grid">
        {packages.map((pkg, i) => (
          <div key={i} className="pkg-card">
            <div className="pkg-visual" style={{ background: pkg.gradient }}>
              <Icon name="briefcase" size={24} color="rgba(255,255,255,0.6)" />
            </div>
            <div className="pkg-body" style={{ padding: '1.5rem' }}>
              <h3 className="pkg-name">{pkg.name}</h3>
              <p className="pkg-desc">{pkg.description}</p>
              <div className="pkg-price" style={{ whiteSpace: 'nowrap', fontSize: 'var(--text-base)' }}>{pkg.price}</div>
              <ul className="pkg-includes">
                {pkg.includes.map((item: any, j: number) => <li key={j}>{item}</li>)}
              </ul>
              <a href={`/packages/${pkg.slug}`} className="pkg-cta">
                Enquire Now <Icon name="arrow-right" size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

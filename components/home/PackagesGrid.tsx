import type { PackageItem } from '@/lib/types'

const icons: Record<string, JSX.Element> = {
  box: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
  tool: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  briefcase: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
}

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function PackagesGrid({ packages }: { packages: PackageItem[] }) {
  return (
    <section className="card-section section-cool-grey">
      <div className="sec-header">
        <div className="sec-label"><span>Packages</span></div>
        <h2 className="sec-title">Treatment packages.</h2>
        <p className="sec-sub">Transparent, all-inclusive packages designed to give patients clarity on costs from the start.</p>
      </div>
      <div className="card-grid">
        {packages.map((pkg, i) => (
          <a key={i} href={pkg.href} className="pkg-card">
            <div className={`pkg-icon ${pkg.gradClass}`}>
              {icons[pkg.iconType] || icons.box}
            </div>
            <h3>{pkg.title}</h3>
            <p>{pkg.description}</p>
            <div className="pkg-price">{pkg.price}</div>
            <div className="pkg-tags">
              {pkg.tags.map((tag, j) => (
                <span key={j} className="pkg-tag">{tag}</span>
              ))}
            </div>
            <span className="learn-more">Learn more <ArrowIcon /></span>
          </a>
        ))}
      </div>
      <div className="sec-cta">
        <a href="/products">View All Packages <ArrowIcon /></a>
      </div>
    </section>
  )
}

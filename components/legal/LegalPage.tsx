'use client'

interface Section {
  title: string
  content: string | string[]
}

interface LegalPageProps {
  badge: string
  title: string
  updated: string
  sections: Section[]
}

export default function LegalPage({ badge, title, updated, sections }: LegalPageProps) {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <span>{title}</span>
      </nav>

      {/* Hero */}
      <div className="legal-hero">
        <div className="sec-label"><span>{badge}</span></div>
        <h1 className="legal-title">{title}</h1>
        <p className="legal-updated">Last updated: {updated}</p>
      </div>

      {/* Content */}
      <div className="legal-body">
        <div className="legal-inner">
          {sections.map((sec, i) => (
            <div key={i} className="legal-section">
              <h2 className="legal-sec-title">{i + 1}. {sec.title}</h2>
              {Array.isArray(sec.content) ? (
                <ul className="legal-list">
                  {sec.content.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{sec.content}</p>
              )}
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div className="legal-nav">
          <a href="/terms" className="legal-nav-link">Terms &amp; Conditions</a>
          <a href="/privacy" className="legal-nav-link">Privacy Policy</a>
          <a href="/disclaimer" className="legal-nav-link">Medical Disclaimer</a>
        </div>
      </div>
    </>
  )
}

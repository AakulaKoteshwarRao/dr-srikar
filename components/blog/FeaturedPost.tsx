import defaultData from '../../data/default.json'

const d = defaultData
const arrowIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

// Featured post uses the first blog entry from default.json if available, else generic placeholder
const blog = (d as any).blog?.[0] || null
const title   = blog?.title   || 'What to Expect at Your First Consultation'
const excerpt = blog?.excerpt  || 'A practical guide covering what to bring, what to expect during your consultation, and how to prepare for your first visit with our specialist.'
const href    = blog?.slug ? `/blog/${blog.slug}` : '/blog'
const date    = blog?.date    || '15 Feb 2026'

export default function FeaturedPost() {
  return (
    <section className="featured-section">
      <a href={href} className="featured-card" style={{ display: 'grid' }}>
        <div className="featured-thumb" style={{ background: 'linear-gradient(145deg, var(--secondary), var(--primary))' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
        </div>
        <div className="featured-body">
          <span className="featured-tag tag-guides">Featured Guide</span>
          <div className="featured-meta">
            <span>{d.doctor?.name || 'Our Doctor'}</span>
            <div className="dot"/>
            <span>{date}</span>
            <div className="dot"/>
            <span>5 min read</span>
          </div>
          <h2>{title}</h2>
          <p className="featured-excerpt">{excerpt}</p>
          <span className="read-more">Read article {arrowIcon}</span>
        </div>
      </a>
    </section>
  )
}

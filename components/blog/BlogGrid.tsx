'use client'
import { useState } from 'react'
import defaultData from '../../data/default.json'

const d = defaultData
const arrowIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 12, height: 12 }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const articleIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>

const grads = [
  'linear-gradient(145deg,var(--secondary-deep),var(--secondary))',
  'linear-gradient(145deg,var(--primary),var(--primary-dark))',
  'linear-gradient(145deg,var(--secondary),var(--secondary-dark))',
  'linear-gradient(145deg,var(--primary-dark),var(--secondary-deep))',
  'linear-gradient(145deg,var(--secondary-dark),var(--primary))',
  'linear-gradient(145deg,var(--primary),var(--secondary))',
]

// Use blog posts from default.json if present; otherwise generate from conditions
const blogData = (d as any).blog || []
const conditionPosts = (d.conditions || []).slice(0, 6).map((c: any, i: number) => ({
  cat: 'conditions',
  tag: 'Conditions',
  tagClass: 'tag-conditions',
  grad: grads[i % grads.length],
  href: `/blog/${c.slug || c.label?.toLowerCase().replace(/\s+/g,'-')}`,
  title: `Understanding ${c.title || c.label}: What Patients Should Know`,
  excerpt: c.description || `Learn about ${c.title || c.label}, its symptoms, causes, and treatment options available at our clinic.`,
  date: '01 Jan 2026',
}))

const posts = blogData.length > 0
  ? blogData.map((b: any, i: number) => ({
      cat:      b.category || 'guides',
      tag:      b.tag      || 'Guide',
      tagClass: `tag-${b.category || 'guides'}`,
      grad:     grads[i % grads.length],
      href:     `/blog/${b.slug}`,
      title:    b.title,
      excerpt:  b.excerpt || '',
      date:     b.date    || '01 Jan 2026',
    }))
  : conditionPosts

const tabs = [
  { label: 'All',            cat: 'all' },
  { label: 'Conditions',     cat: 'conditions' },
  { label: 'Procedures',     cat: 'procedures' },
  { label: 'Wellness',       cat: 'wellness' },
  { label: 'Patient Guides', cat: 'guides' },
]

export default function BlogGrid() {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? posts : posts.filter((p: any) => p.cat === active)

  return (
    <section className="blog-grid-section">
      <div className="blog-grid-inner">
        <div className="sec-header">
          <div className="sec-label"><span>All Articles</span></div>
          <h2 className="sec-title">Browse by topic.</h2>
        </div>

        <div className="filter-bar">
          {tabs.map(t => (
            <button
              key={t.cat}
              className={`filter-tab${active === t.cat ? ' active' : ''}`}
              onClick={() => setActive(t.cat)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {filtered.map((p: any, i: number) => (
            <a key={i} href={p.href} className="blog-card">
              <div className="blog-card-thumb" style={{ background: p.grad }}>
                {articleIcon}
              </div>
              <div className="blog-card-body">
                <span className={`blog-card-tag ${p.tagClass}`}>{p.tag}</span>
                <h3>{p.title}</h3>
                <p className="blog-card-excerpt">{p.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="blog-card-date">{p.date}</span>
                  <span className="blog-card-read">Read {arrowIcon}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

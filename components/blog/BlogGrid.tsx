'use client'
import { BlogPost } from '@/lib/blogs'

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

interface Props {
  posts: BlogPost[]
  conditions?: any[]  // fallback when no blogs published yet
}

export default function BlogGrid({ posts, conditions = [] }: Props) {
  // If Supabase has published posts, use them
  // Otherwise fall back to condition-generated placeholders
  const items = posts.length > 0
    ? posts.map((p, i) => ({
        grad:     grads[i % grads.length],
        href:     `/blog/${p.slug}`,
        title:    p.title,
        excerpt:  p.excerpt,
        date:     p.published_at ? new Date(p.published_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
        tag:      p.category || 'General',
        tagClass: `tag-${(p.category || 'general').toLowerCase().replace(/\s+/g, '-')}`,
        image:    p.featured_image || null,
      }))
    : conditions.slice(0, 6).map((c: any, i: number) => ({
        grad:     grads[i % grads.length],
        href:     `/blog/${c.slug || c.label?.toLowerCase().replace(/\s+/g, '-')}`,
        title:    `Understanding ${c.title || c.label}: What Patients Should Know`,
        excerpt:  c.description || `Learn about ${c.title || c.label}, its symptoms, causes, and treatment options.`,
        date:     '01 Jan 2026',
        tag:      'Conditions',
        tagClass: 'tag-conditions',
        image:    null,
      }))

  if (items.length === 0) return null

  return (
    <section className="blog-section">
      <div className="blog-inner">
        <div className="sec-header">
          <div className="sec-label"><span>All Articles</span></div>
          <h2 className="sec-title">From our blog.</h2>
        </div>
        <div className="blog-grid">
          {items.map((post, i) => (
            <a key={i} href={post.href} className="blog-card">
              <div className="blog-thumb" style={{ background: post.image ? 'transparent' : post.grad }}>
                {post.image
                  ? <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : articleIcon}
              </div>
              <div className="blog-body">
                <span className={`blog-tag ${post.tagClass}`}>{post.tag}</span>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-footer">
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-read">Read {arrowIcon}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'
import { BlogPost } from '@/lib/blogs'

const arrowIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

interface Props {
  post: BlogPost | null
}

export default function FeaturedPost({ post }: Props) {
  const title   = post?.title   || 'What to Expect at Your First Consultation'
  const excerpt = post?.excerpt  || 'A practical guide covering what to bring, what to expect during your consultation, and how to prepare for your first visit with our specialist.'
  const href    = post?.slug ? `/blog/${post.slug}` : '/blog'
  const date    = post?.published_at ? new Date(post.published_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '15 Feb 2026'
  const cat     = post?.category || 'General'

  return (
    <section className="featured-section">
      <a href={href} className="featured-card" style={{ display: 'grid' }}>
        <div className="featured-thumb" style={{ background: 'linear-gradient(145deg, var(--secondary), var(--primary))' }}>
          {post?.featured_image ? (
            <img src={post.featured_image} alt={title} width={800} height={450} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          )}
        </div>
        <div className="featured-body">
          <span className="featured-tag">{cat}</span>
          <h2 className="featured-title">{title}</h2>
          <p className="featured-excerpt">{excerpt}</p>
          <div className="featured-footer">
            <span className="featured-date">{date}</span>
            <span className="featured-read">Read Article {arrowIcon}</span>
          </div>
        </div>
      </a>
    </section>
  )
}

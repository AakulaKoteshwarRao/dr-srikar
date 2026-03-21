'use client'
import { BlogPost } from '@/lib/blogs'
import { Icon } from '@/lib/icons'

export default function FeaturedPost({ post }: { post: BlogPost | null }) {
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
            <Icon name="file" size={48} color="rgba(255,255,255,0.4)" />
          )}
        </div>
        <div className="featured-body">
          <span className="featured-tag">{cat}</span>
          <h2 className="featured-title">{title}</h2>
          <p className="featured-excerpt">{excerpt}</p>
          <div className="featured-footer">
            <span className="featured-date">{date}</span>
            <span className="featured-read">Read Article <Icon name="arrow-right" size={16} /></span>
          </div>
        </div>
      </a>
    </section>
  )
}

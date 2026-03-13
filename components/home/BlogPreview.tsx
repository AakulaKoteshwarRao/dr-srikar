'use client'
import { useRef } from 'react'
import type { BlogPost } from '@/lib/types'

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 16, height: 16 }}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })
  }

  return (
    <section className="blog-section-scroll">
      <div className="blog-scroll-inner">
        <div className="blog-header-row">
          <div>
            <div className="sec-label"><span>Health Blog</span></div>
            <h2 className="sec-title">Read. Learn. Take better care.</h2>
          </div>
          <a href="/blog" className="blog-view-all">
            View all posts <ArrowIcon />
          </a>
        </div>
        <div className="blog-carousel-wrap">
          <button className="carousel-btn blog-prev" style={{ left: -16, top: '50%', transform: 'translateY(-50%)' }} onClick={() => scroll(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div className="blog-carousel" ref={ref}>
            {posts.map((post, i) => (
              <a key={i} href={post.href} className="blog-slide">
                <div className="blog-slide-thumb" style={{ background: post.gradStyle.replace('background: ', '') }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" style={{ width: 40, height: 40 }}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div className="blog-slide-body">
                  <span className="blog-slide-date">{post.date}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
          <button className="carousel-btn blog-next" style={{ right: -16, top: '50%', transform: 'translateY(-50%)' }} onClick={() => scroll(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

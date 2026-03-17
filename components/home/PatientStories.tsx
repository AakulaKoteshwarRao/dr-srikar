'use client'
import { useRef } from 'react'
import type { StoryItem } from '@/lib/types'

const storyGrads = [
  'background: linear-gradient(145deg, var(--secondary), var(--primary))',
  'background: linear-gradient(145deg, var(--secondary-deep), var(--secondary), var(--primary))',
  'background: linear-gradient(145deg, var(--primary), var(--primary-dark), #F97316)',
  'background: linear-gradient(145deg, var(--primary-dark), var(--secondary-deep), #1E3A8A)',
  'background: linear-gradient(145deg, var(--secondary-deep), var(--secondary-dark), var(--primary-dark))',
]

export default function PatientStories({ stories }: { stories: StoryItem[] }) {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 440, behavior: 'smooth' })
  }

  return (
    <section className="stories-section-dark">
      <div className="stories-inner-dark">
        <div className="stories-header-row">
          <div>
            <div className="sec-label"><span>Real Stories</span></div>
            <h2 className="sec-title">Patient Stories</h2>
            <p className="sec-sub">Real patients sharing their treatment journey.</p>
            <a href="/success-stories" className="stories-link">
              View all stories
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="stories-carousel-wrap">
          <button className="carousel-btn carousel-prev" aria-label="Previous" onClick={() => scroll(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div className="stories-carousel" ref={ref}>
            {stories.map((story, i) => (
              <div key={i} className="story-slide">
                <div className="story-video-thumb" style={{ ...(storyGrads[i] ? { background: storyGrads[i].replace('background: ', '') } : {}) }}>
                  <div className="play-circle">
                    <svg viewBox="0 0 24 24" fill="#FFFFFF"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                  </div>
                  <span className="vid-duration">{story.duration}</span>
                </div>
                <h3>{story.title}</h3>
                <span className="story-tag">{story.tag}</span>
              </div>
            ))}
          </div>
          <button className="carousel-btn carousel-next" aria-label="Next" onClick={() => scroll(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

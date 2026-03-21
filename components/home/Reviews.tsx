import type { ReviewItem, ReviewSummary } from '@/lib/types'
import { Icon } from '@/lib/icons'

export default function Reviews({ reviews, summary }: { reviews: ReviewItem[]; summary: ReviewSummary }) {
  return (
    <section className="reviews-section">
      <div className="reviews-inner">
        <div className="sec-header">
          <div className="sec-label"><span>Patient Reviews</span></div>
          <h2 className="sec-title">What our patients say.</h2>
          <div className="reviews-rating">
            <span className="reviews-score">{summary.score}</span>
            <div>
              <span className="reviews-stars">*****</span>
              <span className="reviews-count">{summary.count}</span>
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <div key={i} className="review-card">
              <div className="review-top">
                <div className="review-avatar">{review.initials}</div>
                <div className="review-meta">
                  <span className="review-name">{review.name}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <span className="review-stars">*****</span>
              </div>
              <p>&ldquo;{review.text}&rdquo;</p>
            </div>
          ))}
        </div>
        <div className="reviews-actions">
          <a href={summary.googleUrl} target="_blank" rel="noreferrer" className="rev-btn rev-more">
            Read More Reviews <Icon name="arrow-right" size={16} />
          </a>
          <a href={summary.googleUrl} target="_blank" rel="noreferrer" className="rev-btn rev-write">
            Write a Review <Icon name="external-link" size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

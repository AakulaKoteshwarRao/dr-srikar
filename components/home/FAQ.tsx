'use client'
import { useState } from 'react'
import type { FaqItem } from '@/lib/types'

export default function FAQ({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="sec-header faq-header">
          <div className="sec-label"><span>FAQ</span></div>
          <h2 className="sec-title">Common questions answered.</h2>
          <p className="sec-sub">Everything patients typically want to know before booking a consultation.</p>
        </div>
        <div className="faq-list">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className="faq-item"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                style={{ cursor: 'pointer' }}
              >
                <div className="faq-q">
                  <span>{item.question}</span>
                  <div className="faq-toggle" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s', borderColor: isOpen ? 'var(--primary)' : undefined }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'var(--primary)' : 'currentColor'} strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                </div>
                {isOpen && (
                  <div className="faq-a" style={{ padding: "0 1.5rem 1.5rem" }}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'
import { useState } from 'react'
import type { PricingItem } from '@/lib/types'

const icons: Record<string, JSX.Element> = {
  dollar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  ),
  'credit-card': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
}

export default function PricingAccordion({ items }: { items: PricingItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="pricing-section">
      <div className="pricing-inner">
        <div className="sec-header">
          <div className="sec-label"><span>Pricing &amp; Insurance</span></div>
          <h2 className="sec-title">Transparent costs. No hidden charges.</h2>
          <p className="sec-sub">We believe patients deserve complete clarity on costs before any treatment begins.</p>
        </div>
        <div className="pricing-accordion">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className="acc-item"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                style={{ cursor: 'pointer' }}
              >
                <div className={`acc-bar ${item.barClass}`}>
                  <div className="acc-bar-left">
                    <div className="acc-icon">{icons[item.iconType] || icons.shield}</div>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="acc-toggle" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>
                {isOpen && (
                  <div className="acc-panel" style={{ padding: "0 1.5rem 1.5rem" }}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <ul>
                      {item.points.map((pt, j) => (
                        <li key={j}>{pt}</li>
                      ))}
                    </ul>
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

import type { TrustItem } from '@/lib/types'

export default function TrustStrip({ items }: { items: TrustItem[] }) {
  // Duplicate for seamless marquee loop
  const doubled = [...items, ...items]
  return (
    <section className="trust-strip">
      <div className="trust-marquee">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'contents' }}>
            <div className="trust-item">
              <div className="trust-icon">{item.icon}</div>
              {item.text}
            </div>
            <div className="trust-divider"></div>
          </span>
        ))}
      </div>
    </section>
  )
}

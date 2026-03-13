import type { WhyCard } from '@/lib/types'

const icons: Record<string, JSX.Element> = {
  pulse: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
}

export default function WhyChoose({ cards }: { cards: WhyCard[] }) {
  return (
    <section className="why-section">
      <div className="sec-header">
        <div className="sec-label"><span>Why Choose Us</span></div>
        <h2 className="sec-title">The difference.</h2>
        <p className="sec-sub">What sets us apart in delivering care that patients trust.</p>
      </div>
      <div className="why-grid">
        {cards.map((card, i) => (
          <div key={i} className="why-card">
            <div className={`why-icon ${card.iconColor}`}>
              {icons[card.iconType] || icons.check}
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const points = [
  'All ranges are estimates',
  'Exact costs confirmed at consultation',
  'No hidden charges',
  'EMI available on request',
]

const checkIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export default function PricingTransparency() {
  return (
    <section className="pricing-note-section">
      <div className="pricing-note-inner">
        <h2>Transparent pricing. No surprises.</h2>
        <div className="pricing-points">
          {points.map((pt, i) => (
            <div key={i} className="pricing-point">
              {checkIcon}{pt}
            </div>
          ))}
        </div>
        <p className="pricing-disclaimer">Full treatment cost is explained before any procedure begins. Insurance and cashless options are supported.</p>
      </div>
    </section>
  )
}

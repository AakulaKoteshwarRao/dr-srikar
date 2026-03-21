'use client'
import { useState } from 'react'
import { Icon } from '@/lib/icons'

const faqs = [
  { q: 'Is the clinic wheelchair accessible?', a: 'Yes. Our clinic has full wheelchair accessibility including ramps and accessible restrooms. Please call ahead if you need special assistance.' },
  { q: 'Is there parking available?', a: 'Parking is available outside the clinic building. Contact us for specific landmark directions.' },
  { q: 'What is the nearest metro station?', a: 'The nearest metro station and public transport options are close by. Contact us for specific directions from your location.' },
  { q: 'Do you handle emergency cases?', a: 'Yes. Emergency cases are seen immediately during clinic hours. Contact us for after-hours emergency arrangements.' },
  { q: 'Can I visit without an appointment?', a: 'Walk-ins are accepted but appointments are preferred to minimise waiting. You can book via phone, WhatsApp, or the online appointment form.' },
]

export default function LocationFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="faq-section" style={{ background: 'var(--neutral-100)' }}>
      <div className="faq-inner">
        <div className="sec-header faq-header">
          <div className="sec-label"><span>FAQ</span></div>
          <h2 className="sec-title">Location & accessibility.</h2>
          <p className="sec-sub">Questions about reaching the clinic and facilities available.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`} onClick={() => setOpen(open === i ? null : i)} style={{ cursor: 'pointer' }}>
              <div className="faq-q">
                <span>{faq.q}</span>
                <div className="faq-toggle" style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s', borderColor: open === i ? 'var(--primary)' : undefined }}>
                  <Icon name="check" size={16} color={open === i ? 'var(--primary)' : 'currentColor'} />
                </div>
              </div>
              {open === i && <div className="faq-a" style={{ padding: '0 1.5rem 1.5rem' }}><p>{faq.a}</p></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

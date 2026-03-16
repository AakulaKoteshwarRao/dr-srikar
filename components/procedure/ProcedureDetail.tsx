'use client'
// ─────────────────────────────────────────────────────────────
// components/procedure/ProcedureDetail.tsx
// Locked design: 2026-03-15
// Cross-checked against reference HTML — exact class names used
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import Image from 'next/image'

// ── Step icons ────────────────────────────────────────────────
const stepIcons = [
  <svg key={0} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  <svg key={1} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  <svg key={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  <svg key={3} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
]

const pillStyles = [
  { background: '#F0FDFA', color: '#3CB8AF' },
  { background: '#EBF5FB', color: '#1B6FA8' },
  { background: '#FEF3C7', color: '#D68910' },
]
const iconGrads = [
  'linear-gradient(135deg,#3CB8AF,#2A9D8F)',
  'linear-gradient(135deg,#1B6FA8,#145A8A)',
  'linear-gradient(135deg,#0D3B5E,#0A2E4A)',
  'linear-gradient(135deg,#D68910,#B7770A)',
]
const procNumGrads = [
  'linear-gradient(135deg,#3CB8AF,#2A9D8F)',
  'linear-gradient(135deg,#1B6FA8,#145A8A)',
  'linear-gradient(135deg,#0D3B5E,#0A2E4A)',
  'linear-gradient(135deg,#D68910,#B7770A)',
  'linear-gradient(135deg,#3CB8AF,#2A9D8F)',
]
const recBadgeColors = ['#3CB8AF', '#1B6FA8', '#0D3B5E', '#D68910']
const sfClasses = ['sf-1','sf-2','sf-3','sf-4']

export interface ProcedureDetailProps {
  name: string
  slug?: string
  description?: string
  pills?: string[]
  heroStats?: { label: string; value: string }[]
  heroImage?: string | null
  quickFacts?: { label: string; value: string }[]
  candidacy?: string[]
  candidacyIntro?: string
  successRateItems?: string[]
  risksItems?: string[]
  sideEffectsItems?: string[]
  riskNote?: string
  steps?: { title: string; description: string }[]
  timelines?: { label: string; value: string; description: string }[]
  howWeHandle?: { title: string; description: string }[]
  recoveryPhases?: {
    label: string; title: string; description: string
    timeline?: { badge: string; text: string }[]
    warnings?: string[]
  }[]
  outcomes?: { title: string; description: string }[]
  myths?: { myth: string; fact: string }[]
  ifDelayed?: { title?: string; intro?: string; items?: string[] }
  relatedConditions?: { name: string; slug: string }[]
  faqs?: { question: string; answer: string }[]
  clinicName?: string
  clinicAddress?: string
  clinicHours?: string
  whatsappNumber?: string
  appointmentUrl?: string
}

export default function ProcedureDetail({
  name = 'Procedure',
  description = '',
  pills = [],
  heroStats = [],
  heroImage,
  quickFacts = [],
  candidacy = [],
  candidacyIntro,
  successRateItems = [],
  risksItems = [],
  sideEffectsItems = [],
  riskNote,
  steps = [],
  timelines = [],
  howWeHandle = [],
  recoveryPhases = [],
  outcomes = [],
  myths = [],
  ifDelayed,
  relatedConditions = [],
  faqs = [],
  clinicName = '',
  clinicAddress = '',
  clinicHours = '',
  whatsappNumber = '',
  appointmentUrl = '/appointment',
}: ProcedureDetailProps) {
  const [activeRecTab, setActiveRecTab] = useState(0)
  const [openMyth,     setOpenMyth]     = useState<number | null>(null)
  const [openFaq,      setOpenFaq]      = useState<number | null>(null)

  const hasTransparency = successRateItems.length > 0 || risksItems.length > 0 || sideEffectsItems.length > 0

  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/services">Services</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/procedures">Procedures</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="9 18 15 12 9 6"/></svg>
        <span>{name}</span>
      </nav>

      {/* S1 — Hero */}
      <section className="cond-hero">
        <div className="cond-hero-text">
          <div className="sec-label"><span>Procedure</span></div>
          <h1>{name}</h1>
          <p className="cond-hero-desc">{description}</p>
          <div className="hero-pills">
            {(pills.length > 0 ? pills : ['Gold Standard','95%+ Success Rate','Walk in 24–48 hrs']).map((pill, i) => (
              <span key={i} className="hero-pill" style={pillStyles[i % pillStyles.length]}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg>
                {' '}{pill}
              </span>
            ))}
          </div>
          {heroStats.length > 0 && (
            <div className="hero-stats">
              {heroStats.map((s, i) => (
                <div key={i}>
                  <div className="hero-stat-num">{s.value}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          )}
          <a href={appointmentUrl} className="cond-hero-cta">
            Book a Consultation
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
        <div className="cond-hero-img" style={{ background: 'linear-gradient(145deg,#0D3B5E,#1B6FA8,#3CB8AF)', position: 'relative', overflow: 'hidden' }}>
          {heroImage ? (
            <Image src={heroImage} alt={`${name} at ${clinicName}`} fill style={{ objectFit: 'cover' }} priority />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" width="48" height="48">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
            </svg>
          )}
        </div>
      </section>

      {/* S2 — Quick Facts */}
      {quickFacts.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>At a Glance</span></div>
              <h2 className="sec-title">Quick facts about this procedure.</h2>
            </div>
            <div className="qf-card">
              <div className="qf-head">Quick Facts</div>
              {quickFacts.map((f, i) => (
                <div key={i} className="qf-row">
                  <span className="qf-label">{f.label}</span>
                  <span className="qf-val">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S3 — Who Needs This */}
      {candidacy.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Candidacy</span></div>
              <h2 className="sec-title">Who needs {name.toLowerCase()}?</h2>
              {candidacyIntro && <p className="sec-sub" style={{ margin: '0 auto' }}>{candidacyIntro}</p>}
            </div>
            <div className="cand-grid">
              {candidacy.map((item, i) => (
                <div key={i} className="cand-card">
                  <div className="cand-dot" style={{ background: iconGrads[i % iconGrads.length] }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="12" height="12">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S4 — Transparency */}
      {hasTransparency && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Transparency</span></div>
              <h2 className="sec-title">What you should know before surgery.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>We believe in honest, upfront disclosure so you can make an informed decision.</p>
            </div>
            <div className="transparency-cards">
              {successRateItems.length > 0 && (
                <div className="transp-card">
                  <div className="transp-icon" style={{ background: iconGrads[0] }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h3>Success Rate</h3>
                  <ul>{successRateItems.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
              )}
              {risksItems.length > 0 && (
                <div className="transp-card">
                  <div className="transp-icon" style={{ background: 'linear-gradient(135deg,#D68910,#B7770A)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <h3>Possible Risks</h3>
                  <ul>{risksItems.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
              )}
              {sideEffectsItems.length > 0 && (
                <div className="transp-card">
                  <div className="transp-icon" style={{ background: iconGrads[1] }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h3>Side Effects</h3>
                  <ul>{sideEffectsItems.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
              )}
            </div>
            {riskNote && (
              <div className="risk-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>{riskNote}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* S5 — How It Works (numbered stepper) */}
      {steps.length > 0 && (
        <div className="sec-teal">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Procedure</span></div>
              <h2 className="sec-title">How {name.toLowerCase()} works.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>A step-by-step look at what happens during the surgery.</p>
            </div>
            <div className="proc-steps">
              {steps.map((step, i) => (
                <div key={i} className="proc-step">
                  <div className="proc-step-line"/>
                  <div className="proc-num" style={{ background: procNumGrads[i % procNumGrads.length] }}>
                    {i + 1}
                  </div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S6 — Timelines */}
      {timelines.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Timelines</span></div>
              <h2 className="sec-title">Duration & timelines.</h2>
            </div>
            <div className="duration-grid">
              {timelines.map((tl, i) => (
                <div key={i} className="dur-card">
                  <div className="dur-icon" style={{ background: iconGrads[i % iconGrads.length] }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <h3>{tl.label}</h3>
                  <div className="dur-val">{tl.value}</div>
                  <p>{tl.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S7 — How We Handle */}
      {howWeHandle.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Our Approach</span></div>
              <h2 className="sec-title">How we handle this procedure.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>A structured, patient-first approach from first consultation to full recovery.</p>
            </div>
            <div className="steps-flow">
              {howWeHandle.map((step, i) => (
                <div key={i} style={{ display: 'contents' }}>
                  <div className={`sf-card ${sfClasses[i % sfClasses.length]}`}>
                    <div className="sf-top">
                      <span className="sf-badge">Step {String(i + 1).padStart(2, '0')}</span>
                      <div className="sf-icon">{stepIcons[i % stepIcons.length]}</div>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {i < howWeHandle.length - 1 && (
                    <>
                      <div className="sf-arrow-h">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="9 6 15 12 9 18"/>
                        </svg>
                      </div>
                      <div className="sf-arrow-v">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S8 — Recovery */}
      {recoveryPhases.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header">
              <div className="sec-label"><span>Recovery</span></div>
              <h2 className="sec-title">Recovery & aftercare.</h2>
              <p className="sec-sub">What to expect at each stage of your recovery journey.</p>
            </div>
            <div className="recovery-tabs">
              {recoveryPhases.map((phase, i) => (
                <span key={i} className={`rec-tab${activeRecTab === i ? ' active' : ''}`} onClick={() => setActiveRecTab(i)}>
                  {phase.label}
                </span>
              ))}
            </div>
            {recoveryPhases.map((phase, i) => (
              <div key={i} className={`rec-panel${activeRecTab === i ? ' active' : ''}`}>
                <div className="rec-panel-inner">
                  <h3>{phase.title}</h3>
                  {phase.description && <p>{phase.description}</p>}
                  {(phase.timeline ?? []).length > 0 && (
                    <div className="rec-timeline">
                      {phase.timeline!.map((row, j) => (
                        <div key={j} className="rec-tl-row">
                          <span className="rec-tl-badge" style={{ background: recBadgeColors[j % recBadgeColors.length] }}>
                            {row.badge}
                          </span>
                          <span className="rec-tl-text">{row.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {(phase.warnings ?? []).length > 0 && (
                    <div className="rec-warning">
                      <h4>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                        {' '}Watch for
                      </h4>
                      <ul>{phase.warnings!.map((w, j) => <li key={j}>{w}</li>)}</ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* S9 — Outcomes */}
      {outcomes.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Outcomes</span></div>
              <h2 className="sec-title">Success & outcomes.</h2>
            </div>
            <div className="outcome-grid">
              {outcomes.map((o, i) => (
                <div key={i} className="outcome-card">
                  <div className="outcome-icon" style={{ background: iconGrads[i % iconGrads.length] }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h3>{o.title}</h3>
                  <p>{o.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S10 — Myths vs Facts */}
      {myths.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Myths vs Facts</span></div>
              <h2 className="sec-title">Common misconceptions.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>Let&apos;s clear up some of the most common myths about {name.toLowerCase()}.</p>
            </div>
            <div className="myth-list">
              {myths.map((m, i) => (
                <div key={i} className={`myth-item${openMyth === i ? ' open' : ''}`}>
                  <div className="myth-q" onClick={() => setOpenMyth(openMyth === i ? null : i)}>
                    <span className="myth-badge">Myth</span>
                    <span>&ldquo;{m.myth}&rdquo;</span>
                    <div className="myth-toggle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </div>
                  </div>
                  {openMyth === i && (
                    <div className="myth-a">
                      <span className="fact-badge">Fact</span>
                      <p>{m.fact}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S11 — If Delayed */}
      {ifDelayed && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="centered">
              <div className="warning-box">
                <div className="warning-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div>
                  <h3>{ifDelayed.title ?? `What happens if ${name.toLowerCase()} is delayed?`}</h3>
                  {ifDelayed.intro && <p>{ifDelayed.intro}</p>}
                  {(ifDelayed.items ?? []).length > 0 && (
                    <ul>{ifDelayed.items!.map((item, i) => <li key={i}>{item}</li>)}</ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* S12 — Related Conditions */}
      {relatedConditions.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Related Conditions</span></div>
              <h2 className="sec-title">Conditions we treat.</h2>
            </div>
            <div className="rel-card">
              <div className="rel-head">Related Conditions</div>
              {relatedConditions.map((cond, i) => (
                <a key={i} href={`/conditions/${cond.slug}`} className="rel-row">
                  <span>{cond.name}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S13 — FAQ */}
      {faqs.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>FAQ</span></div>
              <h2 className="sec-title">About {name.toLowerCase()}.</h2>
            </div>
            <div className="faq-list" itemScope itemType="https://schema.org/FAQPage">
              {faqs.map((f, i) => (
                <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <div className="faq-q">
                    <span itemProp="name">{f.question}</span>
                    <div className="faq-toggle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </div>
                  </div>
                  {openFaq === i && (
                    <div className="faq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p itemProp="text">{f.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Band */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <div className="cta-band-content">
            <h2>Ready to take the first step?</h2>
            <p>Get a personalised assessment from an experienced specialist. Understand your options, ask your questions, and decide with confidence.</p>
          </div>
          <div className="cta-band-actions">
            <a href={appointmentUrl} className="cta-primary">
              Book Appointment{' '}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a href={whatsappNumber ? `https://wa.me/${whatsappNumber}` : 'https://wa.me/919999999999'}
               className="cta-secondary" target="_blank" rel="noopener noreferrer">
              WhatsApp Us{' '}
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
            </a>
          </div>
          <div className="cta-band-info">
            {clinicAddress && <span>📍 {clinicAddress}</span>}
            {clinicHours && <span>🕐 {clinicHours}</span>}
          </div>
        </div>
      </section>
    </>
  )
}

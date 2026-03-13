/**
 * lib/transform.ts
 * Transforms raw portal config (s00-s23 JSONB from Supabase) into the full
 * ClinicConfig shape that the website template expects.
 *
 * All auto-computed fields are derived here (no logic scattered in components).
 * Falls back to sane defaults if a field is missing.
 */

import type { ClinicConfig, ClinicInfo, DoctorInfo, HeroSection } from './types'

// ─── Gradient cycles ──────────────────────────────────────────────────────────
const GRAD_CLASSES  = ['grad-teal', 'grad-blue', 'grad-deep', 'grad-warm']
const GRAD_STRINGS  = [
  'linear-gradient(145deg,var(--secondary-deep),var(--secondary))',
  'linear-gradient(145deg,var(--secondary),var(--primary))',
  'linear-gradient(145deg,var(--primary),var(--primary-dark))',
  'linear-gradient(145deg,var(--secondary-dark),var(--primary-dark))',
  'linear-gradient(145deg,var(--primary-dark),var(--secondary-deep))',
  'linear-gradient(145deg,var(--secondary-deep),var(--primary))',
]
const TEAM_GRADS    = [
  'linear-gradient(160deg,var(--secondary-deep) 0%,var(--secondary) 40%,var(--primary) 100%)',
  'linear-gradient(160deg,var(--secondary) 0%,var(--secondary-dark) 40%,var(--primary) 100%)',
  'linear-gradient(160deg,var(--primary) 0%,var(--primary-dark) 40%,var(--secondary) 100%)',
]
const g  = (i: number) => GRAD_CLASSES[i  % GRAD_CLASSES.length]
const gs = (i: number) => GRAD_STRINGS[i  % GRAD_STRINGS.length]
const gt = (i: number) => TEAM_GRADS[i    % TEAM_GRADS.length]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Strip all non-digit chars from phone → whatsapp number */
function toWhatsapp(phone: string): string {
  return (phone || '').replace(/\D/g, '')
}

/** Slug from title: lowercase, replace spaces/special with hyphens */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** "First Last" → "FL" */
function initials(name: string): string {
  const parts = (name || '').trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return (parts[0]?.[0] || 'X').toUpperCase()
}

/** safe string fallback */
const s = (v: unknown, fallback = '') => (typeof v === 'string' && v.trim() ? v.trim() : fallback)
/** safe array fallback */
const a = (v: unknown): any[] => (Array.isArray(v) ? v : [])

// ─── Main transform ───────────────────────────────────────────────────────────

export function transformConfig(raw: Record<string, any>): ClinicConfig {
  const s00 = raw?.s00 ?? raw?.profile   ?? {}
  const s01 = raw?.s01 ?? raw?.contact   ?? {}
  const s02 = raw?.s02 ?? raw?.social    ?? {}
  const s03 = raw?.s03 ?? raw?.doctor    ?? {}
  const s04 = raw?.s04 ?? raw?.stats     ?? {}
  const s05 = raw?.s05 ?? raw?.hero      ?? {}
  const s06 = raw?.s06 ?? raw?.trust     ?? {}
  const s07 = raw?.s07 ?? raw?.why       ?? {}
  const s08 = raw?.s08 ?? raw?.conditions ?? {}
  const s09 = raw?.s09 ?? raw?.procedures ?? {}
  const s10 = raw?.s10 ?? raw?.packages  ?? {}
  const s11 = raw?.s11 ?? raw?.howWeWork ?? {}
  const s12 = raw?.s12 ?? raw?.clinical  ?? {}
  const s13 = raw?.s13 ?? raw?.stories   ?? {}
  const s14 = raw?.s14 ?? raw?.pricing   ?? {}
  const s15 = raw?.s15 ?? raw?.reviews   ?? {}
  const s16 = raw?.s16 ?? raw?.areas     ?? {}
  const s17 = raw?.s17 ?? raw?.faq       ?? {}
  const s18 = raw?.s18 ?? raw?.blog      ?? {}
  const s19 = raw?.s19 ?? raw?.doctorDetail ?? {}
  const s20 = raw?.s20 ?? raw?.team      ?? {}
  const s21 = raw?.s21 ?? raw?.locations ?? {}

  // ── Clinic ────────────────────────────────────────────────────────────────
  const phone    = s(s01.phone, '+91-0000000000')
  const whatsapp = toWhatsapp(phone)
  const mapsUrl  = s(s01.mapsUrl || s01.mapUrl, '')
  const website  = s(s01.website, '')

  const clinic: ClinicInfo = {
    name:        s(s00.clinicName, 'Clinic'),
    tagline:     s(s00.tagline, ''),
    phone,
    whatsapp,
    email:       s(s01.email, ''),
    address:     s(s01.address, ''),
    city:        s(s01.city, ''),
    area:        s(s01.area, ''),
    street:      s(s01.street, ''),
    hospital:    s(s01.hospital, ''),
    hours:       s(s01.hours, ''),
    languages:   s(s01.languages, ''),
    website,
    mapsUrl,
    mapUrl:      mapsUrl,
    mapEmbedUrl: s(s01.mapEmbedUrl, ''),
    social: {
      google:    s(s02.googleUrl, ''),
      facebook:  s(s02.facebookUrl, ''),
      instagram: s(s02.instagramUrl, ''),
      youtube:   s(s02.youtubeUrl, ''),
    },
  }

  // ── Doctor ────────────────────────────────────────────────────────────────
  const doctorName    = s(s03.doctorName, 'Doctor')
  const doctorDegrees = s(s03.degrees, '')

  const doctor: DoctorInfo = {
    name:        doctorName,
    degrees:     doctorDegrees,
    photo:       s(s03.photo, ''),
    gender:      s(s03.gender, 'Male'),
    specialties: a(s03.specialties),
    qualifications: a(s03.qualifications).length
      ? a(s03.qualifications)
      : doctorDegrees.split(/[,·\-]+/).map((d: string) => d.trim()).filter(Boolean),
    languages:   a(s03.languages),
    nmcNumber:         s(s03.nmcNumber, ''),
    registrationNumber: s(s03.nmcNumber, ''),
    ctaLabel:    s(s03.ctaLabel, 'Book Appointment'),
    stats: [
      { number: s(s04.yearsExperience, ''), label: 'Years'      },
      { number: s(s04.patientCount,    ''), label: 'Patients'   },
      { number: s(s04.procedureCount,  ''), label: 'Procedures' },
      { number: s(s04.googleRating, '') + (s04.googleRating ? '\u2605' : ''), label: 'Rating' },
    ],
    details: [
      { icon: 'location', text: `${clinic.name}, ${clinic.area}, ${clinic.city}`, link: mapsUrl },
      { icon: 'clock',    text: clinic.hours },
      { icon: 'language', text: clinic.languages },
    ],
    education:    a(s19.education),
    fellowships:  a(s19.fellowships),
    experience:   a(s19.experience),
    certifications: a(s19.certifications),
    workshops:    a(s19.workshops),
    publications: a(s19.publications),
    awards:       a(s19.awards),
    memberships:  a(s19.memberships),
    faqs:         a(s17.doctorFaqs ?? s17.doctorFaq).map((f: any) => ({
      question: s(f.question, ''),
      answer:   s(f.answer,   ''),
    })),
  }

  // ── Hero ──────────────────────────────────────────────────────────────────
  const rating          = s(s04.googleRating, '5.0')
  const yearsExp        = s(s04.yearsExperience, '')
  const patientCount    = s(s04.patientCount, '')
  const procedureCount  = s(s04.procedureCount, '')

  const hero: HeroSection = {
    label:       s(s05.heroLabel, `${clinic.name} - ${clinic.city}`),
    heading:     s(s05.heroHeading, `Expert ${s00.medicalSpecialty || 'Medical'} Care in`),
    headingEm:   s(s05.heroHeadingEm, clinic.city),
    subtext:     s(s05.heroSubtext, ''),
    tags:        a(s05.heroTags).length ? a(s05.heroTags) : [
      doctorDegrees,
      yearsExp ? `${yearsExp} Years Experience` : '',
      patientCount ? `${patientCount} Patients Treated` : '',
    ].filter(Boolean),
    ctaLabel:    'Book an Appointment',
    ctaHref:     '/appointment',
    stats: [
      { number: yearsExp,       label: 'Years Experience' },
      { number: patientCount,   label: 'Happy Patients'   },
      { number: procedureCount, label: 'Procedures Done'  },
      { number: rating + '\u2605', label: 'Google Rating' },
    ],
    chips: [
      { type: 'rating',     text: `${rating} Google Rating`   },
      { type: 'experience', text: yearsExp ? `${yearsExp} Years` : '' },
      { type: 'patients',   text: patientCount ? `${patientCount} Patients` : '' },
    ],
  }

  // ── Trust Strip ───────────────────────────────────────────────────────────
  const trustStrip = a(s06.trustItems).length
    ? a(s06.trustItems).map((t: any) => ({ icon: s(t.icon, ''), text: s(t.text, '') }))
    : []

  // ── Why Choose ────────────────────────────────────────────────────────────
  const WHY_COLORS = ['teal', 'blue', 'deep', 'green'] as const
  const WHY_ICONS  = ['pulse', 'clock', 'user', 'check']
  const whyChoose = a(s07.whyChoose ?? s07.items).map((w: any, i: number) => ({
    iconColor:   WHY_COLORS[i % 4] as 'teal' | 'blue' | 'deep' | 'green',
    iconType:    WHY_ICONS[i % 4],
    title:       s(w.title, ''),
    description: s(w.description, ''),
  }))

  // ── Conditions ────────────────────────────────────────────────────────────
  const conditionList = a(s08.conditions ?? s08.items)
  const conditions = conditionList.map((c: any, i: number) => {
    const slug = s(c.slug, slugify(s(c.title, `condition-${i}`)))
    return {
      href:        `/conditions/${slug}`,
      gradClass:   g(i),
      iconType:    ['activity', 'shield', 'pulse', 'droplet'][i % 4],
      label:       s(c.title, ''),
      title:       s(c.title, ''),
      description: s(c.descriptionShort ?? c.description, ''),
    }
  })

  const servicesConditions = conditionList.map((c: any, i: number) => {
    const slug = s(c.slug, slugify(s(c.title, `condition-${i}`)))
    return {
      title:       s(c.title, ''),
      description: s(c.descriptionLong ?? c.description, ''),
      slug,
      gradient:    gs(i),
    }
  })

  // ── Procedures ────────────────────────────────────────────────────────────
  const PROC_ICONS = ['briefcase', 'zap', 'search', 'shield', 'tool', 'activity']
  const procedureList = a(s09.procedures ?? s09.items)
  const procedures = procedureList.map((p: any, i: number) => {
    const slug = s(p.slug, slugify(s(p.title, `procedure-${i}`)))
    return {
      href:        `/procedures/${slug}`,
      gradClass:   g(i),
      iconType:    PROC_ICONS[i % PROC_ICONS.length],
      label:       s(p.title, ''),
      title:       s(p.title, ''),
      description: s(p.descriptionShort ?? p.description, ''),
    }
  })

  const servicesProcedures = procedureList.map((p: any, i: number) => {
    const slug = s(p.slug, slugify(s(p.title, `procedure-${i}`)))
    return {
      title:       s(p.title, ''),
      description: s(p.descriptionLong ?? p.description, ''),
      slug,
      gradient:    gs(i),
    }
  })

  // ── Packages ──────────────────────────────────────────────────────────────
  const PKG_ICONS = ['box', 'tool', 'briefcase', 'zap', 'activity']
  const packageList = a(s10.packages ?? s10.items)
  const packages = packageList.map((p: any, i: number) => {
    const slug = s(p.slug, slugify(s(p.title, `package-${i}`)))
    return {
      href:        `/packages/${slug}`,
      gradClass:   g(i),
      iconType:    PKG_ICONS[i % PKG_ICONS.length],
      title:       s(p.title, ''),
      description: s(p.description, ''),
      price:       s(p.price, ''),
      tags:        a(p.tags),
    }
  })

  const productPackages = packageList.map((p: any, i: number) => {
    const slug = s(p.slug, slugify(s(p.title, `package-${i}`)))
    return {
      name:        s(p.title, ''),
      description: s(p.description, ''),
      slug,
      gradient:    gs(i),
      price:       s(p.price, ''),
      includes:    a(p.includes ?? p.tags),
    }
  })

  // ── How We Work ───────────────────────────────────────────────────────────
  const HWW_ICONS = ['message', 'search', 'file', 'check-circle']
  const howWeWork = a(s11.steps ?? s11.items).map((step: any, i: number) => ({
    badge:       `Step ${String(i + 1).padStart(2, '0')}`,
    iconType:    HWW_ICONS[i % HWW_ICONS.length],
    title:       s(step.title, ''),
    description: s(step.description, ''),
  }))

  // ── Clinical Info ─────────────────────────────────────────────────────────
  const CLI_FIXED = [
    { colorClass: 'cl-green', iconType: 'pulse', title: 'Success Rates' },
    { colorClass: 'cl-amber', iconType: 'alert', title: 'Possible Risks' },
    { colorClass: 'cl-blue',  iconType: 'info',  title: 'Side Effects'  },
  ] as const
  const clinicalKeys = [
    [s12.successRates,  s12.successRatesNote],
    [s12.risks,         s12.risksNote],
    [s12.sideEffects,   s12.sideEffectsNote],
  ]
  const clinicalInfo = CLI_FIXED.map((fixed, i) => ({
    ...fixed,
    description: s(clinicalKeys[i][0] ?? (s12.cards?.[i]?.description), ''),
    note:        s(clinicalKeys[i][1] ?? (s12.cards?.[i]?.note),        ''),
  }))

  // ── Patient Stories ───────────────────────────────────────────────────────
  const storyList = a(s13.stories ?? s13.items)
  const patientStories = storyList.map((story: any, i: number) => ({
    gradClass: g(i),
    duration:  s(story.duration, ''),
    title:     s(story.title, ''),
    tag:       s(story.tag, ''),
    videoUrl:  s(story.videoUrl, ''),
  }))

  const successStories = {
    videoCount:     s(s13.videoCount, `${storyList.length}+`),
    conditionCount: s(s13.conditionCount, ''),
    rating,
    stories: storyList.map((story: any, i: number) => ({
      gradient:    gs(i),
      duration:    s(story.duration, ''),
      tag:         s(story.tag, ''),
      tagType:     (story.tagType === 'condition' ? 'condition' : 'procedure') as 'condition' | 'procedure',
      category:    s(story.category, ''),
      title:       s(story.title, ''),
      description: s(story.description, ''),
    })),
  }

  // ── Pricing ───────────────────────────────────────────────────────────────
  const PRC_FIXED = [
    { barClass: 'acc-teal',   iconType: 'dollar',      title: 'Upfront Pricing'  },
    { barClass: 'acc-blue',   iconType: 'credit-card', title: 'EMI Available'    },
    { barClass: 'acc-vibrant',iconType: 'shield',      title: 'Insurance Support'},
  ] as const
  const pricingRaw = a(s14.cards ?? s14.items)
  const pricing = PRC_FIXED.map((fixed, i) => ({
    ...fixed,
    description: s(pricingRaw[i]?.description, ''),
    points:      a(pricingRaw[i]?.points),
  }))

  // ── Reviews ───────────────────────────────────────────────────────────────
  const reviewList = a(s15.reviews ?? s15.items)
  const reviews = reviewList.map((r: any, i: number) => ({
    initials: s(r.initials, initials(s(r.name, ''))),
    name:     s(r.name, ''),
    date:     s(r.date, ''),
    text:     s(r.text, ''),
    gradient: gs(i),
  }))

  const reviewScore = s(s04.googleRating, '5.0')
  const reviewCount = s(s04.reviewCount, '')
  const googleUrl   = s(s02.googleUrl || s15.googleUrl, '')

  const reviewSummary = {
    score:     reviewScore,
    count:     reviewCount ? `Based on ${reviewCount} Google Reviews` : '',
    googleUrl,
  }

  const testimonials = {
    rating:      reviewScore,
    reviewCount,
    googleUrl,
    reviews,
  }

  // ── Local Areas ───────────────────────────────────────────────────────────
  const areaList = a(s16.areas ?? s16.items)
  const localAreas = areaList.map((ar: any) => ({
    name:     s(ar.name, ''),
    slug:     s(ar.slug, slugify(s(ar.name, ''))),
    distance: s(ar.distance, ''),
    duration: s(ar.duration, ''),
  }))

  // ── FAQ ───────────────────────────────────────────────────────────────────
  const faq = a(s17.faq ?? s17.items).map((f: any) => ({
    question: s(f.question, ''),
    answer:   s(f.answer,   ''),
  }))

  // ── Blog ──────────────────────────────────────────────────────────────────
  // Blog posts are fetched from Supabase at runtime by blog/page.tsx.
  // Here we only populate preview cards if pre-seeded in config.
  const blog = a(s18.posts ?? s18.items).map((b: any, i: number) => ({
    href:      `/blog/${s(b.slug, slugify(s(b.title, `post-${i}`)))}`,
    gradStyle: gs(i),
    date:      s(b.date, ''),
    title:     s(b.title, ''),
    excerpt:   s(b.excerpt, ''),
  }))

  // ── CTA Band ──────────────────────────────────────────────────────────────
  const ctaBand = {
    heading:       s(s05.ctaHeading, 'Ready to take the first step?'),
    subtext:       s(s05.ctaSubtext, ''),
    primaryLabel:  'Book Appointment',
    primaryHref:   '/appointment',
    secondaryLabel:'WhatsApp Us',
    secondaryHref: `https://wa.me/${whatsapp}`,
    infoItems:     [
      clinic.area ? `${clinic.area}, ${clinic.city}` : clinic.city,
      clinic.hours,
    ].filter(Boolean),
    info: [
      clinic.area ? `${clinic.area}, ${clinic.city}` : clinic.city,
      clinic.hours,
    ].filter(Boolean),
  }

  // ── Team ──────────────────────────────────────────────────────────────────
  const team = a(s20.members ?? s20.items).map((m: any, i: number) => ({
    name:           s(m.name, ''),
    designation:    s(m.designation, ''),
    qualifications: a(m.qualifications),
    experience:     s(m.experience, ''),
    schedule:       s(m.schedule, ''),
    gradient:       gt(i),
    isLead:         Boolean(m.isLead),
  }))

  // ── Locations ─────────────────────────────────────────────────────────────
  const locations = a(s21.locations ?? s21.items).map((loc: any) => ({
    name:        s(loc.name, ''),
    slug:        s(loc.slug, slugify(s(loc.name, ''))),
    address:     s(loc.address, ''),
    phone:       s(loc.phone, phone),
    hours:       s(loc.hours, clinic.hours),
    mapUrl:      s(loc.mapUrl, ''),
    mapEmbedUrl: s(loc.mapEmbedUrl, ''),
    isPrimary:   Boolean(loc.isPrimary),
  }))

  // ── Optional Pages ────────────────────────────────────────────────────────
  const optionalPages = {
    gallery:      Boolean(s00.galleryEnabled),
    testimonials: Boolean(s00.testimonialsEnabled ?? true),
  }

  // ── Brand ─────────────────────────────────────────────────────────────────
  const brand = {
    primaryColor:   s(s00.primaryColor,   '#0d7a5f'),
    secondaryColor: s(s00.secondaryColor, '#1a4ea0'),
  }

  // ── Assemble ──────────────────────────────────────────────────────────────
  return {
    brand,
    clinic,
    doctor,
    hero,
    trustStrip,
    whyChoose,
    conditions,
    procedures,
    packages,
    howWeWork,
    clinicalInfo,
    patientStories,
    pricing,
    reviews,
    reviewSummary,
    localAreas,
    faq,
    blog,
    ctaBand,
    services: {
      conditions: servicesConditions,
      procedures: servicesProcedures,
    },
    productPackages,
    testimonials,
    successStories,
    areas:        localAreas,
    team,
    locations,
    optionalPages,
  }
}

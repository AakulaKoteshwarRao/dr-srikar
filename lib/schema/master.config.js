/**
 * SCHEMA CONFIG — maps default.json clinic data to the schema system
 * Single source of truth for all structured data.
 * NEVER hardcode values here — always read from default.json via `d`
 */

import defaultData from '../../data/default.json'

const d = defaultData

// Build language array from the comma/·-separated string in default.json
// e.g. "English · Hindi · Telugu" → [{ name: "English", code: "en" }, ...]
const LANG_CODES = { english: 'en', hindi: 'hi', telugu: 'te', tamil: 'ta', kannada: 'kn', malayalam: 'ml', marathi: 'mr', bengali: 'bn', gujarati: 'gu', punjabi: 'pa', urdu: 'ur', odia: 'or' }
function parseLangs(str) {
  if (!str) return [{ name: '[Language]', code: 'xx' }]
  return str.split(/[·,\/]/).map(s => s.trim()).filter(Boolean).map(name => ({
    name,
    code: LANG_CODES[name.toLowerCase()] || name.slice(0,2).toLowerCase()
  }))
}
const clinicLanguages = parseLangs(d.clinic.languages || d.doctor.languages?.join(' · '))
const doctorLanguages = d.doctor.languages
  ? d.doctor.languages.map(name => ({ name, code: LANG_CODES[name.toLowerCase()] || name.slice(0,2).toLowerCase() }))
  : clinicLanguages

export const schemaConfig = {

  site: {
    url:       d.clinic.website || 'https://[domain].com',
    blogPath:  '/blog',
    searchUrl: '/search?q={search_term_string}',
  },

  clinic: {
    name:           d.clinic.name,
    alternateName:  d.clinic.tagline || d.clinic.name,
    logo:           `${d.clinic.website}/images/logo.png`,
    logoWidth:      400,
    logoHeight:     80,
    image:          `${d.clinic.website}/images/clinic.jpg`,
    imageWidth:     1200,
    imageHeight:    800,
    description:    `${d.clinic.name} — ${d.clinic.tagline}`,
    email:          d.clinic.email,
    telephone:      d.clinic.phone,
    foundingDate:   d.entity?.foundingDate || '',
    priceRange:     '$$',
    specialty:      d.entity?.medicalSpecialty || d.doctor?.experience?.[0]?.role || 'Medical Practice',
    serviceType:    d.entity?.medicalSpecialty ? d.entity.medicalSpecialty + ' Service' : 'Medical Service',
    mapUrl:         d.clinic.mapsUrl || d.clinic.mapUrl,
    bookingUrl:     `${d.clinic.website}/appointment`,
    currenciesAccepted: 'INR',
    paymentAccepted:    'Cash, Credit Card, Debit Card, UPI',
    languages:      clinicLanguages,
    address: {
      street:  d.clinic.street  || d.clinic.address,
      city:    d.clinic.city    || '',
      state:   d.entity?.registrationState || '',
      pincode: d.clinic.pincode || '',
      country: 'IN',
    },
    geo: {
      latitude:  d.clinic.geo?.latitude  || 0,
      longitude: d.clinic.geo?.longitude || 0,
    },
    hours: d.clinic.hoursSchema || [],
    social: {
      google: d.reviewSummary?.googleUrl || d.clinic.website || '',
    },
    rating: {
      value: parseFloat(d.reviewSummary?.score) || 0,
      count: parseInt(d.reviewSummary?.count) || 0,
      best:  5,
      worst: 1,
    },
    faq: (d.faq || []).slice(0, 6).map(f => ({
      q: f.question,
      a: f.answer,
    })),
  },

  doctor: {
    name:               d.doctor.name,
    honorificPrefix:    'Dr.',
    image:              d.doctor.photo || `${d.clinic.website}/images/doctor.jpg`,
    imageWidth:         800,
    imageHeight:        800,
    jobTitle:           d.doctor.experience?.[0]?.role || d.entity?.medicalSpecialty || 'Medical Specialist',
    gender:             d.doctor.gender || '',
    description:        `${d.doctor.name} — ${d.doctor.degrees}`,
    email:              d.clinic.email,
    profilePath:        '/about',
    registrationNumber: d.doctor.registrationNumber || d.doctor.nmcNumber || '',
    degrees:            (d.doctor.qualifications || []).map(q => ({
      name: q, institution: '', level: 'Postgraduate'
    })),
    awards:      d.doctor.awards || [],
    memberships: d.doctor.memberships || [],
    knowsAbout:  d.doctor.specialties || (d.conditions || []).slice(0, 4).map(c => c.title || c.label),
    languages:   doctorLanguages,
  },

  reviews: (d.reviews || []).slice(0, 5).map(r => ({
    author: r.name,
    rating: 5,
    text:   r.text,
    date:   r.date || '',
  })),

  services: (d.services?.conditions || []).map(s => ({
    slug:        s.slug,
    name:        s.title,
    description: s.description || s.title,
    output:      `Improved ${s.title.toLowerCase()} outcomes`,
    areas:       d.localAreas?.map(a => a.name) || [],
    offer: {
      price:       0,
      description: `Consultation for ${s.title}`,
    },
    faq: [],
  })),

  procedures: (d.procedures || []).map(p => {
    const slug = p.href?.replace('/procedures/', '') || p.label?.toLowerCase().replace(/\s+/g, '-')
    return {
      slug,
      name:              p.title || p.label,
      alternateName:     p.label,
      description:       p.description,
      type:              'SurgicalProcedure',
      bodyLocation:      d.entity?.bodyLocation || '',
      preparation:       'Consult your doctor before the procedure.',
      followup:          'Follow post-operative care instructions.',
      howPerformed:      p.description,
      prognosis:         'Outcomes vary; consult your physician.',
      contraindications: [],
      cost: { price: 0, minPrice: 0, maxPrice: 0 },
      faq: [],
    }
  }),

  conditions: (d.conditions || []).map(c => {
    const slug = c.href?.replace('/conditions/', '') || c.label?.toLowerCase().replace(/\s+/g, '-')
    return {
      slug,
      name:          c.title || c.label,
      alternateName: c.label,
      description:   c.description,
      icdCode:       '',
      anatomy:       d.entity?.bodyLocation || '',
      symptoms:      [],
      treatments:    [],
      risks:         [],
      complications: [],
      epidemiology:  '',
      prognosis:     '',
      faq: [],
    }
  }),

  locations: (d.localAreas || []).slice(0, 5).map(area => ({
    slug:        area.slug,
    name:        `${d.doctor.name} — ${d.entity?.medicalSpecialty || 'Specialist'} in ${area.name}`,
    area:        area.name,
    areasServed: [area.name],
    url:         `${d.clinic.website}/locations/${area.slug}`,
    faq: [],
  })),

}

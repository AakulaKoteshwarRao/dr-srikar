/**
 * CORE SCHEMAS — WebSite + MedicalClinic + Physician
 *
 * N9:  WebSite.publisher added → MedicalClinic
 * N10: MedicalClinic.logo ImageObject gets @id
 * N11: MedicalClinic.image ImageObject gets @id
 * N12: Review nodes get @id
 * N2:  contactPoint.contactType: 'customer service' → 'customer support'
 * N13: Physician.honorificPrefix added
 * N14: Physician.alumniOf added from degrees
 * N23: actionPlatform uses https://schema.org/
 */

import { ids, DAY_URLS } from "./ids.js"

// ── 1. WebSite ─────────────────────────────────────────────────────────────
export function websiteSchema(config) {
  const ID = ids(config.site.url, config.site.blogPath)
  return {
    "@type": "WebSite",
    "@id":   ID.website,
    "name":  config.clinic.name,
    "url":   config.site.url,
    // N9: publisher links WebSite to Organization — Google knowledge panel benefit
    "publisher": { "@id": ID.clinic },
    "potentialAction": {
      "@type":       "SearchAction",
      "target":      `${config.site.url}${config.site.searchUrl}`,
      "query-input": "required name=search_term_string",
    },
  }
}

// ── 2. MedicalClinic ───────────────────────────────────────────────────────
export function clinicSchema(config) {
  const ID      = ids(config.site.url, config.site.blogPath)
  const { clinic } = config

  return {
    "@type":         ["MedicalClinic", "MedicalOrganization"],
    "@id":           ID.clinic,
    "name":          clinic.name,
    "alternateName": clinic.alternateName,
    "url":           config.site.url,

    // N10: logo @id for knowledge panel cross-reference
    "logo": {
      "@type":  "ImageObject",
      "@id":    ID.clinicLogo,
      "url":    clinic.logo,
      "width":  clinic.logoWidth  || 600,
      "height": clinic.logoHeight || 60,
    },

    // N11: clinic image @id
    "image": {
      "@type":  "ImageObject",
      "@id":    ID.clinicImage,
      "url":    clinic.image,
      "width":  clinic.imageWidth  || 1200,
      "height": clinic.imageHeight || 800,
    },

    "description":        clinic.description,
    "email":              clinic.email,
    "telephone":          clinic.telephone,
    "foundingDate":       clinic.foundingDate,
    "priceRange":         clinic.priceRange,
    "medicalSpecialty":   `https://schema.org/${clinic.specialty}`,
    "currenciesAccepted": clinic.currenciesAccepted,
    "paymentAccepted":    clinic.paymentAccepted,
    "hasMap":             clinic.mapUrl,

    "address": {
      "@type":           "PostalAddress",
      "streetAddress":   clinic.address.street,
      "addressLocality": clinic.address.city,
      "addressRegion":   clinic.address.state,
      "postalCode":      clinic.address.pincode,
      "addressCountry":  clinic.address.country,
    },

    "geo": {
      "@type":    "GeoCoordinates",
      "latitude":  clinic.geo.latitude,    // N8: Number in config
      "longitude": clinic.geo.longitude,   // N8: Number in config
    },

    "contactPoint": {
      "@type":       "ContactPoint",
      "telephone":   clinic.telephone,
      // N2: 'customer support' is Google's recommended value (not 'customer service')
      "contactType": "customer support",
      "availableLanguage": clinic.languages.map(l => l.name),
      "areaServed":        clinic.address.country,
    },

    "openingHoursSpecification": clinic.hours.map(h => ({
      "@type":     "OpeningHoursSpecification",
      "dayOfWeek": h.days.map(d => DAY_URLS[d] || d),
      "opens":     h.opens,
      "closes":    h.closes,
    })),

    "aggregateRating": {
      "@type":       "AggregateRating",
      "ratingValue": clinic.rating.value,   // N22: Number in config
      "reviewCount": clinic.rating.count,   // N22: Number in config
      "bestRating":  clinic.rating.best,    // N22: Number in config
      "worstRating": clinic.rating.worst,   // N22: Number in config
    },

    // N12: Review nodes get @id
    "review": config.reviews.map((r, i) => ({
      "@type": "Review",
      "@id":   `${config.site.url}/#review-${i}`,
      "author": {
        "@type": "Person",
        "name":  r.author,
      },
      "reviewRating": {
        "@type":       "Rating",
        "ratingValue": r.rating,       // N22: Number in config
        "bestRating":  clinic.rating.best,
        "worstRating": clinic.rating.worst,
      },
      "reviewBody":    r.text,
      "datePublished": r.date,
      "itemReviewed":  { "@id": ID.clinic },
    })),

    "sameAs": Object.values(clinic.social),

    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type":          "EntryPoint",
        "urlTemplate":    clinic.bookingUrl,
        // N23: https:// instead of http://
        "actionPlatform": [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      "name": "Book Appointment",
    },

    "employee": { "@id": ID.doctor },
  }
}

// ── 3. Physician ───────────────────────────────────────────────────────────
export function physicianSchema(config) {
  const ID             = ids(config.site.url, config.site.blogPath)
  const { doctor, clinic } = config

  return {
    // Person added so all Person properties (honorificPrefix, jobTitle, gender,
    // worksFor, alumniOf, knowsLanguage) are valid — fixes all validator warnings.
    // Physician is a subtype of MedicalBusiness; adding Person makes it a
    // multi-typed node that satisfies the employee property expectation too.
    "@type": ["Physician", "Person"],
    "@id":   ID.doctor,
    "name":  doctor.name,
    // N13: honorificPrefix for E-E-A-T
    ...(doctor.honorificPrefix && { "honorificPrefix": doctor.honorificPrefix }),

    "image": {
      "@type":  "ImageObject",
      "@id":    ID.doctorImage,
      "url":    doctor.image,
      "width":  doctor.imageWidth,
      "height": doctor.imageHeight,
    },

    "url":         `${config.site.url}${doctor.profilePath}`,
    "jobTitle":    doctor.jobTitle,
    "description": doctor.description,
    "gender":      `https://schema.org/${doctor.gender}`,
    "email":       doctor.email,
    "telephone":   clinic.telephone,

    "identifier": {
      "@type": "PropertyValue",
      "name":  "Medical Registration Number",
      "value": doctor.registrationNumber,
    },

    "medicalSpecialty": `https://schema.org/${clinic.specialty}`,
    "worksFor":          { "@id": ID.clinic },

    "hasCredential": doctor.degrees.map(d => ({
      "@type":            "EducationalOccupationalCredential",
      "name":             d.name,
      "educationalLevel": d.level,
      "recognizedBy": {
        "@type": "EducationalOrganization",
        "name":  d.institution,
      },
    })),

    // N14: alumniOf — E-E-A-T trust signal, distinct from hasCredential
    "alumniOf": doctor.degrees
      .filter((d, i, arr) => arr.findIndex(x => x.institution === d.institution) === i)  // deduplicate institutions
      .map(d => ({
        "@type": "EducationalOrganization",
        "name":  d.institution,
      })),

    "memberOf": doctor.memberships.map(m => ({
      "@type": "MedicalOrganization",
      "name":  m,
    })),

    "award":      doctor.awards,
    "knowsAbout": doctor.knowsAbout,

    "knowsLanguage": doctor.languages.map(l => ({
      "@type":         "Language",
      "name":          l.name,
      "alternateName": l.code,
    })),

    "aggregateRating": {
      "@type":       "AggregateRating",
      "ratingValue": clinic.rating.value,
      "reviewCount": clinic.rating.count,
      "bestRating":  clinic.rating.best,
      "worstRating": clinic.rating.worst,
    },

    "sameAs": [
      clinic.social.linkedin,
      clinic.social.practo,
    ],

    "availableService": config.services.map(s => ({
      "@id":  ID.service(s.slug),
      "name": s.name,
    })),
  }
}

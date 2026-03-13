import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { schemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import AppointmentHero from '@/components/appointment/AppointmentHero'
import AppointmentForm from '@/components/appointment/AppointmentForm'
import ClinicStrip from '@/components/appointment/ClinicStrip'
import WhatToExpect from '@/components/appointment/WhatToExpect'
import { getConfig } from '@/lib/config'
import Footer from '@/components/Footer'
import '../styles/appointment.css'

export default function AppointmentPage() {
  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'home',
    pageData: {},
    video: undefined,
    meta: {
      path:        '/appointment',
      name:        `Book Appointment | ${schemaConfig.clinic.name}`,
      description: schemaConfig.clinic.description,
      image:       schemaConfig.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: schemaConfig.site.url, path: '/' },
        { name: 'Book Appointment', url: schemaConfig.site.url + '/appointment', path: '/appointment' },
      ],
    },
  })

  const cfg = getConfig()
  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <AppointmentHero />
        <AppointmentForm clinic={cfg.clinic} />
        <ClinicStrip clinic={cfg.clinic} />
        <WhatToExpect />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}

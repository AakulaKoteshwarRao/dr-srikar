import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { schemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import DoctorHero from '@/components/doctor/DoctorHero'
import CredentialsGrid from '@/components/doctor/CredentialsGrid'
import DoctorFAQ from '@/components/doctor/DoctorFAQ'
import { getConfig } from '@/lib/config'
import Footer from '@/components/Footer'
import '../styles/doctor.css'

export default function DoctorPage() {
  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'doctor',
    meta: {
      path:        '/doctor',
      name:        `${schemaConfig.doctor.name} | ${schemaConfig.clinic.name}`,
      description: schemaConfig.clinic.description,
      image:       schemaConfig.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: schemaConfig.site.url, path: '/' },
        { name: schemaConfig.doctor.name, url: schemaConfig.site.url + '/doctor', path: '/doctor' },
      ],
    },
  })

  const cfg = getConfig()
  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <DoctorHero doctor={cfg.doctor} clinic={cfg.clinic} />
        <CredentialsGrid doctor={cfg.doctor} clinic={cfg.clinic} />
        <DoctorFAQ faqs={cfg.doctor.faqs} />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}

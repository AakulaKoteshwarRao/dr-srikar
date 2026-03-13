import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { schemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import ServicesHero from '@/components/services/ServicesHero'
import ConditionsGrid from '@/components/services/ConditionsGrid'
import EarlyTreatment from '@/components/services/EarlyTreatment'
import ProceduresGrid from '@/components/services/ProceduresGrid'
import ServicesFAQ from '@/components/services/ServicesFAQ'
import { getConfig } from '@/lib/config'
import Footer from '@/components/Footer'
import '../styles/services.css'

export default function ServicesPage() {
  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'home',
    pageData: {},
    video: undefined,
    meta: {
      path:        '/services',
      name:        `Services | ${schemaConfig.clinic.name}`,
      description: schemaConfig.clinic.description,
      image:       schemaConfig.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: schemaConfig.site.url, path: '/' },
        { name: 'Services', url: schemaConfig.site.url + '/services', path: '/services' },
      ],
    },
  })

  const cfg = getConfig()
  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <ServicesHero />
        <ConditionsGrid conditions={cfg.services.conditions} />
        <EarlyTreatment />
        <ProceduresGrid procedures={cfg.services.procedures} />
        <ServicesFAQ />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}

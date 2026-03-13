import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { schemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import AboutHero from '@/components/about/AboutHero'
import Approach from '@/components/about/Approach'
import Infrastructure from '@/components/about/Infrastructure'
import Credentials from '@/components/about/Credentials'
import Achievements from '@/components/about/Achievements'
import Affiliations from '@/components/about/Affiliations'
import Insurance from '@/components/about/Insurance'
import AboutFAQ from '@/components/about/AboutFAQ'
import LocationStrip from '@/components/about/LocationStrip'
import { getConfig } from '@/lib/config'
import Footer from '@/components/Footer'
import '../styles/about.css'

export default function AboutPage() {
  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'home',
    pageData: {},
    video: undefined,
    meta: {
      path:        '/about',
      name:        `About ${schemaConfig.clinic.name}`,
      description: schemaConfig.clinic.description,
      image:       schemaConfig.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: schemaConfig.site.url, path: '/' },
        { name: `About ${schemaConfig.clinic.name}`, url: schemaConfig.site.url + '/about', path: '/about' },
      ],
    },
  })

  const cfg = getConfig()
  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <AboutHero clinic={cfg.clinic} />
        <Approach />
        <Infrastructure />
        <Credentials doctor={cfg.doctor} clinic={cfg.clinic} />
        <Achievements clinic={cfg.clinic} />
        <Affiliations clinic={cfg.clinic} />
        <Insurance clinic={cfg.clinic} />
        <AboutFAQ clinic={cfg.clinic} />
        <LocationStrip clinic={cfg.clinic} />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}

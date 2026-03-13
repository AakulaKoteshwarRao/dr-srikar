import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { schemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import LocationsHero from '@/components/locations/LocationsHero'
import LocationIntro from '@/components/locations/LocationIntro'
import ClinicDetails from '@/components/locations/ClinicDetails'
import MapEmbed from '@/components/locations/MapEmbed'
import HowToReach from '@/components/locations/HowToReach'
import ServicesAtLocation from '@/components/locations/ServicesAtLocation'
import AreasGrid from '@/components/locations/AreasGrid'
import DoctorAuthority from '@/components/locations/DoctorAuthority'
import LocationReviews from '@/components/locations/LocationReviews'
import LocationFAQ from '@/components/locations/LocationFAQ'
import InternalLinks from '@/components/locations/InternalLinks'
import { getConfig } from '@/lib/config'
import Footer from '@/components/Footer'
import '../styles/locations.css'

export default function LocationsPage() {
  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'home',
    pageData: {},
    video: undefined,
    meta: {
      path:        '/locations',
      name:        `Locations | ${schemaConfig.clinic.name}`,
      description: schemaConfig.clinic.description,
      image:       schemaConfig.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: schemaConfig.site.url, path: '/' },
        { name: 'Locations', url: schemaConfig.site.url + '/locations', path: '/locations' },
      ],
    },
  })

  const cfg = getConfig()
  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <LocationsHero clinic={cfg.clinic} />
        <LocationIntro clinic={cfg.clinic} doctor={cfg.doctor} />
        <ClinicDetails clinic={cfg.clinic} />
        <MapEmbed clinic={cfg.clinic} />
        <HowToReach />
        <ServicesAtLocation />
        <AreasGrid areas={cfg.areas} clinic={cfg.clinic} />
        <DoctorAuthority doctor={cfg.doctor} />
        <LocationReviews />
        <LocationFAQ />
        <InternalLinks areas={cfg.areas} doctorName={cfg.doctor.name} />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}

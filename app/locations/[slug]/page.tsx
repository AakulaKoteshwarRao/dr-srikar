import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { schemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import { getConfig } from '@/lib/config'
import Footer from '@/components/Footer'
import LocationSpoke from '@/components/location/LocationSpoke'
import '../../styles/location-spoke.css'

export default function LocationSpokePage({ params }: { params?: { slug?: string } }) {
  const _path = `/locations/${params?.slug || ''}`
  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'location',
    pageData: {},
    video: undefined,
    pageData: { slug: params?.slug },
    meta: {
      path:        _path,
      name:        `${schemaConfig.clinic.specialty} in ${params?.slug?.replace(/-/g,' ')?.replace(/\b\w/g,c=>c.toUpperCase()) || 'Location'} | ${schemaConfig.clinic.name}`,
      description: schemaConfig.clinic.description,
      image:       schemaConfig.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: schemaConfig.site.url, path: '/' },
        { name: 'Locations', url: schemaConfig.site.url + '/locations', path: '/locations' },
        { name: params?.slug || '', url: schemaConfig.site.url + _path, path: _path },
      ],
    },
  })

  const cfg = getConfig()
  const areaName = params?.slug?.replace(/-/g, ' ')?.replace(/\b\w/g, c => c.toUpperCase()) || 'Local Area'

  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <LocationSpoke clinic={cfg.clinic} doctor={cfg.doctor} area={{ name: areaName, slug: params?.slug || '' }} />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}

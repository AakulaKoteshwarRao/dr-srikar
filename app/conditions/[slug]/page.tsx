import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { schemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import Footer from '@/components/Footer'
import ConditionDetail from '@/components/condition/ConditionDetail'
import { getConfig } from '@/lib/config'
import '../../styles/conditions.css'

export default function ConditionDetailPage({ params }: { params?: { slug?: string } }) {
  const _path = `/conditions/${params?.slug || ''}`
  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'condition',
    pageData: { slug: params?.slug },
    video: undefined,
    meta: {
      path:        _path,
      name:        `Condition: ${params?.slug?.replace(/-/g,' ')?.replace(/\b\w/g,c=>c.toUpperCase()) || 'Condition'} | ${schemaConfig.clinic.name}`,
      description: schemaConfig.clinic.description,
      image:       schemaConfig.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: schemaConfig.site.url, path: '/' },
        { name: 'Conditions', url: schemaConfig.site.url + '/conditions', path: '/conditions' },
        { name: params?.slug || '', url: schemaConfig.site.url + _path, path: _path },
      ],
    },
  })

  const cfg = getConfig()
  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <ConditionDetail />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}

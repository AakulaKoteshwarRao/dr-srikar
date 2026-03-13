import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { schemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import Footer from '@/components/Footer'
import ProcedureDetail from '@/components/procedure/ProcedureDetail'
import { getConfig } from '@/lib/config'
import '../../styles/procedures.css'

export default function ProcedureDetailPage({ params }: { params?: { slug?: string } }) {
  const _path = `/procedures/${params?.slug || ''}`
  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'procedure',
    pageData: {},
    video: undefined,
    pageData: { slug: params?.slug },
    meta: {
      path:        _path,
      name:        `Procedure: ${params?.slug?.replace(/-/g,' ')?.replace(/\b\w/g,c=>c.toUpperCase()) || 'Procedure'} | ${schemaConfig.clinic.name}`,
      description: schemaConfig.clinic.description,
      image:       schemaConfig.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: schemaConfig.site.url, path: '/' },
        { name: 'Procedures', url: schemaConfig.site.url + '/procedures', path: '/procedures' },
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
        <ProcedureDetail />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}

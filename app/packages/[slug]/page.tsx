import { notFound } from 'next/navigation'
import { loadConfig } from '@/lib/config'
import PackageDetail from '@/components/package/PackageDetail'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'

interface PageParams { params: { slug: string } }

export async function generateStaticParams() {
  const config = await loadConfig()
  return (config.packages ?? []).map((pk: any) => ({ slug: pk.slug }))
}

export default async function PackageDetailPage({ params }: PageParams) {
  const config = await loadConfig()
  const pkg = (config.packages ?? []).find((pk: any) => pk.slug === params.slug)
  if (!pkg) notFound()

  return (
    <>
      <Header />
      <StickyBar />
      <PackageDetail pkg={pkg} config={config} />
      <CTABand />
      <Footer />
    </>
  )
}

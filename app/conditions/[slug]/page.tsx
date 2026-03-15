import { notFound } from 'next/navigation'
import { loadConfig } from '@/lib/config'
import ConditionDetail from '@/components/condition/ConditionDetail'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'

interface PageParams { params: { slug: string } }

export async function generateStaticParams() {
  const config = await loadConfig()
  return (config.conditions ?? []).map((c: any) => ({ slug: c.slug }))
}

export default async function ConditionDetailPage({ params }: PageParams) {
  const config = await loadConfig()
  const condition = (config.conditions ?? []).find((c: any) => c.slug === params.slug)
  if (!condition) notFound()

  return (
    <>
      <Header />
      <StickyBar />
      <ConditionDetail condition={condition} config={config} />
      <CTABand />
      <Footer />
    </>
  )
}

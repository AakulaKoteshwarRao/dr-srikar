import Header from '@/components/Header'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import ProductsHero from '@/components/products/ProductsHero'
import PackagesGrid from '@/components/products/PackagesGrid'
import PricingTransparency from '@/components/products/PricingTransparency'
import PackageTestimonials from '@/components/products/PackageTestimonials'
import GuidanceSection from '@/components/products/GuidanceSection'
import ProductsFAQ from '@/components/products/ProductsFAQ'
import { getConfig } from '@/lib/config'
import Footer from '@/components/Footer'
import '../styles/products.css'

export default function ProductsPage() {
  const cfg = getConfig()
  return (
    <>
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <ProductsHero />
        <PackagesGrid packages={cfg.productPackages} />
        <PricingTransparency />
        <PackageTestimonials />
        <GuidanceSection clinic={cfg.clinic} />
        <ProductsFAQ />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}

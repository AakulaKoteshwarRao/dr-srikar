import Header from '@/components/Header'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import TeamHero from '@/components/team/TeamHero'
import TeamCarousel from '@/components/team/TeamCarousel'
import TeamFAQ from '@/components/team/TeamFAQ'
import { getConfig } from '@/lib/config'
import Footer from '@/components/Footer'
import '../styles/team.css'

export default function TeamPage() {
  const cfg = getConfig()
  return (
    <>
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <TeamHero />
        <TeamCarousel members={cfg.team} />
        <TeamFAQ clinic={cfg.clinic} />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}

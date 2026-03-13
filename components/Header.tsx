'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ClinicInfo } from '@/lib/types'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/doctor', label: 'Doctor' },
  { href: '/team', label: 'Team' },
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/locations', label: 'Locations' },
  { href: '/blog', label: 'Blog' },
]

export default function Header({ clinic }: { clinic: ClinicInfo }) {
  const pathname = usePathname()
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--secondary, #1E3A8A), var(--primary, #F97316))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginRight: '0.6rem', flexShrink: 0
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" style={{ width: 24, height: 24 }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--secondary, #1E3A8A)', lineHeight: 1.2 }}>
            Logo<br/>
            <span style={{ fontWeight: 400, fontSize: '0.72rem', color: '#9CA3AF' }}>Placeholder</span>
          </span>
        </Link>
        <nav className="nav">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

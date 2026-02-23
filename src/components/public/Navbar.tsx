'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'
import { MenuIcon } from './icons'
import { MobileMenu } from './MobileMenu'
import { CcCleanLogo } from './CcCleanLogo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-neu-bg transition-shadow duration-300 ${scrolled ? 'shadow-neu' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <CcCleanLogo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {siteConfig.navigation.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-body-sm font-medium uppercase tracking-wider text-gray-700 hover:text-cyan-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/admin/dashboard"
                className="ml-4 px-6 py-2.5 bg-neu-bg text-cyan-600 font-semibold rounded-xl shadow-neu hover:shadow-neu-inset active:shadow-neu-inset transition-shadow duration-200"
              >
                Portal Administrador
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:text-cyan-600 transition-colors"
              aria-label="Abrir menú"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useStructuredData } from '@/lib/seo'
import { Footer } from './Footer'
import { FloatingWhatsApp, MobileBottomNav, StickyCartBar } from './MobileBars'
import { Navbar } from './Navbar'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
  return null
}

export function Layout() {
  useStructuredData()
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-lg bg-brand-700 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main" className="pb-24 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <StickyCartBar />
      <MobileBottomNav />
      <FloatingWhatsApp />
    </>
  )
}

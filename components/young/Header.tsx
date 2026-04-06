'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import YULogo from './YULogo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [footballOpen, setFootballOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-club-black shadow-lg border-b border-club-gray-mid' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="container-yu">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <YULogo size={40} className="group-hover:scale-105 transition-transform duration-200" />
            <div className="hidden sm:block">
              <p className="text-white font-black uppercase text-sm leading-tight tracking-wider">Young</p>
              <p className="text-club-red font-black uppercase text-sm leading-tight tracking-wider">Universitario</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="nav-link">Inicio</Link>
            <div className="relative" onMouseEnter={() => setFootballOpen(true)} onMouseLeave={() => setFootballOpen(false)}>
              <button className="nav-link flex items-center gap-1">
                Fútbol <ChevronDown size={14} className={`transition-transform duration-200 ${footballOpen ? 'rotate-180' : ''}`} />
              </button>
              {footballOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-club-dark border border-club-gray-mid rounded shadow-xl">
                  <Link href="/futbol/mayores" className="block px-4 py-3 text-white hover:text-club-red hover:bg-club-gray transition-colors text-sm font-medium uppercase tracking-wide">Primera División</Link>
                  <Link href="/futbol/reserva" className="block px-4 py-3 text-white hover:text-club-red hover:bg-club-gray transition-colors text-sm font-medium uppercase tracking-wide border-t border-club-gray-mid">Reserva</Link>
                </div>
              )}
            </div>
            <Link href="/hockey" className="nav-link">Hockey</Link>
            <Link href="/basquetbol" className="nav-link">Básquetbol</Link>
            <a href="https://www.instagram.com/younguniversitario/" target="_blank" rel="noopener noreferrer" className="btn-club-red py-2 px-5 text-xs">Instagram</a>
          </nav>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white hover:text-club-red transition-colors p-2" aria-label="Menú">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-club-black border-t border-club-gray-mid">
          <nav className="container-yu py-4 flex flex-col gap-1">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-white hover:text-club-red font-medium uppercase tracking-wider text-sm border-b border-club-gray-mid">Inicio</Link>
            <div>
              <button onClick={() => setFootballOpen(!footballOpen)} className="w-full flex items-center justify-between py-3 px-2 text-white hover:text-club-red font-medium uppercase tracking-wider text-sm border-b border-club-gray-mid">
                Fútbol <ChevronDown size={14} className={`transition-transform ${footballOpen ? 'rotate-180' : ''}`} />
              </button>
              {footballOpen && (
                <div className="bg-club-dark">
                  <Link href="/futbol/mayores" onClick={() => setIsMenuOpen(false)} className="block py-3 px-6 text-club-muted hover:text-club-red text-sm uppercase tracking-wide border-b border-club-gray-mid">Primera División</Link>
                  <Link href="/futbol/reserva" onClick={() => setIsMenuOpen(false)} className="block py-3 px-6 text-club-muted hover:text-club-red text-sm uppercase tracking-wide border-b border-club-gray-mid">Reserva</Link>
                </div>
              )}
            </div>
            <Link href="/hockey" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-white hover:text-club-red font-medium uppercase tracking-wider text-sm border-b border-club-gray-mid">Hockey</Link>
            <Link href="/basquetbol" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-white hover:text-club-red font-medium uppercase tracking-wider text-sm border-b border-club-gray-mid">Básquetbol</Link>
            <a href="https://www.instagram.com/younguniversitario/" target="_blank" rel="noopener noreferrer" className="mt-3 btn-club-red text-center">Seguinos en Instagram</a>
          </nav>
        </div>
      )}
    </header>
  )
}

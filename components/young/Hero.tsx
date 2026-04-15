'use client'
import Link from 'next/link'
import YULogo from './YULogo'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-club-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #CC0000 0, #CC0000 1px, transparent 0, transparent 50%)', backgroundSize: '40px 40px' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-club-red opacity-10 blur-3xl rounded-full" />
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-club-red opacity-[0.08] blur-3xl rounded-full" />
      </div>
      <div className="relative z-10 container-yu text-center py-32">
        <div className="flex justify-center mb-10 animate-fade-in">
          <YULogo size={140} className="drop-shadow-2xl animate-bounce-gentle" />
        </div>
        <div className="animate-slide-up">
          <h1 className="heading-xl text-white mb-2">Young</h1>
          <h1 className="heading-xl text-club-red mb-8">Universitario</h1>
        </div>
        <p className="text-club-muted text-lg md:text-xl font-medium tracking-widest uppercase mb-12 animate-fade-in">Pasión · Esfuerzo · Comunidad</p>
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-16 bg-club-red" />
          <div className="w-2 h-2 bg-club-red rotate-45" />
          <div className="h-px w-16 bg-club-red" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {['Fútbol Mayores', 'Fútbol Reserva', 'Hockey', 'Básquetbol'].map((sport) => (
            <span key={sport} className="px-4 py-1.5 border border-club-gray-light text-club-muted text-xs font-semibold uppercase tracking-widest rounded">{sport}</span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/futbol" className="btn-club-red">Ver Fútbol</Link>
          <a href="https://www.instagram.com/younguniversitario/" target="_blank" rel="noopener noreferrer" className="btn-club-outline">Seguinos</a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-club-red to-transparent" />

      {/* Indicador centrado */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex flex-col items-center gap-2 animate-bounce-gentle">
          <span className="text-club-muted text-xs uppercase tracking-widest">Explorar</span>
          <div className="w-px h-8 bg-club-gray-light" />
        </div>
      </div>
    </section>
  )
}

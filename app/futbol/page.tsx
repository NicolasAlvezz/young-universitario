import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/young/Header'
import Footer from '@/components/young/Footer'

export const metadata = {
  title: 'Fútbol | Young Universitario',
  description: 'Equipos de Fútbol de Young Universitario - Primera División y Reserva.',
}

export default function FutbolPage() {
  return (
    <main className="min-h-screen bg-club-black">
      <Header />
      <section className="relative pt-32 pb-20 bg-club-dark overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-club-red" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-club-red opacity-10 blur-3xl rounded-full" />
        <div className="container-yu relative text-center">
          <div className="flex justify-center mb-8">
            <Image src="/futbol.png" alt="Fútbol" width={80} height={80} className="object-contain w-20 h-20" />
          </div>
          <h1 className="heading-lg text-white mb-6">Fútbol</h1>
          <div className="divider-red mx-auto mb-8" />
          <p className="text-club-muted text-lg max-w-xl mx-auto">El fútbol de Young Universitario compite en la División D de la Liga Universitaria de Uruguay de Deportes. Seleccioná tu equipo.</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-yu">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Link href="/futbol/mayores" className="card-sport group relative overflow-hidden">
              <div className="h-2 bg-club-red w-full" />
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-club-gray rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-club-red transition-colors duration-300">
                  <span className="text-white font-black text-2xl">1°</span>
                </div>
                <h2 className="heading-sm text-white mb-3 group-hover:text-club-red transition-colors">Primera División</h2>
                <p className="text-club-muted text-sm">Experiencia y calidad en cada partido.</p>
                <div className="mt-8 flex items-center justify-center gap-2 text-club-red text-sm font-bold uppercase tracking-wider">
                  <span>Ver equipo</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </Link>
            <Link href="/futbol/reserva" className="card-sport group relative overflow-hidden">
              <div className="h-2 bg-club-red w-full" />
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-club-gray rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-club-red transition-colors duration-300">
                  <span className="text-white font-black text-2xl">R</span>
                </div>
                <h2 className="heading-sm text-white mb-3 group-hover:text-club-red transition-colors">Reserva</h2>
                <p className="text-club-muted text-sm">Jóvenes que sueñan con llegar a la primera.</p>
                <div className="mt-8 flex items-center justify-center gap-2 text-club-red text-sm font-bold uppercase tracking-wider">
                  <span>Ver equipo</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

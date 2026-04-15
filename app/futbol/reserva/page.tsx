import Image from 'next/image'
import Header from '@/components/young/Header'
import Footer from '@/components/young/Footer'
import Link from 'next/link'
import StandingsTable from '@/components/young/StandingsTable'

export const metadata = { title: 'Fútbol Reserva | Young Universitario' }

export const dynamic = 'force-dynamic'

export default function FutbolReservaPage() {
  return (
    <main className="min-h-screen bg-club-black">
      <Header />

      <section className="relative pt-32 pb-20 bg-club-dark overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-club-red" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-club-red opacity-10 blur-3xl rounded-full" />
        <div className="container-yu relative text-center">
          <div className="flex justify-center mb-8 opacity-80">
            <Image src="/logo-futbol.png" alt="Fútbol" width={80} height={80} className="object-contain w-20 h-20" priority />
          </div>
          <p className="text-club-red text-sm font-bold uppercase tracking-widest mb-3">Fútbol</p>
          <h1 className="heading-lg text-white mb-6">Reserva</h1>
          <div className="divider-red mx-auto mb-8" />
          <p className="text-club-muted text-lg max-w-2xl mx-auto">
            El semillero de Young Universitario. Jóvenes talentos que compiten en la Liga Universitaria, trabajando cada día para llegar a Primera.
          </p>
        </div>
      </section>

      <div className="bg-club-black border-b border-club-gray-mid">
        <div className="container-yu py-3 flex items-center gap-2 text-xs text-club-muted uppercase tracking-widest">
          <Link href="/" className="hover:text-club-red transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/futbol" className="hover:text-club-red transition-colors">Fútbol</Link>
          <span>/</span>
          <span className="text-white">Reserva</span>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-yu">
          <div className="mb-16">
            <StandingsTable disciplina="Futbol Reserva" titulo="Tabla de posiciones" />
          </div>

          <div className="bg-club-dark border border-club-gray-mid rounded-lg p-8 text-center">
            <p className="text-club-muted text-sm uppercase tracking-widest">Fixture y plantel</p>
            <p className="text-club-gray-light text-xs mt-2">Próximamente vamos a mostrar el fixture oficial y el plantel de Reserva.</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

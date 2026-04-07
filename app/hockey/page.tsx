import Image from 'next/image'
import Header from '@/components/young/Header'
import Footer from '@/components/young/Footer'
import Link from 'next/link'

export const metadata = { title: 'Hockey | Young Universitario' }

interface HockeyPlayer {
  name: string
  matches: number
  goals: number
}

const players: HockeyPlayer[] = [
  { name: 'Pilar Stirling', matches: 2, goals: 5 },
  { name: 'Maia Tacain', matches: 2, goals: 3 },
  { name: 'Cristina Artola', matches: 2, goals: 1 },
  { name: 'Dorotea Stirling', matches: 1, goals: 1 },
  { name: 'Ana Gonzales', matches: 2, goals: 0 },
  { name: 'Maria Stirling', matches: 2, goals: 0 },
  { name: 'Delfina Mescia', matches: 2, goals: 0 },
  { name: 'Matilde La Paz', matches: 2, goals: 0 },
  { name: 'Ernestina Echezarreta', matches: 2, goals: 0 },
  { name: 'Sofia Lopez', matches: 2, goals: 0 },
  { name: 'Ernestina Guerra', matches: 2, goals: 0 },
  { name: 'Malena Sere', matches: 2, goals: 0 },
  { name: 'Mariela Torena', matches: 2, goals: 0 },
  { name: 'Milagros Wilson', matches: 1, goals: 0 },
  { name: 'Milagros Brit', matches: 1, goals: 0 },
  { name: 'Manuela Burgeño', matches: 1, goals: 0 },
  { name: 'Sol Mescia', matches: 1, goals: 0 },
  { name: 'Maria Paz Gorgalez', matches: 1, goals: 0 },
  { name: 'Guillermina Scremini', matches: 1, goals: 0 },
  { name: 'Lara Wornicov', matches: 1, goals: 0 },
  { name: 'Paula Grecco', matches: 1, goals: 0 },
  { name: 'Carmela De Leon', matches: 0, goals: 0 },
  { name: 'Guillermina Stirling', matches: 0, goals: 0 },
  { name: 'Agustina Turban', matches: 0, goals: 0 },
  { name: 'Paula Comunales', matches: 0, goals: 0 },
  { name: 'Yuliana Fernandez', matches: 0, goals: 0 },
  { name: 'Celeste Indarte', matches: 0, goals: 0 },
  { name: 'Juana Montandon', matches: 0, goals: 0 },
  { name: 'Florence Wallace', matches: 0, goals: 0 },
]

interface FixtureMatch {
  fecha: number
  opponent: string
  isHome: boolean
}

const fixture: FixtureMatch[] = [
  { fecha: 1, opponent: 'UCU Hockey', isHome: false },
  { fecha: 2, opponent: 'PSG', isHome: true },
  { fecha: 3, opponent: 'Águilas', isHome: false },
  { fecha: 4, opponent: 'Colegio Inglés', isHome: true },
  { fecha: 5, opponent: 'Independiente', isHome: false },
  { fecha: 6, opponent: 'ELF', isHome: true },
]

const pretemporada: FixtureMatch = { fecha: 0, opponent: 'Arena Hockey', isHome: true }

const totalGoals = players.reduce((sum, p) => sum + p.goals, 0)
const totalPlayers = players.length
const activePlayers = players.filter(p => p.matches > 0).length

export default function HockeyPage() {
  return (
    <main className="min-h-screen bg-club-black">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-club-dark overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-club-red" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-club-red opacity-10 blur-3xl rounded-full" />
        <div className="container-yu relative text-center">
          <div className="flex justify-center mb-8 opacity-80">
            <Image src="/hockey.png" alt="Hockey" width={80} height={80} className="object-contain w-20 h-20" />
          </div>
          <h1 className="heading-lg text-white mb-6">Hockey</h1>
          <div className="divider-red mx-auto mb-8" />
          <p className="text-club-muted text-lg max-w-2xl mx-auto">Fundado en 2025, el hockey es la segunda disciplina competitiva de Young Universitario. Desde su primera temporada, el equipo crece con pasión, compromiso y espíritu competitivo.</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-club-black border-b border-club-gray-mid">
        <div className="container-yu py-3 flex items-center gap-2 text-xs text-club-muted uppercase tracking-widest">
          <Link href="/" className="hover:text-club-red transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-white">Hockey</span>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-yu">
          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-4 mb-16 max-w-2xl mx-auto">
            <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-center hover:border-club-red transition-colors">
              <div className="text-3xl md:text-4xl font-black text-club-red mb-1">{totalPlayers}</div>
              <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">Jugadoras</div>
            </div>
            <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-center hover:border-club-red transition-colors">
              <div className="text-3xl md:text-4xl font-black text-club-red mb-1">{totalGoals}</div>
              <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">Goles</div>
            </div>
            <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-center hover:border-club-red transition-colors">
              <div className="text-3xl md:text-4xl font-black text-club-red mb-1">2</div>
              <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">Fechas</div>
            </div>
          </div>

          {/* Fixture */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-club-red rounded" />
              <h2 className="heading-sm text-white">Fixture</h2>
              <span className="text-club-muted text-xs uppercase tracking-widest ml-auto">Temporada 2026</span>
            </div>

            {/* Pre-temporada */}
            <div className="mb-4">
              <p className="text-club-muted text-xs uppercase tracking-widest font-semibold mb-3 px-1">Pretemporada</p>
              <div className="bg-club-dark border border-club-gray-mid rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-club-gray rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-club-muted text-xs font-bold">PRE</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className={`text-sm font-semibold ${pretemporada.isHome ? 'text-white' : 'text-club-muted'}`}>Young U</span>
                    <span className="text-club-red text-xs font-black uppercase tracking-wider">vs</span>
                    <span className={`text-sm font-semibold ${!pretemporada.isHome ? 'text-white' : 'text-club-muted'}`}>{pretemporada.opponent}</span>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded font-semibold uppercase bg-club-red text-white flex-shrink-0">Local</span>
              </div>
            </div>

            {/* Fechas regulares */}
            <div className="space-y-3">
              {fixture.map((match) => (
                <div key={match.fecha} className="bg-club-dark border border-club-gray-mid rounded-lg p-4 flex items-center justify-between hover:border-club-red/50 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-club-gray rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-club-red text-sm font-black">F{match.fecha}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {match.isHome ? (
                        <>
                          <span className="text-white text-sm font-semibold">Young U</span>
                          <span className="text-club-red text-xs font-black uppercase tracking-wider">vs</span>
                          <span className="text-club-muted text-sm font-semibold">{match.opponent}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-club-muted text-sm font-semibold">{match.opponent}</span>
                          <span className="text-club-red text-xs font-black uppercase tracking-wider">vs</span>
                          <span className="text-white text-sm font-semibold">Young U</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold uppercase flex-shrink-0 ${match.isHome ? 'bg-club-red text-white' : 'bg-club-gray text-club-muted'}`}>
                    {match.isHome ? 'Local' : 'Visitante'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Goleadoras */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-club-red rounded" />
                  <h2 className="heading-sm text-white">Goleadoras</h2>
                </div>
                <div className="space-y-3">
                  {players.filter(p => p.goals > 0).sort((a, b) => b.goals - a.goals).map((p, i) => (
                    <div key={p.name} className="bg-club-dark border border-club-gray-mid rounded p-4 flex items-center justify-between hover:border-club-red transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded flex items-center justify-center font-black text-sm flex-shrink-0 ${i === 0 ? 'bg-club-red text-white' : 'bg-club-gray text-club-red'}`}>
                          {i + 1}°
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{p.name}</p>
                          <p className="text-club-muted text-xs">{p.matches} {p.matches === 1 ? 'partido' : 'partidos'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-club-red font-black text-2xl">{p.goals}</span>
                        <p className="text-club-muted text-xs uppercase tracking-wide">{p.goals === 1 ? 'gol' : 'goles'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plantel completo */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-club-red rounded" />
                  <h2 className="heading-sm text-white">Plantel Completo</h2>
                  <span className="text-club-muted text-xs uppercase tracking-widest ml-auto">Estadísticas — 2 fechas</span>
                </div>

                {/* Table header */}
                <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 text-club-muted text-xs uppercase tracking-widest font-semibold border-b border-club-gray-mid mb-2">
                  <div className="col-span-6">Jugadora</div>
                  <div className="col-span-3 text-center">PJ</div>
                  <div className="col-span-3 text-center">Goles</div>
                </div>

                <div className="space-y-1.5">
                  {players.map((p) => (
                    <div key={p.name} className="grid grid-cols-12 gap-2 bg-club-dark border border-club-gray-mid rounded px-4 py-3 items-center hover:border-club-red/50 transition-colors">
                      <div className="col-span-6 sm:col-span-6">
                        <p className="text-white font-medium text-sm truncate">{p.name}</p>
                      </div>
                      <div className="col-span-3 sm:col-span-3 text-center">
                        <span className="text-white font-semibold text-sm">{p.matches}</span>
                        <span className="sm:hidden text-club-muted text-xs ml-1">PJ</span>
                      </div>
                      <div className="col-span-3 sm:col-span-3 text-center">
                        <span className={`font-bold text-sm ${p.goals > 0 ? 'text-club-red' : 'text-club-muted'}`}>{p.goals}</span>
                        <span className="sm:hidden text-club-muted text-xs ml-1">G</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-club-red rounded" />
                  <h2 className="heading-sm text-white">Rivales</h2>
                </div>
                <div className="space-y-2">
                  {['Arena Hockey', 'UCU Hockey', 'PSG', 'Águilas', 'Colegio Inglés', 'Independiente', 'ELF'].map((rival, i) => (
                    <div key={rival} className="bg-club-dark border border-club-gray-mid rounded px-4 py-3 flex items-center gap-3 hover:border-club-red/50 transition-colors">
                      <span className="text-club-red font-black text-xs w-5">{i + 1}</span>
                      <span className="text-white text-sm font-medium">{rival}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-center">
                <p className="text-white font-bold uppercase tracking-wider text-sm mb-3">Seguí al equipo</p>
                <p className="text-club-muted text-xs mb-5">Novedades, fotos y videos en Instagram</p>
                <a href="https://www.instagram.com/younguniversitariohockey/" target="_blank" rel="noopener noreferrer" className="btn-club-red text-xs py-2 px-5 inline-block">@younguniversitariohockey</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

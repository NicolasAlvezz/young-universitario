import type { ReactNode } from 'react'
import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'

interface Player { number: string; name: string; position: string }
interface Match { date: string; opponent: string; location: string; isHome: boolean; result?: string }
interface SportPageTemplateProps { sport: string; category?: string; description: string; icon: ReactNode; players?: Player[]; upcomingMatches?: Match[]; results?: Match[] }

function sportBasePath(sport: string): string {
  switch (sport) {
    case 'Fútbol':
      return '/futbol'
    case 'Hockey':
      return '/hockey'
    case 'Básquetbol':
      return '/basquetbol'
    default:
      return `/${sport.toLowerCase()}`
  }
}

export default function SportPageTemplate({ sport, category, description, icon, players = [], upcomingMatches = [], results = [] }: SportPageTemplateProps) {
  const sportHref = sportBasePath(sport)
  return (
    <main className="min-h-screen bg-club-black">
      <Header />
      <section className="relative pt-32 pb-20 bg-club-dark overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-club-red" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-club-red opacity-10 blur-3xl rounded-full" />
        <div className="container-yu relative text-center">
          <div className="flex justify-center mb-8 text-white opacity-80">{icon}</div>
          {category && <p className="text-club-red text-sm font-bold uppercase tracking-widest mb-3">{sport}</p>}
          <h1 className="heading-lg text-white mb-6">{category || sport}</h1>
          <div className="divider-red mx-auto mb-8" />
          <p className="text-club-muted text-lg max-w-2xl mx-auto">{description}</p>
        </div>
      </section>
      <div className="bg-club-black border-b border-club-gray-mid">
        <div className="container-yu py-3 flex items-center gap-2 text-xs text-club-muted uppercase tracking-widest">
          <Link href="/" className="hover:text-club-red transition-colors">Inicio</Link>
          <span>/</span>
          <Link href={sportHref} className="hover:text-club-red transition-colors">{sport}</Link>
          {category && <><span>/</span><span className="text-white">{category}</span></>}
        </div>
      </div>
      <div className="section-padding">
        <div className="container-yu">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-8"><div className="w-1 h-8 bg-club-red rounded" /><h2 className="heading-sm text-white">Plantel</h2></div>
                {players.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {players.map((p, i) => (
                      <div key={i} className="bg-club-dark border border-club-gray-mid rounded p-4 flex items-center gap-4 hover:border-club-red transition-colors">
                        <div className="w-10 h-10 bg-club-gray rounded flex items-center justify-center text-club-red font-black text-sm flex-shrink-0">{p.number}</div>
                        <div><p className="text-white font-semibold text-sm">{p.name}</p><p className="text-club-muted text-xs uppercase tracking-wide">{p.position}</p></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-club-dark border border-club-gray-mid rounded-lg p-12 text-center">
                    <p className="text-club-muted text-sm uppercase tracking-widest">Plantel en actualización</p>
                    <p className="text-club-gray-light text-xs mt-2">Próximamente se publicará el plantel completo</p>
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-8"><div className="w-1 h-8 bg-club-red rounded" /><h2 className="heading-sm text-white">Últimos Resultados</h2></div>
                {results.length > 0 ? (
                  <div className="space-y-3">
                    {results.map((m, i) => (
                      <div key={i} className="bg-club-dark border border-club-gray-mid rounded p-4 flex items-center justify-between">
                        <div><p className="text-white font-semibold text-sm">{m.isHome ? 'Young Universitario' : m.opponent} vs {m.isHome ? m.opponent : 'Young Universitario'}</p><p className="text-club-muted text-xs mt-1">{m.date} · {m.location}</p></div>
                        {m.result && <span className="text-club-red font-black text-lg">{m.result}</span>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-club-dark border border-club-gray-mid rounded-lg p-12 text-center"><p className="text-club-muted text-sm uppercase tracking-widest">Sin resultados disponibles</p></div>
                )}
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6"><div className="w-1 h-8 bg-club-red rounded" /><h2 className="heading-sm text-white">Próximos Partidos</h2></div>
                {upcomingMatches.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingMatches.map((m, i) => (
                      <div key={i} className="bg-club-dark border border-club-gray-mid rounded p-4">
                        <p className="text-club-red text-xs font-bold uppercase tracking-wider mb-2">{m.date}</p>
                        <p className="text-white font-semibold text-sm">{m.opponent}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs px-2 py-0.5 rounded font-semibold uppercase ${m.isHome ? 'bg-club-red text-white' : 'bg-club-gray text-club-muted'}`}>{m.isHome ? 'Local' : 'Visitante'}</span>
                          <span className="text-club-muted text-xs">{m.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-club-dark border border-club-gray-mid rounded-lg p-8 text-center"><p className="text-club-muted text-sm uppercase tracking-widest">Sin fixture disponible</p><p className="text-club-gray-light text-xs mt-2">Los partidos se publicarán próximamente</p></div>
                )}
              </div>
              <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-center">
                <p className="text-white font-bold uppercase tracking-wider text-sm mb-3">Seguí al equipo</p>
                <p className="text-club-muted text-xs mb-5">Novedades, fotos y videos en Instagram</p>
                <a href="https://www.instagram.com/younguniversitario/" target="_blank" rel="noopener noreferrer" className="btn-club-red text-xs py-2 px-5 inline-block">@younguniversitario</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

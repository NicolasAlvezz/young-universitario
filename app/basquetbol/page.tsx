import Image from 'next/image'
import Header from '@/components/young/Header'
import Footer from '@/components/young/Footer'
import Link from 'next/link'
import {
  getBasquetStats,
  getMatchSummaries,
  getPlayerScoring,
  getUniqueJornadasSorted,
  getBasquetStandings,
} from '@/lib/basquet-stats-store'

export const metadata = { title: 'Básquetbol | Young Universitario' }

/** Datos en memoria vía POST; no puede ser estática en build. */
export const dynamic = 'force-dynamic'

export default function BasquetbolPage() {
  const allRows = getBasquetStats()
  const jornadas = getUniqueJornadasSorted()
  const matches = getMatchSummaries()
  const players = getPlayerScoring(jornadas)
  const standings = getBasquetStandings()

  const wins = matches.filter((m) => m.won).length
  const losses = matches.filter((m) => !m.won).length
  const played = matches.length
  const totalPoints = allRows.reduce((s, r) => s + r.puntos, 0)
  const hasData = allRows.length > 0
  const hasStandings = standings.length > 0

  return (
    <main className="min-h-screen bg-club-black">
      <Header />

      <section className="relative pt-32 pb-20 bg-club-dark overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-club-red" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-club-red opacity-10 blur-3xl rounded-full" />
        <div className="container-yu relative text-center">
          <div className="flex justify-center mb-8 opacity-80">
            <Image src="/basquet.png" alt="Básquetbol" width={80} height={80} className="object-contain w-20 h-20" />
          </div>
          <h1 className="heading-lg text-white mb-6">Básquetbol</h1>
          <div className="divider-red mx-auto mb-8" />
          <p className="text-club-muted text-lg max-w-2xl mx-auto">
            Estadísticas y resultados cargados desde el sistema de la liga (n8n → POST). Cuando aún no hay datos enviados, esta sección queda vacía hasta la próxima sincronización.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/estadisticas_basquetbol"
              className="btn-club-red py-3 px-6 text-xs md:text-sm inline-flex items-center gap-2"
            >
              Ver estadísticas de básquetbol
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-club-black border-b border-club-gray-mid">
        <div className="container-yu py-3 flex items-center gap-2 text-xs text-club-muted uppercase tracking-widest">
          <Link href="/" className="hover:text-club-red transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-white">Básquetbol</span>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-yu">
          {!hasData && !hasStandings && (
            <div className="bg-club-dark border border-club-gray-mid rounded-lg p-12 text-center mb-16 max-w-2xl mx-auto">
              <p className="text-club-muted text-sm uppercase tracking-widest mb-2">Sin estadísticas aún</p>
              <p className="text-club-gray-light text-xs leading-relaxed">
                Los datos aparecen cuando n8n envía filas con POST a <span className="text-club-red font-mono text-[11px]">/api/basquetbol-ingest</span>.
              </p>
            </div>
          )}

          {(hasData || hasStandings) && (
            <>
              {hasData && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto">
                <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-center hover:border-club-red transition-colors">
                  <div className="text-3xl md:text-4xl font-black text-club-red mb-1">{wins}-{losses}</div>
                  <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">Récord</div>
                </div>
                <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-center hover:border-club-red transition-colors">
                  <div className="text-3xl md:text-4xl font-black text-club-red mb-1">{played}</div>
                  <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">Partidos</div>
                </div>
                <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-center hover:border-club-red transition-colors">
                  <div className="text-3xl md:text-4xl font-black text-club-red mb-1">{totalPoints}</div>
                  <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">Puntos</div>
                </div>
                <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-center hover:border-club-red transition-colors">
                  <div className="text-3xl md:text-4xl font-black text-club-red mb-1">{players.length}</div>
                  <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">Jugadores</div>
                </div>
                </div>
              )}

              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-club-red rounded" />
                  <h2 className="heading-sm text-white">Tabla de posiciones</h2>
                </div>

                {!hasStandings && (
                  <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-club-muted text-sm">
                    La tabla aún no fue sincronizada. Enviá <span className="text-club-red font-mono text-xs">tabla_posiciones</span> en el POST de ingestión para mostrarla aquí.
                  </div>
                )}

                {hasStandings && (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] border-collapse bg-club-dark border border-club-gray-mid rounded-lg overflow-hidden">
                      <thead>
                        <tr className="text-club-muted text-xs uppercase tracking-widest border-b border-club-gray-mid">
                          <th className="text-left px-4 py-3">Pos</th>
                          <th className="text-left px-4 py-3">Equipo</th>
                          <th className="text-center px-2 py-3">PJ</th>
                          <th className="text-center px-2 py-3">PG</th>
                          <th className="text-center px-2 py-3">PP</th>
                          <th className="text-center px-2 py-3">PF</th>
                          <th className="text-center px-2 py-3">PC</th>
                          <th className="text-center px-2 py-3">PTS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {standings.map((row) => (
                          <tr
                            key={`${row.posicion}-${row.equipo}`}
                            className="border-b border-club-gray-mid/60 last:border-b-0 hover:bg-club-black/30"
                          >
                            <td className="px-4 py-3 text-white font-semibold">{row.posicion}</td>
                            <td className="px-4 py-3 text-white font-medium">{row.equipo}</td>
                            <td className="px-2 py-3 text-center text-club-gray-light">{row.pj}</td>
                            <td className="px-2 py-3 text-center text-club-gray-light">{row.pg}</td>
                            <td className="px-2 py-3 text-center text-club-gray-light">{row.pp}</td>
                            <td className="px-2 py-3 text-center text-club-gray-light">{row.pf}</td>
                            <td className="px-2 py-3 text-center text-club-gray-light">{row.pc}</td>
                            <td className="px-2 py-3 text-center text-club-red font-black">{row.pts}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-club-red rounded" />
                  <h2 className="heading-sm text-white">Fixture</h2>
                </div>

                {!matches.length && (
                  <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-club-muted text-sm mb-8">
                    El fixture aparece cuando se sincronizan partidos en las estadísticas.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {matches.map((m) => (
                    <div
                      key={`${m.jornada}-${m.rival}-${m.fecha}`}
                      className={`rounded-lg p-5 border-2 ${m.won ? 'bg-green-500/5 border-green-500/30' : 'bg-red-500/5 border-red-500/30'}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-club-muted text-xs uppercase tracking-widest font-semibold">{m.jornada}</span>
                        <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${m.won ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                          {m.won ? 'Victoria' : 'Derrota'}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-right flex-1">
                          <p className="text-white font-bold text-sm">Young U</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-black ${m.won ? 'text-green-400' : 'text-red-400'}`}>{m.youngScore}</span>
                          <span className="text-club-muted text-sm font-bold">-</span>
                          <span className={`text-2xl font-black ${!m.won ? 'text-green-400' : 'text-red-400'}`}>{m.opponentScore}</span>
                        </div>
                        <div className="text-left flex-1">
                          <p className="text-club-muted font-bold text-sm truncate">{m.rival}</p>
                        </div>
                      </div>
                      <div className="text-center text-club-muted text-xs">
                        {m.fecha} · {m.cancha}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {hasData && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-1 h-8 bg-club-red rounded" />
                      <h2 className="heading-sm text-white">Anotadores</h2>
                      <span className="text-club-muted text-xs uppercase tracking-widest ml-auto">{jornadas.length} jornadas</span>
                    </div>

                    <div className="overflow-x-auto">
                      <div
                        className="hidden sm:grid gap-2 px-4 py-3 text-club-muted text-xs uppercase tracking-widest font-semibold border-b border-club-gray-mid mb-2 min-w-max"
                        style={{ gridTemplateColumns: `minmax(140px,1fr) repeat(${jornadas.length}, minmax(48px,1fr)) minmax(64px,1fr)` }}
                      >
                        <div>Jugador</div>
                        {jornadas.map((j) => (
                          <div key={j} className="text-center truncate" title={j}>{j}</div>
                        ))}
                        <div className="text-center">Total</div>
                      </div>

                      <div className="space-y-1.5 min-w-max">
                        {players.map((p) => (
                          <div
                            key={p.name}
                            className="grid gap-2 bg-club-dark border border-club-gray-mid rounded px-4 py-3 items-center hover:border-club-red/50 transition-colors sm:grid-flow-col"
                            style={{ gridTemplateColumns: `minmax(140px,1fr) repeat(${jornadas.length}, minmax(48px,1fr)) minmax(64px,1fr)` }}
                          >
                            <div>
                              <p className="text-white font-medium text-sm truncate">{p.name}</p>
                            </div>
                            {jornadas.map((j) => (
                              <div key={j} className="text-center">
                                <span className={`text-sm font-semibold ${(p.byJornada[j] ?? 0) > 0 ? 'text-white' : 'text-club-muted'}`}>
                                  {p.byJornada[j] ?? 0}
                                </span>
                              </div>
                            ))}
                            <div className="text-center">
                              <span className="text-club-red font-black text-lg">{p.total}</span>
                              <span className="text-club-muted text-xs ml-1">pts</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-club-red rounded" />
                      <h2 className="heading-sm text-white">Plantel</h2>
                    </div>
                    <div className="space-y-2">
                      {players.map((p) => (
                        <div key={p.name} className="bg-club-dark border border-club-gray-mid rounded px-4 py-3 hover:border-club-red/50 transition-colors">
                          <span className="text-white text-sm font-medium truncate">{p.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-center">
                    <p className="text-white font-bold uppercase tracking-wider text-sm mb-3">Seguí al equipo</p>
                    <p className="text-club-muted text-xs mb-5">Novedades, fotos y videos en Instagram</p>
                    <a href="https://www.instagram.com/younguniversitario/" target="_blank" rel="noopener noreferrer" className="btn-club-red text-xs py-2 px-5 inline-block">@younguniversitario</a>
                  </div>
                </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

'use client'

import Image from 'next/image'
import Header from '@/components/young/Header'
import Footer from '@/components/young/Footer'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { getSupabase } from '@/lib/supabase/client'
import {
  getBasquetStats,
  getMatchSummaries,
  getPlayerScoring,
  getUniqueJornadasSorted,
} from '@/lib/basquet-stats-store'

/** Datos en memoria vía POST; no puede ser estática en build. */
export const dynamic = 'force-dynamic'

type PosicionRow = {
  posicion: number | null
  equipo: string
  pj: number | null
  pg: number | null
  pe: number | null
  pp: number | null
  pf: number | null
  pc: number | null
  pts: number | null
}

export default function BasquetbolPage() {
  const allRows = getBasquetStats()
  const jornadas = getUniqueJornadasSorted()
  const matches = getMatchSummaries()
  const players = getPlayerScoring(jornadas)

  const wins = matches.filter((m) => m.won).length
  const losses = matches.filter((m) => !m.won).length
  const played = matches.length
  const totalPoints = allRows.reduce((s, r) => s + r.puntos, 0)
  const hasData = allRows.length > 0

  const [posiciones, setPosiciones] = useState<PosicionRow[] | null>(null)
  const [posicionesLoading, setPosicionesLoading] = useState(true)
  const [posicionesError, setPosicionesError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function cargarPosiciones() {
      setPosicionesLoading(true)
      setPosicionesError(null)

      try {
        const supabase = getSupabase()
        if (!supabase) {
          throw new Error('Supabase no está configurado. Cargá NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local.')
        }

        const { data, error } = await supabase
          .from('posiciones')
          .select('posicion, equipo, pj, pg, pe, pp, pf, pc, pts')
          .eq('disciplina', 'Basquetbol')
          .order('posicion', { ascending: true })

        if (error) {
          throw new Error(error.message)
        }

        if (!cancelled) {
          setPosiciones((data ?? []) as PosicionRow[])
        }
      } catch (e) {
        if (!cancelled) {
          setPosicionesError(e instanceof Error ? e.message : 'Error desconocido al cargar posiciones')
          setPosiciones([])
        }
      } finally {
        if (!cancelled) {
          setPosicionesLoading(false)
        }
      }
    }

    cargarPosiciones()
    return () => {
      cancelled = true
    }
  }, [])

  const hasPosiciones = (posiciones?.length ?? 0) > 0

  const emptyStateTabla = useMemo(
    () => (
      <div className="bg-club-dark border border-club-gray-mid rounded-lg p-12 text-center mb-16 max-w-2xl mx-auto">
        <p className="text-club-muted text-sm uppercase tracking-widest mb-2">Sin sincronización aún</p>
        <p className="text-club-gray-light text-xs leading-relaxed">
          La tabla de posiciones aparece al enviar <span className="text-club-red font-mono text-[11px]">tabla_posiciones</span> al endpoint
          <span className="text-club-red font-mono text-[11px]">/api/basquetbol-ingest</span>. El fixture se completará cuando lo implementemos.
        </p>
      </div>
    ),
    [],
  )

  const fixture = [
    { fecha: 'FECHA 1', rival: 'ELBIO FERNANDEZ' },
    { fecha: 'FECHA 2', rival: 'ORT BLANCO' },
    { fecha: 'FECHA 3', rival: 'MARISTAS DEPORTIVO' },
    { fecha: 'FECHA 4', rival: 'OLD BOYS CLUB' },
    { fecha: 'FECHA 5', rival: 'BELLA UNION UNIVERSITARIO' },
    { fecha: 'FECHA 6', rival: 'CLUB BELLAKEO C.B.' },
    { fecha: 'FECHA 7', rival: 'CLUB UNIVERSIDAD CATOLICA' },
    { fecha: 'FECHA 8', rival: 'UNIVERSIDAD DE MONTEVIDEO' },
    { fecha: 'FECHA 9', rival: 'CLUB NAUTICO' },
    { fecha: 'FECHA 10', rival: 'UNIVERSIDAD ORT' },
    { fecha: 'FECHA 11', rival: 'AURIBLANCO BASKETBALL CLUB' },
    { fecha: 'FECHA 12', rival: 'CLUB CHAMPAGNAT RUGBY' },
    { fecha: 'FECHA 13', rival: 'CEIBOS CLUB' },
    { fecha: 'FECHA 14', rival: 'REDUCTO UNIVERSITARIO' },
    { fecha: 'FECHA 15', rival: 'J.M.L.M' },
  ]

  return (
    <main className="min-h-screen bg-club-black">
      <Header />

      <section className="relative pt-32 pb-20 bg-club-dark overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-club-red" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-club-red opacity-10 blur-3xl rounded-full" />
        <div className="container-yu relative text-center">
          <div className="flex justify-center mb-8 opacity-80">
            <Image
              src="/basquetbol-logo.svg"
              alt="Básquetbol"
              width={80}
              height={80}
              className="object-contain w-20 h-20"
              priority
            />
          </div>
          <h1 className="heading-lg text-white mb-6">Básquetbol</h1>
          <div className="divider-red mx-auto mb-8" />
          <p className="text-club-muted text-lg max-w-2xl mx-auto">
            Estadísticas de resultados cargadas automaticamente.
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
          {/* Empty state original cuando no hay estadísticas ni posiciones */}
          {!hasData && !posicionesLoading && !hasPosiciones && !posicionesError && emptyStateTabla}

          {hasData && (
            <>
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
            </>
          )}

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-club-red rounded" />
              <h2 className="heading-sm text-white">Tabla de posiciones</h2>
            </div>

            {posicionesLoading && (
              <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-club-muted text-sm">
                Cargando tabla...
              </div>
            )}

            {!posicionesLoading && posicionesError && (
              <div className="bg-club-dark border border-red-500/40 rounded-lg p-6 text-red-200 text-sm">
                Error al cargar la tabla de posiciones: <span className="font-mono">{posicionesError}</span>
              </div>
            )}

            {!posicionesLoading && !posicionesError && (posiciones?.length ?? 0) === 0 && (
              <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-club-muted text-sm">
                La tabla aún no fue sincronizada. Enviá <span className="text-club-red font-mono text-xs">tabla_posiciones</span> en el POST de ingestión para mostrarla aquí.
              </div>
            )}

            {!posicionesLoading && !posicionesError && hasPosiciones && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse bg-club-dark border border-club-gray-mid rounded-lg overflow-hidden">
                  <thead>
                    <tr className="text-club-muted text-xs uppercase tracking-widest border-b border-club-gray-mid">
                      <th className="text-left px-4 py-3">Pos</th>
                      <th className="text-left px-4 py-3">Equipo</th>
                      <th className="text-center px-2 py-3">PJ</th>
                      <th className="text-center px-2 py-3">PG</th>
                      <th className="text-center px-2 py-3">PE</th>
                      <th className="text-center px-2 py-3">PP</th>
                      <th className="text-center px-2 py-3">PF</th>
                      <th className="text-center px-2 py-3">PC</th>
                      <th className="text-center px-2 py-3">PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posiciones!.map((row) => {
                      const esPrimero = Number(row.posicion ?? -1) === 1
                      return (
                        <tr
                          key={`${row.posicion ?? 'na'}-${row.equipo}`}
                          className={
                            `border-b border-club-gray-mid/60 last:border-b-0 hover:bg-club-black/30 ` +
                            (esPrimero ? 'bg-club-black/40 ring-1 ring-club-red/40' : '')
                          }
                        >
                          <td className="px-4 py-3 text-white font-semibold">
                            <span className={esPrimero ? 'text-club-red font-black' : ''}>{row.posicion ?? '-'}</span>
                          </td>
                          <td className="px-4 py-3 text-white font-medium">
                            <span className={esPrimero ? 'inline-flex items-center gap-2' : ''}>
                              {esPrimero && (
                                <span className="rounded-full bg-club-red/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-club-red">
                                  #1
                                </span>
                              )}
                              {row.equipo}
                            </span>
                          </td>
                          <td className="px-2 py-3 text-center text-club-gray-light">{row.pj ?? 0}</td>
                          <td className="px-2 py-3 text-center text-club-gray-light">{row.pg ?? 0}</td>
                          <td className="px-2 py-3 text-center text-club-gray-light">{row.pe ?? 0}</td>
                          <td className="px-2 py-3 text-center text-club-gray-light">{row.pp ?? 0}</td>
                          <td className="px-2 py-3 text-center text-club-gray-light">{row.pf ?? 0}</td>
                          <td className="px-2 py-3 text-center text-club-gray-light">{row.pc ?? 0}</td>
                          <td className="px-2 py-3 text-center text-club-red font-black">{row.pts ?? 0}</td>
                        </tr>
                      )
                    })}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fixture.map((partido) => (
                <div
                  key={partido.fecha}
                  className="rounded-lg p-5 bg-club-dark border border-club-gray-mid hover:border-club-red/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-club-muted text-xs uppercase tracking-widest font-semibold">
                      {partido.fecha}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded font-bold uppercase bg-club-gray-mid/60 text-white">
                      VS
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-white font-bold text-sm">Young U</p>
                      <p className="text-club-muted text-xs">Local/Visitante a confirmar</p>
                    </div>

                    <div className="text-right min-w-0">
                      <p className="text-white font-bold text-sm truncate" title={partido.rival}>
                        {partido.rival}
                      </p>
                      <p className="text-club-muted text-xs">Cancha/horario a confirmar</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resto del contenido (anotadores/plantel/etc.) */}
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
        </div>
      </div>

      <Footer />
    </main>
  )
}

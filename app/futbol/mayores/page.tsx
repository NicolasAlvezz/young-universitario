import Image from 'next/image'
import Header from '@/components/young/Header'
import Footer from '@/components/young/Footer'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase/client'
import { Suspense } from 'react'

export const metadata = { title: 'Fútbol Primera División | Young Universitario' }

interface FutbolPlayer {
  name: string
  pj: number
  tit: number
  sup: number
  min: number
  goals: number
  yellow: number
  red: number
}

const players: FutbolPlayer[] = [
  { name: 'Aparicio Chiesa', pj: 9, tit: 5, sup: 4, min: 523, goals: 5, yellow: 0, red: 0 },
  { name: 'Agustin Nicolas Santana', pj: 16, tit: 16, sup: 0, min: 1404, goals: 4, yellow: 0, red: 0 },
  { name: 'Esteban David Gagauz', pj: 15, tit: 15, sup: 0, min: 1332, goals: 4, yellow: 0, red: 0 },
  { name: 'Jeremias Silveira', pj: 19, tit: 14, sup: 5, min: 1107, goals: 4, yellow: 0, red: 0 },
  { name: 'Nicolas Alvez', pj: 16, tit: 14, sup: 2, min: 1154, goals: 3, yellow: 0, red: 0 },
  { name: 'William Nicolas Aberasteguy', pj: 14, tit: 10, sup: 4, min: 982, goals: 2, yellow: 0, red: 0 },
  { name: 'Joaquin Viñoly', pj: 16, tit: 9, sup: 7, min: 791, goals: 2, yellow: 0, red: 0 },
  { name: 'Juan Pedro Sabio', pj: 10, tit: 7, sup: 3, min: 612, goals: 2, yellow: 0, red: 0 },
  { name: 'Juan Martin Terra', pj: 11, tit: 6, sup: 5, min: 491, goals: 2, yellow: 0, red: 0 },
  { name: 'Tabare Facundo Ramos', pj: 9, tit: 4, sup: 5, min: 443, goals: 2, yellow: 0, red: 0 },
  { name: 'Nicolas De La Vega', pj: 7, tit: 3, sup: 4, min: 358, goals: 2, yellow: 0, red: 0 },
  { name: 'Rafael Gonzalez', pj: 16, tit: 14, sup: 2, min: 1101, goals: 1, yellow: 0, red: 0 },
  { name: 'Diego Alonso Ramirez', pj: 10, tit: 9, sup: 1, min: 862, goals: 1, yellow: 0, red: 0 },
  { name: 'Vicente Gerfauo', pj: 16, tit: 7, sup: 9, min: 774, goals: 1, yellow: 0, red: 0 },
  { name: 'Gonzalo Fernandez', pj: 14, tit: 11, sup: 3, min: 773, goals: 1, yellow: 0, red: 0 },
  { name: 'Andres Nahuel Bentancor', pj: 7, tit: 5, sup: 2, min: 410, goals: 1, yellow: 0, red: 0 },
  { name: 'Teofilo Arrosa', pj: 4, tit: 0, sup: 4, min: 87, goals: 1, yellow: 0, red: 0 },
  { name: 'Lucas Jose Lafluf', pj: 12, tit: 9, sup: 3, min: 827, goals: 0, yellow: 0, red: 0 },
  { name: 'Matias Nicolas Davyt', pj: 10, tit: 8, sup: 2, min: 779, goals: 0, yellow: 0, red: 2 },
  { name: 'Juan Ignacio Arbiza', pj: 9, tit: 9, sup: 0, min: 621, goals: 0, yellow: 0, red: 0 },
  { name: 'Federico Manuel Young', pj: 6, tit: 6, sup: 0, min: 495, goals: 0, yellow: 0, red: 0 },
  { name: 'Tomas Agustin Santos', pj: 10, tit: 4, sup: 6, min: 479, goals: 0, yellow: 0, red: 0 },
  { name: 'Alfonso Medina', pj: 7, tit: 6, sup: 1, min: 477, goals: 0, yellow: 0, red: 0 },
  { name: 'Nicolas Castroman', pj: 9, tit: 7, sup: 2, min: 455, goals: 0, yellow: 0, red: 0 },
  { name: 'Geronimo Diaz', pj: 6, tit: 5, sup: 1, min: 452, goals: 0, yellow: 0, red: 0 },
  { name: 'Jacinto Benitez', pj: 6, tit: 3, sup: 3, min: 412, goals: 0, yellow: 0, red: 0 },
  { name: 'Nicolas Vila', pj: 4, tit: 4, sup: 0, min: 306, goals: 0, yellow: 0, red: 0 },
  { name: 'Lucas Claassen', pj: 4, tit: 2, sup: 2, min: 237, goals: 0, yellow: 0, red: 0 },
  { name: 'Martin Brun', pj: 5, tit: 2, sup: 3, min: 226, goals: 0, yellow: 0, red: 0 },
  { name: 'Santiago Andres Izaguirre', pj: 5, tit: 3, sup: 2, min: 194, goals: 0, yellow: 0, red: 0 },
  { name: 'Santiago Scremini', pj: 5, tit: 2, sup: 3, min: 182, goals: 0, yellow: 0, red: 0 },
  { name: 'Conrado Heinze', pj: 4, tit: 3, sup: 1, min: 181, goals: 0, yellow: 0, red: 0 },
  { name: 'Francisco Constantin', pj: 2, tit: 2, sup: 0, min: 180, goals: 0, yellow: 0, red: 0 },
  { name: 'Geronimo Vanzini', pj: 6, tit: 0, sup: 6, min: 180, goals: 0, yellow: 0, red: 0 },
  { name: 'Santino Acosta', pj: 3, tit: 2, sup: 1, min: 111, goals: 0, yellow: 0, red: 0 },
  { name: 'Roman Jose Scremini', pj: 3, tit: 0, sup: 3, min: 83, goals: 0, yellow: 0, red: 0 },
  { name: 'Alejo Andres Aizpun', pj: 5, tit: 0, sup: 5, min: 68, goals: 0, yellow: 0, red: 0 },
  { name: 'Joaquin Stirling', pj: 1, tit: 0, sup: 1, min: 34, goals: 0, yellow: 0, red: 0 },
  { name: 'Justino Lafluf', pj: 2, tit: 0, sup: 2, min: 29, goals: 0, yellow: 0, red: 0 },
  { name: 'Cristiano Matias Pignata', pj: 1, tit: 0, sup: 1, min: 24, goals: 0, yellow: 0, red: 0 },
  { name: 'Horacio Ismael Rios', pj: 1, tit: 0, sup: 1, min: 24, goals: 0, yellow: 0, red: 0 },
  { name: 'Simon Jose Fernandez', pj: 1, tit: 0, sup: 1, min: 13, goals: 0, yellow: 0, red: 0 },
  { name: 'Tomas Constantin', pj: 1, tit: 0, sup: 1, min: 10, goals: 0, yellow: 0, red: 0 },
]

interface StandingsTeam {
  pos: number
  name: string
  pj: number
  g: number
  e: number
  p: number
  gf: number
  gc: number
  pts: number
  isYoung?: boolean
}

const standings: StandingsTeam[] = [
  { pos: 1, name: 'Maturana Universitario', pj: 22, g: 16, e: 5, p: 1, gf: 52, gc: 24, pts: 53 },
  { pos: 2, name: 'Danubio FC', pj: 22, g: 12, e: 7, p: 3, gf: 42, gc: 13, pts: 43 },
  { pos: 3, name: 'La 12 Universitaria', pj: 22, g: 11, e: 7, p: 4, gf: 40, gc: 26, pts: 40 },
  { pos: 4, name: 'Crandon Universitario', pj: 22, g: 11, e: 5, p: 6, gf: 43, gc: 26, pts: 38 },
  { pos: 5, name: 'CS Piedras Blancas', pj: 22, g: 11, e: 3, p: 8, gf: 45, gc: 35, pts: 36 },
  { pos: 6, name: 'Young Universitario', pj: 22, g: 9, e: 8, p: 5, gf: 42, gc: 26, pts: 35, isYoung: true },
  { pos: 7, name: 'Numa Turcatti', pj: 22, g: 11, e: 2, p: 9, gf: 42, gc: 36, pts: 35 },
  { pos: 8, name: 'San Eugenio', pj: 22, g: 9, e: 7, p: 6, gf: 47, gc: 31, pts: 34 },
  { pos: 9, name: 'Atl. Limburgo', pj: 22, g: 9, e: 4, p: 9, gf: 36, gc: 41, pts: 31 },
  { pos: 10, name: 'Perry Sexta Univ.', pj: 22, g: 8, e: 6, p: 8, gf: 56, gc: 38, pts: 30 },
  { pos: 11, name: 'Deportivo Morón', pj: 22, g: 8, e: 5, p: 9, gf: 39, gc: 40, pts: 29 },
  { pos: 12, name: 'San Agustín', pj: 22, g: 6, e: 8, p: 8, gf: 33, gc: 38, pts: 26 },
  { pos: 13, name: 'Univ. Verones', pj: 22, g: 5, e: 9, p: 8, gf: 28, gc: 36, pts: 24 },
  { pos: 14, name: 'Jean Piaget', pj: 22, g: 3, e: 7, p: 12, gf: 24, gc: 62, pts: 16 },
  { pos: 15, name: 'Old Sampa Club', pj: 22, g: 3, e: 2, p: 17, gf: 18, gc: 68, pts: 11 },
  { pos: 16, name: 'Malvín 59', pj: 22, g: 1, e: 1, p: 20, gf: 14, gc: 61, pts: 4 },
]

interface SeasonRecord {
  year: number
  division: string
  pos: number
  pj: number
  g: number
  e: number
  p: number
  gf: number
  gc: number
  pts: number
  teams: number
  champion?: boolean
  note?: string
}

const seasonHistory: SeasonRecord[] = [
  { year: 2025, division: 'D', pos: 6, pj: 22, g: 9, e: 8, p: 5, gf: 42, gc: 26, pts: 35, teams: 16 },
  { year: 2024, division: 'E', pos: 0, pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0, teams: 0, note: 'Ascenso a Divisional D' },
  { year: 2023, division: 'E', pos: 6, pj: 22, g: 11, e: 4, p: 7, gf: 42, gc: 34, pts: 37, teams: 16 },
  { year: 2022, division: 'E', pos: 6, pj: 22, g: 10, e: 3, p: 9, gf: 42, gc: 39, pts: 33, teams: 16 },
  { year: 2021, division: 'F', pos: 1, pj: 22, g: 16, e: 1, p: 5, gf: 59, gc: 31, pts: 49, teams: 16, champion: true },
  { year: 2020, division: 'F', pos: 10, pj: 15, g: 5, e: 3, p: 7, gf: 24, gc: 24, pts: 18, teams: 16, note: 'Temporada reducida (pandemia)' },
  { year: 2019, division: 'H', pos: 8, pj: 22, g: 8, e: 5, p: 9, gf: 35, gc: 33, pts: 29, teams: 16 },
  { year: 2018, division: 'H', pos: 9, pj: 22, g: 9, e: 5, p: 8, gf: 38, gc: 34, pts: 32, teams: 16 },
  { year: 2017, division: 'I', pos: 1, pj: 19, g: 13, e: 3, p: 3, gf: 54, gc: 14, pts: 42, teams: 11, champion: true },
]

const totalPlayers = players.length
const scorers = players.filter(p => p.goals > 0).sort((a, b) => b.goals - a.goals)
const allTimeGoals = seasonHistory.reduce((sum, s) => sum + s.gf, 0)
const allTimeMatches = seasonHistory.reduce((sum, s) => sum + s.pj, 0)

export const dynamic = 'force-dynamic'

type PosicionFutbolRow = {
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

async function TablaPosicionesActual() {
  const supabase = getSupabase()
  if (!supabase) {
    return { rows: null as PosicionFutbolRow[] | null, error: 'Supabase no está configurado (faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local).' }
  }

  const { data, error } = await supabase
    .from('posiciones')
    .select('posicion, equipo, pj, pg, pe, pp, pf, pc, pts')
    .eq('disciplina', 'Futbol')
    .order('posicion', { ascending: true })

  if (error) {
    return { rows: null as PosicionFutbolRow[] | null, error: error.message }
  }

  return { rows: (data ?? []) as PosicionFutbolRow[], error: null as string | null }
}

function TablaPosicionesSkeleton() {
  return (
    <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-club-muted text-sm">
      Cargando tabla...
    </div>
  )
}

async function TablaPosiciones({ fallback }: { fallback: React.ReactNode }) {
  const { rows, error } = await TablaPosicionesActual()

  if (error) {
    return (
      <>
        <div className="bg-club-dark border border-red-500/40 rounded-lg p-6 text-red-200 text-sm mb-6">
          Error al cargar la tabla de posiciones: <span className="font-mono">{error}</span>
        </div>
        {fallback}
      </>
    )
  }

  if (!rows || rows.length === 0) {
    return <>{fallback}</>
  }

  return (
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
            <th className="text-center px-2 py-3">GF</th>
            <th className="text-center px-2 py-3">GC</th>
            <th className="text-center px-2 py-3">PTS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const esPrimero = Number(row.posicion ?? -1) === 1
            const esYoung = row.equipo?.toLowerCase().includes('young')

            return (
              <tr
                key={`${row.posicion ?? 'na'}-${row.equipo}`}
                className={
                  `border-b border-club-gray-mid/60 last:border-b-0 hover:bg-club-black/30 ` +
                  (esPrimero ? 'bg-club-black/40 ring-1 ring-club-red/40 ' : '') +
                  (esYoung ? 'bg-club-red/10 ' : '')
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
  )
}

export default function FutbolMayoresPage() {
  return (
    <main className="min-h-screen bg-club-black">
      <Header />

      <section className="relative pt-32 pb-20 bg-club-dark overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-club-red" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-club-red opacity-10 blur-3xl rounded-full" />
        <div className="container-yu relative text-center">
          <div className="flex justify-center mb-8 opacity-80">
            <Image src="/futbol.png" alt="Fútbol" width={80} height={80} className="object-contain w-20 h-20" />
          </div>
          <p className="text-club-red text-sm font-bold uppercase tracking-widest mb-3">Fútbol</p>
          <h1 className="heading-lg text-white mb-6">Primera División</h1>
          <div className="divider-red mx-auto mb-8" />
          <p className="text-club-muted text-lg max-w-2xl mx-auto">El equipo de Primera División de Young Universitario compite en la División D de la Liga Universitaria de Uruguay de Deportes con pasión y garra en cada partido.</p>
        </div>
      </section>

      <div className="bg-club-black border-b border-club-gray-mid">
        <div className="container-yu py-3 flex items-center gap-2 text-xs text-club-muted uppercase tracking-widest">
          <Link href="/" className="hover:text-club-red transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/futbol" className="hover:text-club-red transition-colors">Fútbol</Link>
          <span>/</span>
          <span className="text-white">Primera División</span>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-yu">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            <div className="bg-club-dark border border-club-gray-mid rounded-lg p-5 text-center hover:border-club-red transition-colors">
              <div className="text-3xl font-black text-club-red mb-1">6°</div>
              <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">Posición</div>
            </div>
            <div className="bg-club-dark border border-club-gray-mid rounded-lg p-5 text-center hover:border-club-red transition-colors">
              <div className="text-3xl font-black text-club-red mb-1">22</div>
              <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">PJ</div>
            </div>
            <div className="bg-club-dark border border-club-gray-mid rounded-lg p-5 text-center hover:border-club-red transition-colors">
              <div className="text-3xl font-black text-club-red mb-1">35</div>
              <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">Puntos</div>
            </div>
            <div className="bg-club-dark border border-club-gray-mid rounded-lg p-5 text-center hover:border-club-red transition-colors">
              <div className="text-3xl font-black text-club-red mb-1">9-8-5</div>
              <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">G-E-P</div>
            </div>
            <div className="bg-club-dark border border-club-gray-mid rounded-lg p-5 text-center hover:border-club-red transition-colors">
              <div className="text-3xl font-black text-club-red mb-1">42-26</div>
              <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">GF-GC</div>
            </div>
            <div className="bg-club-dark border border-club-gray-mid rounded-lg p-5 text-center hover:border-club-red transition-colors">
              <div className="text-3xl font-black text-club-red mb-1">{totalPlayers}</div>
              <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">Jugadores</div>
            </div>
          </div>

          {/* Tabla de Posiciones */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-club-red rounded" />
              <h2 className="heading-sm text-white">Tabla de Posiciones</h2>
              <span className="text-club-muted text-xs uppercase tracking-widest ml-auto">Temporada actual</span>
            </div>

            <Suspense fallback={<TablaPosicionesSkeleton />}>
              <TablaPosiciones
                fallback={
                  <>
                    <div className="overflow-x-auto">
                      <div className="hidden sm:grid grid-cols-12 gap-1 px-4 py-3 text-club-muted text-xs uppercase tracking-widest font-semibold border-b border-club-gray-mid mb-2 min-w-[600px]">
                        <div className="col-span-1 text-center">Pos</div>
                        <div className="col-span-3">Equipo</div>
                        <div className="col-span-1 text-center">PJ</div>
                        <div className="col-span-1 text-center">G</div>
                        <div className="col-span-1 text-center">E</div>
                        <div className="col-span-1 text-center">P</div>
                        <div className="col-span-1 text-center">GF</div>
                        <div className="col-span-1 text-center">GC</div>
                        <div className="col-span-1 text-center">DG</div>
                        <div className="col-span-1 text-center">Pts</div>
                      </div>

                      <div className="space-y-1 min-w-[600px]">
                        {standings.map((team) => (
                          <div
                            key={team.name}
                            className={`grid grid-cols-12 gap-1 rounded px-4 py-3 items-center transition-colors ${
                              team.isYoung
                                ? 'bg-club-red/10 border-2 border-club-red'
                                : 'bg-club-dark border border-club-gray-mid hover:border-club-gray-light/30'
                            }`}
                          >
                            <div className="col-span-1 text-center">
                              <span className={`font-black text-sm ${team.isYoung ? 'text-club-red' : 'text-club-muted'}`}>{team.pos}</span>
                            </div>
                            <div className="col-span-3">
                              <span className={`text-sm font-semibold truncate ${team.isYoung ? 'text-white' : 'text-club-gray-light'}`}>{team.name}</span>
                            </div>
                            <div className="col-span-1 text-center text-white text-sm">{team.pj}</div>
                            <div className="col-span-1 text-center text-green-400 text-sm font-medium">{team.g}</div>
                            <div className="col-span-1 text-center text-yellow-400 text-sm font-medium">{team.e}</div>
                            <div className="col-span-1 text-center text-red-400 text-sm font-medium">{team.p}</div>
                            <div className="col-span-1 text-center text-club-muted text-sm">{team.gf}</div>
                            <div className="col-span-1 text-center text-club-muted text-sm">{team.gc}</div>
                            <div className="col-span-1 text-center">
                              <span className={`text-sm font-semibold ${team.gf - team.gc > 0 ? 'text-green-400' : team.gf - team.gc < 0 ? 'text-red-400' : 'text-club-muted'}`}>
                                {team.gf - team.gc > 0 ? '+' : ''}{team.gf - team.gc}
                              </span>
                            </div>
                            <div className="col-span-1 text-center">
                              <span className={`font-black text-sm ${team.isYoung ? 'text-club-red' : 'text-white'}`}>{team.pts}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-club-muted text-xs mt-4 text-right">
                      Fuente: <a href="https://liga-stats.onrender.com/equipos/young-universitario?torneo=Mayores%20Masculino" target="_blank" rel="noopener noreferrer" className="text-club-red hover:underline">liga-stats.onrender.com</a> · <a href="https://ligauniversitaria.org.uy/" target="_blank" rel="noopener noreferrer" className="text-club-red hover:underline">ligauniversitaria.org.uy</a>
                    </p>
                  </>
                }
              />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Goleadores */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-club-red rounded" />
                  <h2 className="heading-sm text-white">Goleadores</h2>
                </div>
                <div className="space-y-3">
                  {scorers.map((p, i) => (
                    <div key={p.name} className="bg-club-dark border border-club-gray-mid rounded p-4 flex items-center justify-between hover:border-club-red transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded flex items-center justify-center font-black text-sm flex-shrink-0 ${i === 0 ? 'bg-club-red text-white' : 'bg-club-gray text-club-red'}`}>
                          {i + 1}°
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{p.name}</p>
                          <p className="text-club-muted text-xs">{p.pj} partidos · {p.min} min</p>
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
                  <span className="text-club-muted text-xs uppercase tracking-widest ml-auto">Estadísticas — Temporada 2025</span>
                </div>

                <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 text-club-muted text-xs uppercase tracking-widest font-semibold border-b border-club-gray-mid mb-2">
                  <div className="col-span-4">Jugador</div>
                  <div className="col-span-1 text-center">PJ</div>
                  <div className="col-span-1 text-center">TIT</div>
                  <div className="col-span-1 text-center">SUP</div>
                  <div className="col-span-2 text-center">Min</div>
                  <div className="col-span-1 text-center">Goles</div>
                  <div className="col-span-1 text-center">🟨</div>
                  <div className="col-span-1 text-center">🟥</div>
                </div>

                <div className="space-y-1.5">
                  {players.map((p) => (
                    <div key={p.name} className="grid grid-cols-12 gap-2 bg-club-dark border border-club-gray-mid rounded px-4 py-3 items-center hover:border-club-red/50 transition-colors">
                      <div className="col-span-12 sm:col-span-4">
                        <p className="text-white font-medium text-sm truncate">{p.name}</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1 text-center">
                        <span className="text-white font-semibold text-sm">{p.pj}</span>
                        <span className="sm:hidden text-club-muted text-xs ml-1">PJ</span>
                      </div>
                      <div className="hidden sm:block col-span-1 text-center">
                        <span className="text-club-muted text-sm">{p.tit}</span>
                      </div>
                      <div className="hidden sm:block col-span-1 text-center">
                        <span className="text-club-muted text-sm">{p.sup}</span>
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-center">
                        <span className="text-club-muted text-sm">{p.min}&apos;</span>
                        <span className="sm:hidden text-club-muted text-xs ml-1">min</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1 text-center">
                        <span className={`font-bold text-sm ${p.goals > 0 ? 'text-club-red' : 'text-club-muted'}`}>{p.goals}</span>
                        <span className="sm:hidden text-club-muted text-xs ml-1">G</span>
                      </div>
                      <div className="hidden sm:block col-span-1 text-center">
                        <span className="text-club-muted text-sm">{p.yellow || '-'}</span>
                      </div>
                      <div className="hidden sm:block col-span-1 text-center">
                        <span className={`text-sm ${p.red > 0 ? 'text-red-500 font-bold' : 'text-club-muted'}`}>{p.red || '-'}</span>
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
                  <h2 className="heading-sm text-white">División D</h2>
                </div>
                <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6">
                  <p className="text-white font-semibold text-sm mb-2">Liga Universitaria de Uruguay de Deportes</p>
                  <p className="text-club-muted text-xs leading-relaxed">Young Universitario compite en la División D en ambas categorías: Primera División y Reserva.</p>
                </div>
              </div>
              <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-center">
                <p className="text-white font-bold uppercase tracking-wider text-sm mb-3">Seguí al equipo</p>
                <p className="text-club-muted text-xs mb-5">Novedades, fotos y videos en Instagram</p>
                <a href="https://www.instagram.com/younguniversitario/" target="_blank" rel="noopener noreferrer" className="btn-club-red text-xs py-2 px-5 inline-block">@younguniversitario</a>
              </div>
            </div>
          </div>

          {/* Historial por Temporada */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-club-red rounded" />
              <h2 className="heading-sm text-white">Historial por Temporada</h2>
            </div>
            <p className="text-club-muted text-sm mb-8 ml-4">{allTimeMatches} partidos jugados · {allTimeGoals} goles anotados · 2 títulos · De la Divisional I a la D</p>

            {/* Tabla histórica */}
            <div className="overflow-x-auto">
              <div className="hidden sm:grid grid-cols-12 gap-1 px-4 py-3 text-club-muted text-xs uppercase tracking-widest font-semibold border-b border-club-gray-mid mb-2 min-w-[640px]">
                <div className="col-span-1 text-center">Año</div>
                <div className="col-span-1 text-center">Div</div>
                <div className="col-span-1 text-center">Pos</div>
                <div className="col-span-1 text-center">PJ</div>
                <div className="col-span-1 text-center">G</div>
                <div className="col-span-1 text-center">E</div>
                <div className="col-span-1 text-center">P</div>
                <div className="col-span-1 text-center">GF</div>
                <div className="col-span-1 text-center">GC</div>
                <div className="col-span-1 text-center">DG</div>
                <div className="col-span-1 text-center">Pts</div>
                <div className="col-span-1 text-center"></div>
              </div>

              <div className="space-y-1.5 min-w-[640px]">
                {seasonHistory.map((s) => {
                  const isChampion = s.champion
                  const isAscent = s.note?.includes('Ascenso')
                  const noData = s.pj === 0

                  return (
                    <div
                      key={s.year}
                      className={`grid grid-cols-12 gap-1 rounded px-4 py-3 items-center transition-colors ${
                        isChampion
                          ? 'bg-yellow-500/10 border-2 border-yellow-500/50'
                          : isAscent
                            ? 'bg-green-500/5 border border-green-500/30'
                            : 'bg-club-dark border border-club-gray-mid hover:border-club-gray-light/30'
                      }`}
                    >
                      <div className="col-span-1 text-center">
                        <span className={`font-black text-sm ${isChampion ? 'text-yellow-400' : 'text-white'}`}>{s.year}</span>
                      </div>
                      <div className="col-span-1 text-center">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${isChampion ? 'bg-yellow-500 text-black' : 'bg-club-gray text-club-muted'}`}>{s.division}</span>
                      </div>
                      {noData ? (
                        <div className="col-span-9">
                          <span className="text-green-400 text-sm font-semibold">↑ {s.note}</span>
                        </div>
                      ) : (
                        <>
                          <div className="col-span-1 text-center">
                            <span className={`font-black text-sm ${isChampion ? 'text-yellow-400' : 'text-white'}`}>{s.pos}°</span>
                          </div>
                          <div className="col-span-1 text-center text-white text-sm">{s.pj}</div>
                          <div className="col-span-1 text-center text-green-400 text-sm font-medium">{s.g}</div>
                          <div className="col-span-1 text-center text-yellow-400 text-sm font-medium">{s.e}</div>
                          <div className="col-span-1 text-center text-red-400 text-sm font-medium">{s.p}</div>
                          <div className="col-span-1 text-center text-club-muted text-sm">{s.gf}</div>
                          <div className="col-span-1 text-center text-club-muted text-sm">{s.gc}</div>
                          <div className="col-span-1 text-center">
                            <span className={`text-sm font-semibold ${s.gf - s.gc > 0 ? 'text-green-400' : s.gf - s.gc < 0 ? 'text-red-400' : 'text-club-muted'}`}>
                              {s.gf - s.gc > 0 ? '+' : ''}{s.gf - s.gc}
                            </span>
                          </div>
                          <div className="col-span-1 text-center">
                            <span className={`font-black text-sm ${isChampion ? 'text-yellow-400' : 'text-white'}`}>{s.pts}</span>
                          </div>
                        </>
                      )}
                      <div className="col-span-1 text-center">
                        {isChampion && <span className="text-yellow-400 text-sm">🏆</span>}
                        {s.note === 'Temporada reducida (pandemia)' && <span className="text-club-muted text-xs">COVID</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <p className="text-club-muted text-xs mt-6 text-right">
              Fuente: <a href="https://liga-stats.onrender.com/equipos/young-universitario?torneo=Mayores%20Masculino" target="_blank" rel="noopener noreferrer" className="text-club-red hover:underline">liga-stats.onrender.com</a> · <a href="https://ligauniversitaria.org.uy/" target="_blank" rel="noopener noreferrer" className="text-club-red hover:underline">ligauniversitaria.org.uy</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

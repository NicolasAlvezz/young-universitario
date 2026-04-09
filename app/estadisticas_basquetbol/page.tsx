import { Trophy, Users, Dumbbell } from 'lucide-react'
import Header from '@/components/young/Header'
import Footer from '@/components/young/Footer'
import { getJugadoresConTotalPuntos } from '@/lib/supabase/queries'

export const metadata = {
  title: 'Estadísticas Básquetbol | Young Universitario',
}

export default async function EstadisticasBasquetbolPage() {
  const { jugadores, configuracionFaltante } = await getJugadoresConTotalPuntos()
  const totalJugadores = jugadores.length
  const totalPuntosTemporada = jugadores.reduce((acc, jugador) => acc + jugador.totalPuntos, 0)
  const disciplinasUnicas = new Set(jugadores.map((jugador) => jugador.disciplina)).size

  return (
    <main className="min-h-screen bg-gradient-club text-club-white">
      <Header />
      {/* Espacio bajo header fijo */}
      <div className="h-16 md:h-20" aria-hidden />

      <section className="container-yu py-10 md:py-14">
        {configuracionFaltante && (
          <div
            className="mb-6 rounded-xl border border-amber-500/50 bg-amber-950/40 px-5 py-4 text-amber-100"
            role="alert"
          >
            <p className="font-semibold text-amber-50">Configurá Supabase para ver datos reales</p>
            <p className="mt-2 text-sm text-amber-100/90">
              Creá el archivo <code className="rounded bg-black/30 px-1.5 py-0.5">.env.local</code> en la raíz
              del proyecto con <code className="rounded bg-black/30 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code>{' '}
              y <code className="rounded bg-black/30 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
            </p>
            <p className="mt-2 text-sm text-amber-100/80">
              Reiniciá <code className="rounded bg-black/30 px-1">npm run dev</code> después de guardar.
            </p>
          </div>
        )}

        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-club-red-light">Dashboard · Básquetbol</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            Estadísticas de básquetbol
          </h1>
          <p className="mt-3 max-w-2xl text-club-off-white/80">
            Ranking y totales de temporada. Esta vista está pensada para acceso desde la sección de Básquetbol.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-club-gray-light/60 bg-club-dark/80 p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm text-club-muted">Jugadores totales</p>
              <Users className="h-5 w-5 text-club-red-light" />
            </div>
            <p className="mt-3 text-3xl font-bold">{totalJugadores}</p>
          </article>

          <article className="rounded-xl border border-club-gray-light/60 bg-club-dark/80 p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm text-club-muted">Puntos acumulados</p>
              <Trophy className="h-5 w-5 text-club-red-light" />
            </div>
            <p className="mt-3 text-3xl font-bold">{totalPuntosTemporada.toLocaleString('es-AR')}</p>
          </article>

          <article className="rounded-xl border border-club-gray-light/60 bg-club-dark/80 p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm text-club-muted">Disciplinas en datos</p>
              <Dumbbell className="h-5 w-5 text-club-red-light" />
            </div>
            <p className="mt-3 text-3xl font-bold">{disciplinasUnicas}</p>
          </article>
        </div>

        <section className="mt-8 overflow-hidden rounded-xl border border-club-gray-light/60 bg-club-dark/90 shadow-xl">
          <div className="flex items-center justify-between border-b border-club-gray-light/60 px-5 py-4">
            <h2 className="text-lg font-semibold">Ranking de puntos por jugador</h2>
            <span className="rounded-full bg-club-red/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-club-red-light">
              Temporada actual
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-club-gray-mid/50 text-club-off-white/90">
                <tr>
                  <th className="px-5 py-3 font-semibold">Jugador</th>
                  <th className="px-5 py-3 font-semibold">Disciplina</th>
                  <th className="px-5 py-3 text-right font-semibold">Total de puntos</th>
                </tr>
              </thead>
              <tbody>
                {jugadores.map((jugador) => (
                  <tr key={jugador.id} className="border-t border-club-gray-light/40 hover:bg-club-gray-mid/40">
                    <td className="px-5 py-3 font-medium">{jugador.nombre}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-club-gray-mid px-3 py-1 text-xs uppercase tracking-wide">
                        {jugador.disciplina}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-club-red-light">
                      {jugador.totalPuntos.toLocaleString('es-AR')}
                    </td>
                  </tr>
                ))}

                {jugadores.length === 0 && !configuracionFaltante && (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-club-muted">
                      No hay datos disponibles para mostrar.
                    </td>
                  </tr>
                )}
                {jugadores.length === 0 && configuracionFaltante && (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-club-muted">
                      Agregá las variables de entorno para cargar jugadores desde Supabase.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  )
}


'use client'

import { useEffect, useMemo, useState } from 'react'
import { getSupabase } from '@/lib/supabase/client'

export type PosicionRow = {
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

type Props = {
  disciplina: string
  titulo?: string
}

export default function StandingsTable({ disciplina, titulo = 'Tabla de posiciones' }: Props) {
  const [rows, setRows] = useState<PosicionRow[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function cargar() {
      setLoading(true)
      setError(null)

      try {
        const supabase = getSupabase()
        if (!supabase) {
          throw new Error('Supabase no está configurado. Cargá NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local.')
        }

        const { data, error } = await supabase
          .from('posiciones')
          .select('posicion, equipo, pj, pg, pe, pp, pf, pc, pts')
          .eq('disciplina', disciplina)
          .order('posicion', { ascending: true })

        if (error) throw new Error(error.message)

        if (!cancelled) setRows((data ?? []) as PosicionRow[])
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Error desconocido al cargar posiciones')
          setRows([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    cargar()
    return () => {
      cancelled = true
    }
  }, [disciplina])

  const hasRows = (rows?.length ?? 0) > 0

  const emptyState = useMemo(
    () => (
      <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-club-muted text-sm">
        Aún no hay datos sincronizados para <span className="text-club-red font-mono text-xs">{disciplina}</span>.
      </div>
    ),
    [disciplina],
  )

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-club-red rounded" />
        <h2 className="heading-sm text-white">{titulo}</h2>
        <span className="text-club-muted text-xs uppercase tracking-widest ml-auto">{disciplina}</span>
      </div>

      {loading && (
        <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-club-muted text-sm">
          Cargando tabla...
        </div>
      )}

      {!loading && error && (
        <div className="bg-club-dark border border-red-500/40 rounded-lg p-6 text-red-200 text-sm">
          Error al cargar la tabla de posiciones: <span className="font-mono">{error}</span>
        </div>
      )}

      {!loading && !error && !hasRows && emptyState}

      {!loading && !error && hasRows && (
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
              {rows!.map((row) => {
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
      )}
    </div>
  )
}


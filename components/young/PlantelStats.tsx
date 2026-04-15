'use client'

import { useEffect, useMemo, useState } from 'react'
import { getSupabase } from '@/lib/supabase/client'

export type EstadisticaPlantelRow = {
  id: number
  jugadora: string
  pj: number | null
  goles: number | null
  actualizado_en: string | null
}

type Estado = {
  loading: boolean
  error: string | null
  rows: EstadisticaPlantelRow[]
}

function EmptyState({ texto }: { texto: string }) {
  return (
    <div className="bg-club-dark border border-club-gray-mid rounded-lg p-6 text-club-muted text-sm">
      {texto}
    </div>
  )
}

export function GoleadorasSection({ limite = 5 }: { limite?: number }) {
  const [state, setState] = useState<Estado>({ loading: true, error: null, rows: [] })

  useEffect(() => {
    let cancelled = false

    async function cargar() {
      setState((s) => ({ ...s, loading: true, error: null }))

      try {
        const supabase = getSupabase()
        if (!supabase) {
          throw new Error(
            'Supabase no está configurado. Definí NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local.',
          )
        }

        const { data, error } = await supabase
          .from('estadisticas_plantel')
          .select('id, jugadora, pj, goles, actualizado_en')
          .gt('goles', 0)
          .order('goles', { ascending: false })
          .limit(limite)

        if (error) throw new Error(error.message)

        if (!cancelled) {
          setState({ loading: false, error: null, rows: (data ?? []) as EstadisticaPlantelRow[] })
        }
      } catch (e) {
        if (!cancelled) {
          setState({ loading: false, error: e instanceof Error ? e.message : 'Error desconocido', rows: [] })
        }
      }
    }

    cargar()
    return () => {
      cancelled = true
    }
  }, [limite])

  const contenido = useMemo(() => {
    if (state.loading) {
      return <EmptyState texto="Cargando estadísticas..." />
    }

    if (state.error) {
      return (
        <div className="bg-club-dark border border-red-500/40 rounded-lg p-6 text-red-200 text-sm">
          Error al cargar goleadoras: <span className="font-mono">{state.error}</span>
        </div>
      )
    }

    if (state.rows.length === 0) {
      return <EmptyState texto="Todavía no hay goleadoras cargadas. Estas estadísticas se actualizarán pronto." />
    }

    return (
      <div className="space-y-3">
        {state.rows.map((p, i) => {
          const goles = p.goles ?? 0
          const pj = p.pj ?? 0
          const esTop1 = i === 0

          return (
            <div
              key={p.id}
              className="bg-club-dark border border-club-gray-mid rounded p-4 flex items-center justify-between hover:border-club-red transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={
                    `w-10 h-10 rounded flex items-center justify-center font-black text-sm flex-shrink-0 ` +
                    (esTop1 ? 'bg-club-red text-white' : 'bg-club-gray text-club-red')
                  }
                >
                  {i + 1}°
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{p.jugadora}</p>
                  <p className="text-club-muted text-xs">
                    {pj} {pj === 1 ? 'partido' : 'partidos'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-club-red font-black text-2xl">{goles}</span>
                <p className="text-club-muted text-xs uppercase tracking-wide">{goles === 1 ? 'gol' : 'goles'}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }, [state])

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-club-red rounded" />
        <h2 className="heading-sm text-white">Goleadoras</h2>
      </div>
      {contenido}
    </section>
  )
}

export function PlantelCompletoSection() {
  const [state, setState] = useState<Estado>({ loading: true, error: null, rows: [] })

  useEffect(() => {
    let cancelled = false

    async function cargar() {
      setState((s) => ({ ...s, loading: true, error: null }))
      try {
        const supabase = getSupabase()
        if (!supabase) {
          throw new Error(
            'Supabase no está configurado. Definí NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local.',
          )
        }

        const { data, error } = await supabase
          .from('estadisticas_plantel')
          .select('id, jugadora, pj, goles, actualizado_en')
          .order('jugadora', { ascending: true })

        if (error) throw new Error(error.message)

        if (!cancelled) setState({ loading: false, error: null, rows: (data ?? []) as EstadisticaPlantelRow[] })
      } catch (e) {
        if (!cancelled) {
          setState({ loading: false, error: e instanceof Error ? e.message : 'Error desconocido', rows: [] })
        }
      }
    }

    cargar()
    return () => {
      cancelled = true
    }
  }, [])

  if (state.loading) {
    return (
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-club-red rounded" />
          <h2 className="heading-sm text-white">Plantel Completo</h2>
        </div>
        <EmptyState texto="Cargando estadísticas..." />
      </section>
    )
  }

  if (state.error) {
    return (
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-club-red rounded" />
          <h2 className="heading-sm text-white">Plantel Completo</h2>
        </div>
        <div className="bg-club-dark border border-red-500/40 rounded-lg p-6 text-red-200 text-sm">
          Error al cargar plantel: <span className="font-mono">{state.error}</span>
        </div>
      </section>
    )
  }

  if (state.rows.length === 0) {
    return (
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-club-red rounded" />
          <h2 className="heading-sm text-white">Plantel Completo</h2>
        </div>
        <EmptyState texto="Todavía no hay jugadoras cargadas. Estas estadísticas se actualizarán pronto." />
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-club-red rounded" />
        <h2 className="heading-sm text-white">Plantel Completo</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse bg-club-dark border border-club-gray-mid rounded-lg overflow-hidden">
          <thead>
            <tr className="text-club-muted text-xs uppercase tracking-widest border-b border-club-gray-mid">
              <th className="text-left px-4 py-3">Jugadora</th>
              <th className="text-center px-2 py-3">PJ</th>
              <th className="text-center px-2 py-3">Goles</th>
            </tr>
          </thead>
          <tbody>
            {state.rows.map((p) => {
              const goles = p.goles ?? 0
              return (
                <tr
                  key={p.id}
                  className="border-b border-club-gray-mid/60 last:border-b-0 hover:bg-club-black/30"
                >
                  <td className="px-4 py-3 text-white font-medium">{p.jugadora}</td>
                  <td className="px-2 py-3 text-center text-club-gray-light">{p.pj ?? 0}</td>
                  <td className={"px-2 py-3 text-center font-black " + (goles > 0 ? 'text-club-red' : 'text-club-muted')}>
                    {goles}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}


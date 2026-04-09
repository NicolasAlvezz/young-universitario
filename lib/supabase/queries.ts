import { getSupabase } from '@/lib/supabase/client'

type EstadisticaPuntos = {
  puntos: number | null
}

type JugadorConEstadisticas = {
  id: number
  nombre: string
  disciplina: string
  posicion: string | null
  fecha_ingreso: string | null
  estadisticas_globales: EstadisticaPuntos[] | null
}

export type JugadorResumenTemporada = {
  id: number
  nombre: string
  disciplina: string
  totalPuntos: number
}

export type DashboardJugadoresResult = {
  jugadores: JugadorResumenTemporada[]
  /** Sin NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local */
  configuracionFaltante: boolean
}

/**
 * Trae jugadores + estadísticas relacionadas (select anidado),
 * y calcula el total de puntos por jugador.
 */
export async function getJugadoresConTotalPuntos(): Promise<DashboardJugadoresResult> {
  const supabase = getSupabase()
  if (!supabase) {
    return { jugadores: [], configuracionFaltante: true }
  }

  const { data, error } = await supabase
    .from('jugadores')
    .select('id, nombre, disciplina, posicion, fecha_ingreso, estadisticas_globales(puntos)')
    .returns<JugadorConEstadisticas[]>()

  if (error) {
    throw new Error(`Error al obtener datos de jugadores: ${error.message}`)
  }

  const jugadores = (data ?? [])
    .map((jugador) => {
      const totalPuntos = (jugador.estadisticas_globales ?? []).reduce((acc, registro) => {
        return acc + Number(registro.puntos ?? 0)
      }, 0)

      return {
        id: jugador.id,
        nombre: jugador.nombre,
        disciplina: jugador.disciplina,
        totalPuntos,
      }
    })
    .sort((a, b) => b.totalPuntos - a.totalPuntos)

  return { jugadores, configuracionFaltante: false }
}

import { NextRequest, NextResponse } from 'next/server'
import {
  appendBasquetStat,
  setBasquetStandings,
  type BasquetStandingRow,
  type BasquetStatPayload,
} from '@/lib/basquet-stats-store'

const REQUIRED_FIELDS: (keyof BasquetStatPayload)[] = [
  'jugador', 'puntos', 'puntos_rival', 'fecha', 'jornada', 'cancha', 'rival',
]

function coerceNumber(v: unknown): number | null {
  if (typeof v === 'number' && !Number.isNaN(v)) return v
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v)
    if (!Number.isNaN(n)) return n
  }
  return null
}

function parseStandings(raw: unknown): BasquetStandingRow[] | null {
  if (!Array.isArray(raw)) return null

  const parsed: BasquetStandingRow[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') return null
    const row = item as Record<string, unknown>

    const posicion = coerceNumber(row.posicion ?? row.pos ?? row.puesto)
    const equipo = String(row.equipo ?? row.team ?? '').trim()
    const pj = coerceNumber(row.pj)
    const pg = coerceNumber(row.pg)
    const pp = coerceNumber(row.pp)
    const pf = coerceNumber(row.pf)
    const pc = coerceNumber(row.pc)
    const pts = coerceNumber(row.pts ?? row.puntos)

    if ([posicion, pj, pg, pp, pf, pc, pts].some((v) => v === null) || !equipo) {
      return null
    }

    // En este punto, la guard clause garantiza que ninguna variable es null.
    parsed.push({
      posicion: posicion as number,
      equipo,
      pj: pj as number,
      pg: pg as number,
      pp: pp as number,
      pf: pf as number,
      pc: pc as number,
      pts: pts as number,
    })
  }

  return parsed.sort((a, b) => a.posicion - b.posicion)
}

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json() as Record<string, unknown>

    const standings = parseStandings(raw.tabla_posiciones)
    if (standings) {
      setBasquetStandings(standings)
    }

    const hasFullStatPayload = REQUIRED_FIELDS.every((f) => raw[f] !== undefined && raw[f] !== null && raw[f] !== '')
    if (!hasFullStatPayload && standings) {
      return NextResponse.json({ success: true, standingsUpdated: standings.length }, { status: 200 })
    }

    const missing = REQUIRED_FIELDS.filter((f) => raw[f] === undefined || raw[f] === null || raw[f] === '')
    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Campos requeridos faltantes: ${missing.join(', ')}` },
        { status: 400 },
      )
    }

    const puntos = coerceNumber(raw.puntos)
    const puntosRival = coerceNumber(raw.puntos_rival)
    if (puntos === null || puntosRival === null) {
      return NextResponse.json(
        { success: false, error: 'puntos y puntos_rival deben ser números válidos' },
        { status: 400 },
      )
    }

    const body: BasquetStatPayload = {
      jugador: String(raw.jugador).trim(),
      puntos,
      puntos_rival: puntosRival,
      fecha: String(raw.fecha).trim(),
      jornada: String(raw.jornada).trim(),
      cancha: String(raw.cancha).trim(),
      rival: String(raw.rival).trim(),
    }

    if (!body.jugador) {
      return NextResponse.json({ success: false, error: 'jugador no puede estar vacío' }, { status: 400 })
    }

    appendBasquetStat(body)
    console.log('[basquetbol POST] Datos recibidos:', JSON.stringify(body, null, 2))

    return NextResponse.json(
      { success: true, data: body, standingsUpdated: standings?.length ?? 0 },
      { status: 200 },
    )
  } catch {
    return NextResponse.json(
      { success: false, error: 'JSON inválido o error al procesar la solicitud' },
      { status: 400 },
    )
  }
}

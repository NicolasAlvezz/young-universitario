import { NextRequest, NextResponse } from 'next/server'
import { appendBasquetStat, type BasquetStatPayload } from '@/lib/basquet-stats-store'

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

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json() as Record<string, unknown>

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

    return NextResponse.json({ success: true, data: body }, { status: 200 })
  } catch {
    return NextResponse.json(
      { success: false, error: 'JSON inválido o error al procesar la solicitud' },
      { status: 400 },
    )
  }
}

export interface BasquetStatPayload {
  jugador: string
  puntos: number
  puntos_rival: number
  fecha: string
  jornada: string
  cancha: string
  rival: string
}

export interface BasquetStatRow extends BasquetStatPayload {
  receivedAt: number
}

const rows: BasquetStatRow[] = []

export function appendBasquetStat(payload: BasquetStatPayload): void {
  rows.push({ ...payload, receivedAt: Date.now() })
}

export function getBasquetStats(): BasquetStatRow[] {
  return [...rows]
}

function matchKey(r: BasquetStatRow): string {
  return `${r.jornada}||${r.rival}||${r.fecha}||${r.cancha}`
}

export interface MatchSummary {
  jornada: string
  rival: string
  fecha: string
  cancha: string
  youngScore: number
  opponentScore: number
  won: boolean
}

export function getMatchSummaries(): MatchSummary[] {
  const map = new Map<string, { rows: BasquetStatRow[] }>()
  for (const r of rows) {
    const k = matchKey(r)
    if (!map.has(k)) map.set(k, { rows: [] })
    map.get(k)!.rows.push(r)
  }
  const out: MatchSummary[] = []
  for (const { rows: group } of Array.from(map.values())) {
    const first = group[0]
    const youngScore = group.reduce((s, x) => s + x.puntos, 0)
    const opponentScore = first.puntos_rival
    out.push({
      jornada: first.jornada,
      rival: first.rival,
      fecha: first.fecha,
      cancha: first.cancha,
      youngScore,
      opponentScore,
      won: youngScore > opponentScore,
    })
  }
  return out.sort((a, b) => a.jornada.localeCompare(b.jornada, 'es', { numeric: true }))
}

export interface PlayerScoring {
  name: string
  byJornada: Record<string, number>
  total: number
}

export function getPlayerScoring(jornadasOrden: string[]): PlayerScoring[] {
  const byPlayer = new Map<string, Record<string, number>>()
  for (const r of rows) {
    const j = r.jornada
    if (!byPlayer.has(r.jugador)) byPlayer.set(r.jugador, {})
    const rec = byPlayer.get(r.jugador)!
    rec[j] = (rec[j] ?? 0) + r.puntos
  }
  const list: PlayerScoring[] = []
  for (const [name, byJ] of Array.from(byPlayer.entries())) {
    const total = jornadasOrden.reduce((s, j) => s + (byJ[j] ?? 0), 0)
    list.push({ name, byJornada: byJ, total })
  }
  return list.sort((a, b) => b.total - a.total)
}

export function getUniqueJornadasSorted(): string[] {
  const set = new Set(rows.map((r) => r.jornada))
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))
}

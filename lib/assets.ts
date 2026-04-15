export const LOGOS = {
  futbol: '/logo-futbol.png',
  hockey: '/logo-hockey.png',
  basquet: '/logo-basquet.png',
} as const

/**
 * Fallbacks que existen hoy en /public.
 * Si los nuevos logos no están (o están vacíos), usamos estos para evitar imágenes rotas.
 */
export const LOGOS_FALLBACK = {
  futbol: '/futbol.png',
  hockey: '/hockey.png',
  basquet: '/basquetbol-logo.svg',
} as const


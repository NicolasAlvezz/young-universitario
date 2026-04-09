import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Mantener compatibilidad: el POST que llega a /basquetbol se reescribe al handler API.
  if (pathname === '/basquetbol' && request.method === 'POST') {
    const url = request.nextUrl.clone()
    url.pathname = '/api/basquetbol-ingest'
    return NextResponse.rewrite(url)
  }

  // La ruta antigua ya no existe como página: mandarla a Básquetbol.
  // (Esto evita 404 y además saca la sección de la navegación general.)
  if (pathname === '/estadisticas') {
    const url = request.nextUrl.clone()
    url.pathname = '/basquetbol'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/basquetbol', '/estadisticas'],
}

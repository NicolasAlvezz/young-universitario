import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/basquetbol' && request.method === 'POST') {
    const url = request.nextUrl.clone()
    url.pathname = '/api/basquetbol-ingest'
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/basquetbol',
}

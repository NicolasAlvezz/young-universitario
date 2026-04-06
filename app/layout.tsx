import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600','700','800','900'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://younguniversitario.com.ar'),
  title: 'Young Universitario | Club Deportivo',
  description: 'Club Deportivo Young Universitario. Fútbol, Hockey y Básquetbol. Pasión, esfuerzo y comunidad.',
  keywords: 'Young Universitario, club deportivo, fútbol, hockey, básquetbol, reserva, mayores',
  openGraph: {
    title: 'Young Universitario | Club Deportivo',
    description: 'Club Deportivo Young Universitario. Fútbol, Hockey y Básquetbol.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Young Universitario',
  },
  icons: {
    icon: '/escudo.png',
    apple: '/escudo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

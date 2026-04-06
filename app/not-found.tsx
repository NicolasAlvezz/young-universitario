import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-club-black flex flex-col items-center justify-center px-6 text-center">
      <p className="text-club-red text-sm font-bold uppercase tracking-widest mb-4">404</p>
      <h1 className="heading-md text-white mb-4">Página no encontrada</h1>
      <p className="text-club-muted text-sm max-w-md mb-8">
        La página que buscás no existe o fue movida.
      </p>
      <Link href="/" className="btn-club-red">
        Volver al inicio
      </Link>
    </div>
  )
}

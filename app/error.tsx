'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-club-black flex flex-col items-center justify-center px-6 text-center">
      <p className="text-club-red text-sm font-bold uppercase tracking-widest mb-4">Error</p>
      <h1 className="heading-md text-white mb-4">Algo salió mal</h1>
      <p className="text-club-muted text-sm max-w-md mb-8">
        {error.message || 'Ocurrió un problema al cargar esta página.'}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="btn-club-red"
      >
        Reintentar
      </button>
    </div>
  )
}

'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased flex flex-col items-center justify-center px-6 text-center">
        <p className="text-[#CC0000] text-sm font-bold uppercase tracking-widest mb-4">Error</p>
        <h1 className="text-2xl font-black uppercase tracking-tight mb-4">Algo salió mal</h1>
        <p className="text-[#9CA3AF] text-sm max-w-md mb-8">
          {error.message || 'Ocurrió un problema en la aplicación.'}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="bg-[#CC0000] hover:bg-[#990000] text-white font-bold py-3 px-8 rounded uppercase tracking-wider text-sm transition-colors"
        >
          Reintentar
        </button>
      </body>
    </html>
  )
}

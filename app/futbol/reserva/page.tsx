import SportPageTemplate from '@/components/young/SportPageTemplate'
export const metadata = { title: 'Fútbol Reserva | Young Universitario' }
const icon = (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" />
    <path d="M32 8 L37 20 L32 25 L27 20 Z" fill="currentColor" opacity="0.8" />
    <path d="M32 56 L37 44 L32 39 L27 44 Z" fill="currentColor" opacity="0.8" />
    <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.4" />
  </svg>
)
export default function FutbolReservaPage() {
  return <SportPageTemplate sport="Fútbol" category="Reserva" description="El semillero de Young Universitario. Jóvenes talentos que trabajan cada día para llegar a la primera." icon={icon} players={[]} upcomingMatches={[]} results={[]} />
}

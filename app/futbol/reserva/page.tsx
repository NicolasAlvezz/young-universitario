import Image from 'next/image'
import SportPageTemplate from '@/components/young/SportPageTemplate'
export const metadata = { title: 'Fútbol Reserva | Young Universitario' }
const icon = <Image src="/futbol.png" alt="Fútbol" width={80} height={80} className="object-contain w-20 h-20" />
export default function FutbolReservaPage() {
  return <SportPageTemplate sport="Fútbol" category="Reserva" description="El semillero de Young Universitario. Jóvenes talentos que compiten en la División D de la Liga Universitaria de Uruguay de Deportes, trabajando cada día para llegar a la primera." icon={icon} players={[]} upcomingMatches={[]} results={[]} />
}

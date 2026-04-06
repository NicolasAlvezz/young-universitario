import Image from 'next/image'
import SportPageTemplate from '@/components/young/SportPageTemplate'
export const metadata = { title: 'Fútbol Primera División | Young Universitario' }
const icon = <Image src="/futbol.png" alt="Fútbol" width={80} height={80} className="object-contain w-20 h-20" />
export default function FutbolMayoresPage() {
  return <SportPageTemplate sport="Fútbol" category="Primera División" description="El equipo de Primera División de Young Universitario compite en la División D de la Liga Universitaria de Uruguay de Deportes con pasión y garra en cada partido." icon={icon} players={[]} upcomingMatches={[]} results={[]} />
}

import Image from 'next/image'
import SportPageTemplate from '@/components/young/SportPageTemplate'
export const metadata = { title: 'Hockey | Young Universitario' }
const icon = <Image src="/hockey.png" alt="Hockey" width={80} height={80} className="object-contain w-20 h-20" />
export default function HockeyPage() {
  return <SportPageTemplate sport="Hockey" description="El equipo de hockey sobre césped de Young Universitario combina velocidad, precisión y trabajo en equipo." icon={icon} players={[]} upcomingMatches={[]} results={[]} />
}

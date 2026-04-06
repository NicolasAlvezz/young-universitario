import Image from 'next/image'
import SportPageTemplate from '@/components/young/SportPageTemplate'
export const metadata = { title: 'Básquetbol | Young Universitario' }
const icon = <Image src="/basquet.png" alt="Básquetbol" width={80} height={80} className="object-contain w-20 h-20" />
export default function BasquetbolPage() {
  return <SportPageTemplate sport="Básquetbol" description="El básquetbol de Young Universitario se juega con altura, agilidad y determinación." icon={icon} players={[]} upcomingMatches={[]} results={[]} />
}

import SportPageTemplate from '@/components/young/SportPageTemplate'
export const metadata = { title: 'Básquetbol | Young Universitario' }
const icon = (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" />
    <path d="M32 4 L32 60" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
    <path d="M4 32 L60 32" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
    <path d="M32 4 Q14 16 14 32 Q14 48 32 60" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.6" />
    <path d="M32 4 Q50 16 50 32 Q50 48 32 60" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.6" />
  </svg>
)
export default function BasquetbolPage() {
  return <SportPageTemplate sport="Básquetbol" description="El básquetbol de Young Universitario se juega con altura, agilidad y determinación." icon={icon} players={[]} upcomingMatches={[]} results={[]} />
}

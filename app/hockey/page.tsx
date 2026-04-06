import SportPageTemplate from '@/components/young/SportPageTemplate'
export const metadata = { title: 'Hockey | Young Universitario' }
const icon = (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
    <path d="M12 10 L12 46 Q12 56 24 56 L36 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="48" cy="52" rx="10" ry="5" fill="currentColor" opacity="0.7" />
    <path d="M26 24 L52 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
    <path d="M30 33 L52 33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
  </svg>
)
export default function HockeyPage() {
  return <SportPageTemplate sport="Hockey" description="El equipo de hockey de Young Universitario combina velocidad, precisión y trabajo en equipo." icon={icon} players={[]} upcomingMatches={[]} results={[]} />
}

import SportPageTemplate from '@/components/young/SportPageTemplate'
export const metadata = { title: 'Fútbol Primera División | Young Universitario' }
const icon = (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" />
    <path d="M32 8 L37 20 L32 25 L27 20 Z" fill="currentColor" opacity="0.8" />
    <path d="M32 56 L37 44 L32 39 L27 44 Z" fill="currentColor" opacity="0.8" />
    <path d="M8 32 L20 27 L25 32 L20 37 Z" fill="currentColor" opacity="0.8" />
    <path d="M56 32 L44 27 L39 32 L44 37 Z" fill="currentColor" opacity="0.8" />
  </svg>
)
export default function FutbolMayoresPage() {
  return <SportPageTemplate sport="Fútbol" category="Primera División" description="El equipo de primera división de Young Universitario compite con pasión y garra en cada partido." icon={icon} players={[]} upcomingMatches={[]} results={[]} />
}

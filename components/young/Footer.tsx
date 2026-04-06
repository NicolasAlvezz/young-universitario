import Link from 'next/link'
import YULogo from './YULogo'

const links = [
  { title: 'Disciplinas', items: [{ label: 'Fútbol Mayores', href: '/futbol/mayores' }, { label: 'Fútbol Reserva', href: '/futbol/reserva' }, { label: 'Hockey', href: '/hockey' }, { label: 'Básquetbol', href: '/basquetbol' }] },
  { title: 'Club', items: [{ label: 'Inicio', href: '/' }, { label: 'Fútbol', href: '/futbol' }] },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-club-black border-t border-club-gray-mid">
      <div className="container-yu py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <YULogo size={48} />
              <div>
                <p className="text-white font-black uppercase text-lg leading-tight tracking-wider">Young</p>
                <p className="text-club-red font-black uppercase text-lg leading-tight tracking-wider">Universitario</p>
              </div>
            </div>
            <p className="text-club-muted text-sm leading-relaxed max-w-xs mb-8">Club Deportivo Young Universitario. Fundado el 14 de febrero de 2017. Fútbol, Hockey y Básquetbol. División D — Liga Universitaria de Uruguay de Deportes.</p>
            <a href="https://www.instagram.com/younguniversitario/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-club-gray rounded flex items-center justify-center text-white hover:bg-club-red transition-colors duration-300 inline-flex" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
            </a>
          </div>
          {links.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-b border-club-gray-mid pb-3">{group.title}</h4>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}><Link href={item.href} className="text-club-muted hover:text-club-red transition-colors duration-200 text-sm">{item.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-club-gray-mid">
        <div className="container-yu py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-club-muted text-xs uppercase tracking-widest">© {currentYear} Young Universitario. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-club-black border border-club-red rounded-full" />
            <div className="w-3 h-3 bg-club-red rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'

const sports = [
  { id: 'futbol-mayores', title: 'Primera División', category: 'Fútbol', href: '/futbol/mayores', description: 'Nuestro equipo principal compite en la división mayor. Garra, técnica y corazón en cada partido.', label: 'Mayores',
    icon: <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12"><circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" /><path d="M24 8 L28 18 L24 22 L20 18 Z" fill="currentColor" opacity="0.8" /><path d="M24 40 L28 30 L24 26 L20 30 Z" fill="currentColor" opacity="0.8" /><path d="M8 24 L18 20 L22 24 L18 28 Z" fill="currentColor" opacity="0.8" /><path d="M40 24 L30 20 L26 24 L30 28 Z" fill="currentColor" opacity="0.8" /></svg> },
  { id: 'futbol-reserva', title: 'Reserva', category: 'Fútbol', href: '/futbol/reserva', description: 'El semillero del club. Jóvenes talentos que dan todo para llegar a la primera.', label: 'Reserva',
    icon: <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12"><circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" /><path d="M24 8 L28 18 L24 22 L20 18 Z" fill="currentColor" opacity="0.8" /><circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.4" /></svg> },
  { id: 'hockey', title: 'Hockey', category: 'Hockey', href: '/hockey', description: 'Velocidad, precisión y trabajo en equipo. Nuestro equipo de hockey en toda su intensidad.', label: 'Hockey',
    icon: <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12"><path d="M10 8 L10 36 Q10 42 18 42 L26 42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><ellipse cx="36" cy="38" rx="8" ry="4" fill="currentColor" opacity="0.7" /><path d="M20 20 L38 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" /></svg> },
  { id: 'basquetbol', title: 'Básquetbol', category: 'Básquetbol', href: '/basquetbol', description: 'Altura, agilidad y determinación. El básquet del club vive en cada cancha.', label: 'Básquetbol',
    icon: <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12"><circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" /><path d="M24 4 L24 44" stroke="currentColor" strokeWidth="2" opacity="0.6" /><path d="M4 24 L44 24" stroke="currentColor" strokeWidth="2" opacity="0.6" /><path d="M24 4 Q10 14 10 24 Q10 34 24 44" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" /><path d="M24 4 Q38 14 38 24 Q38 34 24 44" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" /></svg> },
]

export default function SportsGrid() {
  return (
    <section className="section-padding bg-club-dark">
      <div className="container-yu">
        <div className="text-center mb-16">
          <p className="text-club-red text-sm font-bold uppercase tracking-widest mb-3">Club Deportivo</p>
          <h2 className="heading-lg text-white mb-4">Nuestras Disciplinas</h2>
          <div className="divider-red mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport) => (
            <Link key={sport.id} href={sport.href} className="card-sport group flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-club-red to-club-red-dark" />
              <div className="p-6 flex flex-col flex-1">
                <span className="text-club-red text-xs font-bold uppercase tracking-widest mb-4">{sport.label}</span>
                <div className="text-white mb-5 group-hover:text-club-red transition-colors duration-300">{sport.icon}</div>
                <h3 className="heading-sm text-white mb-3 group-hover:text-club-red transition-colors duration-300">{sport.title}</h3>
                <p className="text-club-muted text-sm leading-relaxed flex-1">{sport.description}</p>
                <div className="mt-6 flex items-center gap-2 text-club-red text-sm font-bold uppercase tracking-wider">
                  <span>Ver más</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

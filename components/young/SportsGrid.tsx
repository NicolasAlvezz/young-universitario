import Link from 'next/link'
import SafeLogo from '@/components/young/SafeLogo'
import { LOGOS, LOGOS_FALLBACK } from '@/lib/assets'

const sports = [
  { id: 'futbol-mayores', title: 'Primera División', category: 'Fútbol', href: '/futbol/mayores', description: 'Nuestro equipo principal compite en la división mayor. Garra, técnica y corazón en cada partido.', label: 'Mayores',
    img: LOGOS.futbol, fallbackImg: LOGOS_FALLBACK.futbol },
  { id: 'futbol-reserva', title: 'Reserva', category: 'Fútbol', href: '/futbol/reserva', description: 'El semillero del club. Jóvenes talentos que dan todo para llegar a la primera.', label: 'Reserva',
    img: LOGOS.futbol, fallbackImg: LOGOS_FALLBACK.futbol },
  { id: 'hockey', title: 'Hockey', category: 'Hockey', href: '/hockey', description: 'Velocidad, precisión y trabajo en equipo. Hockey sobre césped con toda la intensidad.', label: 'Hockey',
    img: LOGOS.hockey, fallbackImg: LOGOS_FALLBACK.hockey },
  { id: 'basquetbol', title: 'Básquetbol', category: 'Básquetbol', href: '/basquetbol', description: 'Altura, agilidad y determinación. El básquet del club vive en cada cancha.', label: 'Básquetbol',
    img: LOGOS.basquet, fallbackImg: LOGOS_FALLBACK.basquet },
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

                <div className="mb-5 flex items-center h-12">
                  <SafeLogo
                    src={sport.img}
                    fallbackSrc={sport.fallbackImg}
                    alt={sport.title}
                    width={48}
                    height={48}
                    className="object-contain w-12 h-12 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  />
                </div>

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

const stats = [
  { label: 'Fundación', value: '2017' },
  { label: 'Disciplinas', value: '3' },
  { label: 'Equipos', value: '4' },
  { label: 'Pasión', value: '100%' },
]

export default function AboutSection() {
  return (
    <section className="section-padding bg-club-black relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-club-red opacity-5 blur-3xl rounded-full" />
      <div className="container-yu relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-club-red text-sm font-bold uppercase tracking-widest mb-3">Quiénes somos</p>
            <h2 className="heading-lg text-white mb-6">El espíritu<br /><span className="text-club-red">Young</span></h2>
            <div className="divider-red mb-8" />
            <div className="space-y-5 text-club-muted leading-relaxed">
              <p>Fundado el <span className="text-white font-semibold">14 de febrero de 2017</span>, Young Universitario es más que un club deportivo. Es un lugar donde la pasión por el deporte se convierte en comunidad, donde cada jugador da lo mejor de sí en la cancha y fuera de ella.</p>
              <p>Con equipos de fútbol en Primera División y Reserva compitiendo en la <span className="text-white font-semibold">División D de la Liga Universitaria de Uruguay de Deportes</span>, además de hockey sobre césped y básquetbol, el club ofrece un espacio para crecer, competir y pertenecer.</p>
              <p>Los colores negro y rojo representan la garra y la determinación que definen la identidad de Young Universitario.</p>
            </div>
            <div className="mt-10">
              <a href="https://www.instagram.com/younguniversitario/" target="_blank" rel="noopener noreferrer" className="btn-club-red inline-block">Seguinos en Instagram</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-club-dark border border-club-gray-mid rounded-lg p-8 text-center hover:border-club-red transition-colors duration-300">
                <div className="text-4xl md:text-5xl font-black text-club-red mb-3">{stat.value}</div>
                <div className="text-club-muted text-xs uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

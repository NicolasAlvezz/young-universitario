import Header from '@/components/young/Header'
import Hero from '@/components/young/Hero'
import SportsGrid from '@/components/young/SportsGrid'
import AboutSection from '@/components/young/AboutSection'
import InstagramSection from '@/components/young/InstagramSection'
import Footer from '@/components/young/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-club-black">
      <Header />
      <Hero />
      <SportsGrid />
      <AboutSection />
      <InstagramSection />
      <Footer />
    </main>
  )
}

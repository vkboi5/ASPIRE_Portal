import Features from '@/components/LandingPage/Features/Features'
import HeroSection from '@/components/LandingPage/HeroSection/HeroSection'
import Testimonial from '@/components/LandingPage/Testimonial/Testimonial'
import CTA from '@/components/LandingPage/CTA/CTA'
// import Footer from '@/components/LandingPage/Footer/Footer'
import Eligibility from '@/components/LandingPage/Eligibility/Eligibility'
function Main() {
  return (
    <div className='w-full'>
      <HeroSection />
      <Features />
      <Eligibility />
      <Testimonial />
      <CTA />
    </div>
  )
}

export default Main

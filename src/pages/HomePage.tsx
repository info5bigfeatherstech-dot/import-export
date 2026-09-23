import HeroSection from '../components/home/HeroSection'
// import TrustBar from '../components/home/TrustBar'
import ExportCategories from '../components/home/ExportCategories'
import FactoryShowcase from '../components/home/FactoryShowcase'
import ApparelServices from '../components/home/ApparelServices'
import ExportMarketSection from '../components/home/ExportMarketSection'
import FactoryGallery from '../components/home/FactoryGallery'
import WhyChooseUs from '../components/home/WhyChooseUs'
import TradeProcess from '../components/home/TradeProcess'
import IndustriesSection from '../components/home/IndustriesSection'
import FaqSection from '../components/home/FaqSection'
import Testimonials from '../components/home/Testimonials'
import CtaSection from '../components/home/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <TrustBar /> */}
      <ExportCategories />
      <FactoryShowcase />
      <ApparelServices />
      <ExportMarketSection />
      <FactoryGallery />
      <WhyChooseUs />
      <TradeProcess />
      <IndustriesSection />
      <FaqSection />
      <Testimonials />
      <CtaSection />
    </>
  )
}

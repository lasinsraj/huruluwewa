
import Hero from '@/components/Hero';
import DestinationHighlights from '@/components/DestinationHighlights';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <DestinationHighlights />
        <Gallery />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

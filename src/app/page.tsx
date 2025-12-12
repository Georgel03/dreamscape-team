import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import Features from '@/src/components/Features';
import Pricing from '@/src/components/Pricing';
import Footer from '@/src/components/Footer';
import CollectiveSubconscious from '@/src/components/CollectiveSubconscious';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <CollectiveSubconscious />
      <Footer />
    </div>
  );
}
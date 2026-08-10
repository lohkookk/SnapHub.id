import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Gallery from '../components/Gallery';
import Pricelist from '../components/Pricelist';
import ProfitCalculator from '../components/ProfitCalculator';
import Maps from '../components/Maps';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingWhatsapp from '../components/FloatingWhatsapp';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Gallery />
        <Pricelist />
        <ProfitCalculator />
        <Maps />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
};

export default Home;

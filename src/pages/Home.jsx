import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Gallery from '../components/Gallery';
import Pricelist from '../components/Pricelist';
import BookingCalendar from '../components/BookingCalendar';
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
        <BookingCalendar />
        {/* <ProfitCalculator /> */}
        <Maps />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
};

export default Home;

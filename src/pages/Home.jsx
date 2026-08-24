import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import ClientLogos from '../components/ClientLogos';
import Features from '../components/Features';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import Pricelist from '../components/Pricelist';
import BookingCalendar from '../components/BookingCalendar';
import Maps from '../components/Maps';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BotAssistant from '../components/BotAssistant';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Gallery />
        <Reviews />
        <Pricelist />
        <ClientLogos />
        <BookingCalendar />
        <Maps />
        <Contact />
      </main>
      <Footer />
      <BotAssistant />
    </>
  );
};

export default Home;

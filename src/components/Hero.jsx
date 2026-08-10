import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiChevronDown } from 'react-icons/fi';
import heroBg from '../assets/hero_background.png';

const WA_URL = 'https://wa.me/6285190643459?text=Halo%20SnapHub%2C%20saya%20ingin%20booking%20photobooth!';

const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  w: (Math.random() * 3 + 1.5).toFixed(1),
  h: (Math.random() * 3 + 1.5).toFixed(1),
  left: (Math.random() * 100).toFixed(1),
  top: (Math.random() * 100).toFixed(1),
  color: i % 3 === 0 ? '#D90429' : i % 3 === 1 ? 'rgba(255,255,255,0.3)' : 'rgba(217,4,41,0.4)',
  glow: i % 4 === 0 ? '0 0 5px rgba(217,4,41,0.9)' : undefined,
  dur: parseFloat((Math.random() * 5 + 4).toFixed(1)),
  delay: parseFloat((Math.random() * 6).toFixed(1)),
}));

const STATS = [
  { num: '500+', label: 'Events Done' },
  { num: '5K+', label: 'Happy Clients' },
  { num: '4.9★', label: 'Avg Rating' },
];

const Hero = () => {
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    const handler = (e) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    el?.addEventListener('mousemove', handler, { passive: true });
    return () => el?.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-[#0B0B0B]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0B0B] to-transparent" />

      {/* Mouse glow */}
      <div className="hero-mouse-glow" style={{ left: mouse.x, top: mouse.y }} />

      {/* Red orb */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '36rem', height: '36rem',
          background: 'radial-gradient(circle, rgba(217,4,41,0.2) 0%, rgba(217,4,41,0.04) 55%, transparent 70%)',
          filter: 'blur(55px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full pointer-events-none select-none"
          style={{ width: p.w + 'px', height: p.h + 'px', left: p.left + '%', top: p.top + '%', background: p.color, boxShadow: p.glow }}
          animate={{ y: [0, -100, 0], opacity: [0, 0.7, 0], scale: [0, 1, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Hero Content ── */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-5 sm:px-8   max-w-5xl mx-auto pt-28 pb-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="inline-flex items-center gap-3 glass border border-[#D90429]/35 rounded-2xl text-xs sm:text-sm text-[#D90429] font-medium mb-1624 select-none whitespace-nowrap"
          style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem', paddingLeft: '1.25rem', paddingRight: '1.5rem' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#D90429] animate-pulse flex-shrink-0" />
          <span className="tracking-wider">Premium Photobooth Services</span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-hero text-white mb-6 w-full"
          style={{ paddingBottom: "20px" }}
        >
          Capture Every{' '}
          <span className="text-[#D90429] glow-red-text">Smile,</span>
          <br />
          Create Every{' '}
          <span className="relative inline-block">
            Memory.
            <motion.span
              className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-[#D90429] to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1.3, duration: 0.9, ease: 'easeOut' }}
            />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-sm md:text-[18px] text-gray-300 max-w-xl mx-auto mb-10 leading-[1.85]"
          style={{ paddingBottom: "10px" }}
        >
          Premium Photobooth Services for Every Special Occasion —
          luxury experience, instant memories, unforgettable moments.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.65 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full"
          style={{ paddingBottom: "20px" }}
        >
          <motion.a
            href={WA_URL} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 0 38px rgba(217,4,41,0.6)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary px-8 py-3.5"
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Book via WhatsApp
          </motion.a>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="pricelist" smooth={true} offset={-72} duration={650}
              className="btn-outline px-8 py-3.5 cursor-pointer">
              View Pricelist
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-6 sm:gap-12"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-6 sm:gap-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#D90429] font-heading leading-none">{s.num}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
              {i < STATS.length - 1 && <div className="hidden sm:block w-px h-8 bg-white/10" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1.5 text-gray-600 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <FiChevronDown className="text-[#D90429]" size={18} />
        </motion.div>
      </motion.div>
    </section >
  );
};

export default Hero;

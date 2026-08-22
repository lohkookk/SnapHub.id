import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiUsers, FiCamera, FiZap, FiPrinter, FiSmartphone, FiBox } from 'react-icons/fi';
import aboutImg from '../assets/about_image.webp';

const BADGES = [
  { icon: <FiUsers />, label: 'Professional Crew' },
  { icon: <FiCamera />, label: 'Premium Camera' },
  { icon: <FiZap />, label: 'Unlimited Session' },
  { icon: <FiPrinter />, label: 'Instant Print' },
  { icon: <FiSmartphone />, label: 'Digital Copy' },
  { icon: <FiBox />, label: 'Elegant Booth' },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section-pad bg-[#0B0B0B] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #D90429, transparent)', filter: 'blur(90px)' }} />

      <div className="wrap" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* ── Left: Image ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative pt-4 pb-4"
          >
            <div className="gradient-border">
              <div className="img-hover-zoom rounded-[19px]" style={{ height: '480px' }}>
                <img src={aboutImg} alt="SnapHub professional photobooth team" loading="lazy" />
              </div>
            </div>

            {/* Stat card — bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.85 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
              whileHover={{ y: -4, backgroundColor: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(217, 4, 41, 0.35)', boxShadow: '0 0 35px rgba(217, 4, 41, 0.12), 0 20px 50px rgba(0, 0, 0, 0.4)' }}
              className="absolute bottom-0 -right-2 sm:-right-6 z-20 glass px-5 py-4 rounded-[20px]"
              style={{ border: '1px solid rgba(217,4,41,0.3)', boxShadow: '0 0 25px rgba(217, 4, 41, 0.45), 0 0 70px rgba(217, 4, 41, 0.12)' }}
            >
              <div className="text-[1.75rem] font-bold text-[#D90429] font-heading leading-none">500+</div>
              <div className="text-gray-400 text-xs mt-1 whitespace-nowrap">Successful Events</div>
            </motion.div>

            {/* Accent card — top left */}
            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.85 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ y: -4, backgroundColor: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(217, 4, 41, 0.35)', boxShadow: '0 0 35px rgba(217, 4, 41, 0.12), 0 20px 50px rgba(0, 0, 0, 0.4)' }}
              className="absolute top-0 -left-2 sm:-left-5 z-20 glass px-4 py-3 rounded-[20px]"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="text-[1.4rem] font-bold text-white font-heading leading-none">4.9★</div>
              <div className="text-gray-400 text-xs mt-0.5 whitespace-nowrap">Client Rating</div>
            </motion.div>
          </motion.div>

          {/* ── Right: Content ──────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[2px] bg-[#D90429] rounded flex-shrink-0" />
              <span className="text-eyebrow">About SnapHub</span>
            </motion.div>

            {/* Heading */}
            <motion.h2 variants={fadeUp} className="text-section-title text-white mb-5">
              Crafting <span className="text-[#D90429]">Timeless</span> Moments
            </motion.h2>

            {/* Body */}
            <motion.p variants={fadeUp} className="text-gray-400 text-[0.95rem] leading-[1.85] mb-4">
              SnapHub is a premium photobooth service provider dedicated to transforming your
              special occasions into unforgettable visual stories. We combine cutting-edge
              technology with artistic excellence to deliver an experience beyond just photos.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-400 text-[0.95rem] leading-[1.85] mb-9">
              From intimate weddings to grand corporate events, our professional team ensures
              every smile is captured with precision, elegance, and heart.
            </motion.p>

            {/* Badges */}
            <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {BADGES.map((b) => (
                <motion.div
                  key={b.label}
                  variants={fadeUp}
                  whileHover={{ scale: 1.04, borderColor: 'rgba(217,4,41,0.45)' }}
                  className="glass flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 cursor-default group"
                >
                  <span className="text-[#D90429] text-[1rem] flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {b.icon}
                  </span>
                  <span className="text-gray-400 text-[0.82rem] font-medium leading-tight">{b.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

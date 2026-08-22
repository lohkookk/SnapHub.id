import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCamera, FiStar, FiPrinter, FiImage, FiLayout, FiUsers, FiGift, FiZap, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const FEATURES = [
  { icon: <FiCamera />,  title: 'Unlimited Photos',  desc: 'Foto sebanyak yang Anda inginkan — tanpa batasan, keseruan tiada henti dan hasil sempurna setiap saat.' },
  { icon: <FiStar />,    title: 'High Resolution',   desc: 'Setiap jepretan ditangkap dalam resolusi 4K yang memukau untuk hasil cetak sejernih kristal layaknya galeri.' },
  { icon: <FiPrinter />, title: 'Instant Print',     desc: 'Hasil cetak berkualitas profesional dalam hitungan detik — kenangan langsung ada di genggaman Anda.' },
  { icon: <FiImage />,   title: 'Digital Gallery',   desc: 'Semua foto langsung diunggah ke galeri online pribadi dan mudah dibagikan ke semua orang.' },
  { icon: <FiLayout />,  title: 'Custom Template',   desc: 'Desain bingkai khusus yang disesuaikan secara sempurna dengan tema dan nuansa acara Anda.' },
  { icon: <FiUsers />,   title: 'Professional Team', desc: 'Kru berpengalaman kami akan memandu tamu Anda untuk memastikan kelancaran dan keseruan acara.' },
  { icon: <FiGift />,    title: 'Premium Props',     desc: 'Koleksi properti dan aksesoris berkelas yang sudah dikurasi untuk memicu kreativitas dan keseruan.' },
  { icon: <FiZap />,     title: 'Fast Setup',        desc: 'Kami tangani semuanya — datang lebih awal, persiapan cepat, agar Anda bisa fokus pada acara Anda.' },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const card    = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } };

const Features = () => {
  const ref    = useRef(null);
  const carouselRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="features" className="section-pad bg-[#111111] relative overflow-hidden">
      {/* Centre glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[700px] h-[700px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #D90429, transparent)', filter: 'blur(90px)' }} />
      </div>

      <div className="wrap relative z-10">
        {/* ── Header ─────────────────────────────── */}
        <div className="section-header" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="eyebrow-row"
          >
            <div className="eyebrow-line" />
            <span className="text-eyebrow">Why Choose Us</span>
            <div className="eyebrow-line" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-section-title text-white mt-3 mb-4"
          >
            Everything You <span className="text-[#D90429]">Need</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="section-desc"
          >
            Fitur-fitur premium yang dirancang untuk membuat acara Anda tak terlupakan dan setiap foto menjadi luar biasa.
          </motion.p>
        </div>

        {/* ── Grid / Mobile Carousel ───────────────────────────────── */}
        <div className="relative group">
          <motion.div
            ref={carouselRef}
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none gap-4 sm:gap-6 pb-6 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={card}
                className="shrink-0 w-[82vw] max-w-[300px] snap-center sm:w-auto sm:max-w-none sm:shrink sm:snap-align-none"
              >
                <article className="glass-card p-6 flex flex-col gap-4 cursor-default h-full">
                  <div className="w-11 h-11 rounded-xl bg-[#D90429]/10 border border-[#D90429]/20 flex items-center justify-center text-[#D90429] text-lg flex-shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-[0.95rem] mb-2 font-heading">{f.title}</h3>
                    <p className="text-gray-400 text-[0.83rem] leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <div className="h-[2px] rounded-full"
                      style={{ background: `linear-gradient(90deg, #D90429 ${(i + 1) * 12}%, transparent)`, opacity: 0.45 }} />
                  </div>
                </article>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Arrows (Mobile Only) */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0B0B0B]/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md border border-white/10 sm:hidden hover:bg-[#D90429] shadow-xl ml-2"
          >
            <FiChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0B0B0B]/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md border border-white/10 sm:hidden hover:bg-[#D90429] shadow-xl mr-2"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;

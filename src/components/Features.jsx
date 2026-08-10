import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCamera, FiStar, FiPrinter, FiImage, FiLayout, FiUsers, FiGift, FiZap } from 'react-icons/fi';

const FEATURES = [
  { icon: <FiCamera />,  title: 'Unlimited Photos',  desc: 'Snap as many as you want — no limits, just endless fun and perfect shots every time.' },
  { icon: <FiStar />,    title: 'High Resolution',   desc: 'Every shot captured in stunning 4K for crystal-clear, gallery-quality prints.' },
  { icon: <FiPrinter />, title: 'Instant Print',     desc: 'Professional-grade prints delivered in seconds — hold your memories right away.' },
  { icon: <FiImage />,   title: 'Digital Gallery',   desc: 'All photos instantly uploaded to a private online gallery, shareable with everyone.' },
  { icon: <FiLayout />,  title: 'Custom Template',   desc: 'Personalized frames designed to perfectly match your event theme and branding.' },
  { icon: <FiUsers />,   title: 'Professional Team', desc: 'Experienced crew guides your guests and ensures seamless, flawless operation.' },
  { icon: <FiGift />,    title: 'Premium Props',     desc: 'Curated luxury props and accessories to spark creativity and unforgettable fun.' },
  { icon: <FiZap />,     title: 'Fast Setup',        desc: 'We handle everything — arrive early, set up fast, so you can focus on your event.' },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const card    = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } };

const Features = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="section-pad bg-[#111111] relative overflow-hidden">
      {/* Centre glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[700px] h-[700px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #D90429, transparent)', filter: 'blur(90px)' }} />
      </div>

      <div className="wrap">
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
            Premium features designed to make your event unforgettable and every photo exceptional.
          </motion.p>
        </div>

        {/* ── Grid ───────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              variants={card}
              className="glass-card p-6 flex flex-col gap-4 cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-[#D90429]/10 border border-[#D90429]/20 flex items-center justify-center text-[#D90429] text-lg flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-[0.95rem] mb-2 font-heading">{f.title}</h3>
                <p className="text-gray-500 text-[0.83rem] leading-relaxed">{f.desc}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-white/[0.06]">
                <div className="h-[2px] rounded-full"
                  style={{ background: `linear-gradient(90deg, #D90429 ${(i + 1) * 12}%, transparent)`, opacity: 0.45 }} />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

import React, { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

import weddingImg    from '../assets/gallery_wedding.png';
import graduationImg from '../assets/gallery_graduation.png';
import birthdayImg   from '../assets/gallery_birthday.png';
import corporateImg  from '../assets/gallery_corporate.png';
import familyImg     from '../assets/gallery_family.png';
import engagementImg from '../assets/gallery_engagement.png';

const CATEGORIES = ['All', 'Wedding', 'Graduation', 'Birthday', 'Corporate', 'Family', 'Engagement'];

const GALLERY = [
  { id: 1, src: weddingImg,    cat: 'Wedding',    title: 'Elegant Wedding',        span: 'row-span-2' },
  { id: 2, src: graduationImg, cat: 'Graduation', title: 'Graduation Celebration', span: '' },
  { id: 3, src: birthdayImg,   cat: 'Birthday',   title: 'Birthday Party',         span: '' },
  { id: 4, src: corporateImg,  cat: 'Corporate',  title: 'Corporate Gala',         span: 'row-span-2' },
  { id: 5, src: familyImg,     cat: 'Family',     title: 'Family Reunion',         span: '' },
  { id: 6, src: engagementImg, cat: 'Engagement', title: 'Engagement Session',     span: '' },
];

const Gallery = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [active,   setActive]   = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === active);
  const openLb   = (i) => setLightbox(i);
  const closeLb  = ()  => setLightbox(null);
  const prev     = useCallback(() => setLightbox((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next     = useCallback(() => setLightbox((i) => (i + 1) % filtered.length), [filtered.length]);

  return (
    <section id="gallery" className="section-pad bg-[#0B0B0B] relative overflow-hidden">
      {/* Top bleed from features */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#111111] to-transparent pointer-events-none" />

      <div className="wrap">
        {/* ── Header ─────────────────────────────── */}
        <div className="section-header" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="eyebrow-row">
            <div className="eyebrow-line" />
            <span className="text-eyebrow">Our Portfolio</span>
            <div className="eyebrow-line" />
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            className="text-section-title text-white mt-3 mb-4">
            Captured <span className="text-[#D90429]">Moments</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.65, delay: 0.2 }}
            className="section-desc mb-8">
            Every frame tells a story. Explore our portfolio of unforgettable events and memories.
          </motion.p>

          {/* Filter tabs — centered */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 select-none whitespace-nowrap ${
                  active === cat
                    ? 'bg-[#D90429] text-white border border-[#D90429] shadow-[0_0_20px_rgba(217,4,41,0.45)]'
                    : 'glass border border-white/10 text-gray-400 hover:text-white hover:border-[#D90429]/40 hover:bg-white/[0.06]'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* ── Masonry Grid ───────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ gridAutoRows: '220px' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.38, delay: i * 0.04 }}
                onClick={() => openLb(i)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="text-[#D90429] text-[0.68rem] font-medium uppercase tracking-widest mb-1">{img.cat}</p>
                  <p className="text-white font-semibold text-[0.9rem] font-heading">{img.title}</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiMaximize2 size={13} />
                </div>
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#D90429]/30 transition-all duration-400 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Lightbox ───────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] lightbox-bg flex items-center justify-center"
            onClick={closeLb}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox]?.src}
                alt={filtered[lightbox]?.title}
                className="w-full max-h-[78vh] object-contain rounded-2xl mx-auto"
              />
              <div className="mt-4">
                <p className="text-[#D90429] text-xs tracking-widest uppercase">{filtered[lightbox]?.cat}</p>
                <p className="text-white font-semibold text-lg font-heading mt-1">{filtered[lightbox]?.title}</p>
              </div>
            </motion.div>

            <button onClick={closeLb} aria-label="Close"
              className="absolute top-5 right-5 w-10 h-10 glass border border-white/15 rounded-full flex items-center justify-center text-white hover:text-[#D90429] transition-colors">
              <FiX size={18} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 glass border border-white/15 rounded-full flex items-center justify-center text-white hover:text-[#D90429] transition-colors">
              <FiChevronLeft size={20} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 glass border border-white/15 rounded-full flex items-center justify-center text-white hover:text-[#D90429] transition-colors">
              <FiChevronRight size={20} />
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 glass border border-white/15 px-3 py-1 rounded-full text-xs text-gray-400">
              {lightbox + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

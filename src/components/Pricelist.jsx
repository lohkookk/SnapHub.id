import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import pricelistImg from '../assets/pricelist_image.png';

const WA_URL = 'https://wa.me/6285190643459?text=Halo%20SnapHub%2C%20saya%20ingin%20booking%20photobooth!';

const WaIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Pricelist = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricelist" className="section-pad bg-[#111111] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D90429, transparent)', filter: 'blur(100px)' }} />

      <div className="wrap" ref={ref}>
        {/* ── Header ─────────────────────────────── */}
        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="eyebrow-row">
            <div className="eyebrow-line" /><span className="text-eyebrow">Transparent Pricing</span><div className="eyebrow-line" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            className="text-section-title text-white mt-3 mb-4">
            Our <span className="text-[#D90429]">Packages</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.65, delay: 0.2 }}
            className="section-desc">
            Choose the perfect package for your event. All packages include professional setup and crew.
          </motion.p>
        </div>

        {/* ── Image — centred with max width ─────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="gradient-border">
            <div className="img-hover-zoom rounded-[19px] bg-[#0B0B0B]" style={{ maxHeight: '680px' }}>
              <img
                src={pricelistImg}
                alt="SnapHub Photobooth Pricelist"
                loading="lazy"
                style={{ width: '100%', height: 'auto', maxHeight: '680px', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
        </motion.div>

        {/* ── CTA Buttons — centred ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
        >
          <motion.a
            href={pricelistImg}
            download="SnapHub_Pricelist.png"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline"
          >
            <FiDownload className="flex-shrink-0" /> Download Pricelist
          </motion.a>

          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(217,4,41,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
          >
            <WaIcon /> Book Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricelist;

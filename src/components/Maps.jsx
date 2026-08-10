import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMapPin, FiPhone, FiInstagram, FiClock } from 'react-icons/fi';

const WA_URL = 'https://wa.me/6285190643459?text=Halo%20SnapHub%2C%20saya%20ingin%20tanya%20lokasi!';

const WaIcon = ({ size = 14 }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const INFO = [
  { icon: <FiMapPin size={14} />,  label: 'Address',   value: 'Jl. Pemuda No. 45, Jakarta Pusat' },
  { icon: <FiPhone size={14} />,   label: 'Phone',     value: '+62 851-9064-3459', href: 'tel:+6285190643459' },
  { icon: <WaIcon />,              label: 'WhatsApp',  value: '+62 851-9064-3459', href: WA_URL },
  { icon: <FiInstagram size={14} />, label: 'Instagram', value: '@snaphub.id', href: 'https://instagram.com/snaphub.id' },
  { icon: <FiClock size={14} />,   label: 'Hours',     value: 'Mon – Sun  09:00 – 21:00 WIB' },
];

const Maps = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="maps" className="section-pad bg-[#111111] relative overflow-hidden">
      {/* Top bleed */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0B0B0B] to-transparent pointer-events-none" />

      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-[480px] h-[480px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D90429, transparent)', filter: 'blur(90px)' }} />

      <div className="wrap" ref={ref}>
        {/* ── Header ─────────────────────────────── */}
        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="eyebrow-row">
            <div className="eyebrow-line" /><span className="text-eyebrow">Find Us</span><div className="eyebrow-line" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            className="text-section-title text-white mt-3">
            Our <span className="text-[#D90429]">Location</span>
          </motion.h2>
        </div>

        {/* ── Body: Map + Info Card ──────────────── */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">

          {/* Map — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="gradient-border">
              <div className="rounded-[19px] overflow-hidden" style={{ height: '420px' }}>
                <iframe
                  title="SnapHub Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194740!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta%20Pusat%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'invert(92%) hue-rotate(180deg) saturate(0.7) brightness(0.92)',
                    display: 'block',
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>

          {/* Info Card — 1 col */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 flex flex-col gap-5"
          >
            <div>
              <h3 className="text-white font-semibold text-base font-heading mb-0.5">Contact Info</h3>
              <p className="text-gray-500 text-[0.78rem]">Visit or reach us anytime.</p>
            </div>

            <ul className="flex flex-col divide-y divide-white/[0.06]">
              {INFO.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#D90429]/10 border border-[#D90429]/20 flex items-center justify-center text-[#D90429] flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-600 text-[0.68rem] mb-0.5 uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-gray-300 text-[0.83rem] hover:text-[#D90429] transition-colors duration-200 leading-snug block">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-300 text-[0.83rem] leading-snug">{item.value}</p>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="https://maps.google.com/?q=Jakarta+Pusat"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 0 22px rgba(217,4,41,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary justify-center mt-1"
            >
              <FiMapPin size={14} /> Get Directions
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Maps;

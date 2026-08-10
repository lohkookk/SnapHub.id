import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiDownload, FiCheck, FiClock, FiPrinter, FiCamera, FiInfo } from 'react-icons/fi';

import pricelistImg from '../assets/pricelist_image.png';

const WA_URL = 'https://wa.me/6285190643459?text=Halo%20SnapHub%2C%20saya%20ingin%20booking%20photobooth!';

const WaIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PACKAGES = [
  {
    id: 'softfile',
    label: 'Soft File Only',
    icon: <FiCamera size={18} />,
    badge: null,
    startFrom: 'Rp 999.000',
    tagline: 'Kenangan digital tanpa batas',
    features: [
      'Free transport Kota Malang',
      'Camera + Lighting + Monitor 24"',
      '2 Standby Crew',
      'Unlimited Shots (can retake)',
      'Soft File via QR + GIF Booth',
      'Aksesoris / Funprops',
      '2 Free Custom Design (max 2 revisi)',
    ],
    prices: [
      { label: '3 Jam', price: 'Rp 999.000' },
      { label: '4 Jam', price: 'Rp 1.199.000' },
      { label: '5 Jam', price: 'Rp 1.399.000' },
      { label: '6 Jam', price: 'Rp 1.595.000' },
      { label: '7 Jam', price: 'Rp 1.850.000' },
      { label: '8 Jam', price: 'Rp 2.050.000' },
      { label: '9 Jam', price: 'Rp 2.250.000' },
      { label: '10 Jam', price: 'Rp 2.499.000' },
    ],
  },
  {
    id: 'limited',
    label: 'Limited Print',
    icon: <FiPrinter size={18} />,
    badge: null,
    startFrom: 'Rp 1.800.000',
    tagline: 'Cetak sesuai kebutuhan acara',
    features: [
      'Free transport Kota Malang',
      'Camera + Lighting + Monitor 24"',
      '2 Standby Crew',
      'Unlimited Shots (can retake)',
      'Soft File via QR + GIF Booth',
      'Aksesoris / Funprops',
      '2 Free Custom Design (max 2 revisi)',
      'Highspeed Print',
      'Kertas Foto 2R/4R (high quality)',
    ],
    prices: [
      { label: '100 Prints', sub: 'maks. 4 jam', price: 'Rp 1.800.000' },
      { label: '200 Prints', sub: 'maks. 5 jam', price: 'Rp 2.100.000' },
      { label: '300 Prints', sub: 'maks. 6 jam', price: 'Rp 2.500.000' },
      { label: '400 Prints', sub: 'maks. 7 jam', price: 'Rp 2.900.000' },
      { label: '500 Prints', sub: 'maks. 8 jam', price: 'Rp 3.400.000' },
      { label: '600 Prints', sub: 'maks. 8 jam', price: 'Rp 4.000.000' },
      { label: '700 Prints', sub: 'maks. 8 jam', price: 'Rp 4.600.000' },
      { label: '800 Prints', sub: 'maks. 9 jam', price: 'Rp 5.400.000' },
      { label: '900 Prints', sub: 'maks. 10 jam', price: 'Rp 6.200.000' },
    ],
  },
  {
    id: 'unlimited',
    label: 'Unlimited Print',
    icon: <FiPrinter size={18} />,
    badge: '🔥 Paling Populer',
    startFrom: 'Rp 2.400.000',
    tagline: 'Cetak sepuasnya tanpa batas',
    features: [
      'Free transport Kota Malang',
      'Camera + Lighting + Monitor 24"',
      '2 Standby Crew',
      'Unlimited Shots (can retake)',
      'Soft File via QR + GIF Booth',
      'Aksesoris / Funprops',
      '2 Free Custom Design (max 2 revisi)',
      'Highspeed Print',
      'Kertas Foto 2R/4R (high quality)',
    ],
    prices: [
      { label: '2 Jam', price: 'Rp 2.400.000' },
      { label: '3 Jam', price: 'Rp 2.900.000' },
      { label: '4 Jam', price: 'Rp 3.400.000' },
      { label: '5 Jam', price: 'Rp 3.900.000' },
      { label: '6 Jam', price: 'Rp 4.400.000' },
      { label: '7 Jam', price: 'Rp 4.850.000' },
      { label: '8 Jam', price: 'Rp 5.350.000' },
      { label: '9 Jam', price: 'Rp 5.850.000' },
      { label: '10 Jam', price: 'Rp 6.350.000' },
    ],
  },
];

const TNC = [
  { num: '01', text: 'Penyewa WAJIB DP 30% untuk booking tanggal acara.' },
  { num: '02', text: 'Pelunasan H-1 sebelum tanggal acara berlangsung.' },
  { num: '03', text: 'Pembayaran via QRIS atau Bank Transfer — Bank Jago a/n Made Puja Rajistha AW · No Rek: 102302896677.' },
  { num: '04', text: 'Jika cancel booking, DP dinyatakan Hangus.' },
  { num: '05', text: 'Konfirmasi perpindahan tanggal acara maksimal H-7 sebelum acara.' },
  { num: '06', text: 'Penyewa wajib mengisi FORMAT ORDER dan mendapat invoice dari tim SnapHub.' },
  { num: '07', text: 'Tim SnapHub standby di lokasi ±1 jam sebelum jam order.' },
];

/* ─── Sub-component: single price row ─────────────────────── */
const PriceRow = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.035, duration: 0.22 }}
    className="flex items-center justify-between py-2.5 border-b border-white/[0.06] last:border-b-0"
  >
    <div className="flex items-center gap-2.5">
      <FiClock size={12} className="text-[#D90429] shrink-0 opacity-60" />
      <div className="leading-none">
        <span className="text-white text-[13px] font-medium">{item.label}</span>
        {item.sub && (
          <span className="text-gray-500 text-[11px] ml-1.5">({item.sub})</span>
        )}
      </div>
    </div>
    <span className="text-[#D90429] font-bold text-[13px] md:text-sm tabular-nums">
      {item.price}
    </span>
  </motion.div>
);

/* ─── Main Component ───────────────────────────────────────── */
const Pricelist = () => {
  const [activeTab, setActiveTab] = useState(PACKAGES[0].id);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const pkg = PACKAGES.find((p) => p.id === activeTab);

  return (
    <section id="pricelist" className="section-pad bg-[#0B0B0B] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 80%, rgba(217,4,41,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="wrap" ref={ref}>
        {/* ── Section Header ─────────────────── */}
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="eyebrow-row"
          >
            <div className="eyebrow-line" />
            <span className="text-eyebrow">Transparent Pricing</span>
            <div className="eyebrow-line" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-section-title text-white mt-3 mb-4"
          >
            Our <span className="text-[#D90429]">Packages</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="section-desc"
          >
            Pilih paket yang sesuai dengan kebutuhan acaramu. Semua paket sudah
            termasuk setup profesional dan kru standby.
          </motion.p>
        </div>

        {/* ── Tab Switcher ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {PACKAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeTab === p.id
                ? 'bg-[#D90429] text-white border-[#D90429] shadow-[0_0_24px_rgba(217,4,41,0.35)]'
                : 'bg-transparent text-gray-400 border-white/10 hover:border-white/25 hover:text-white'
                }`}
            >
              {p.label}
            </button>
          ))}
        </motion.div>

        {/* ── Package Content ────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
            className="max-w-5xl mx-auto"
          >
            {/* Package title row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#D90429]/15 border border-[#D90429]/25 flex items-center justify-center text-[#D90429] shrink-0">
                {pkg.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-lg font-bold text-white font-heading leading-none">{pkg.label}</h3>
                  {pkg.badge && (
                    <span className="text-[11px] font-semibold bg-[#D90429]/20 text-[#D90429] border border-[#D90429]/30 px-2.5 py-0.5 rounded-full leading-none">
                      {pkg.badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-xs mt-1">{pkg.tagline}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Mulai dari</div>
                <div className="text-xl font-bold text-white">{pkg.startFrom}</div>
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start">
              {/* LEFT — Features */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6 flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-4 font-semibold">
                  Sudah Termasuk
                </p>
                <ul className="space-y-2.5 flex-1">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#D90429]/15 border border-[#D90429]/30 flex items-center justify-center shrink-0 mt-px">
                        <FiCheck size={8} className="text-[#D90429]" />
                      </div>
                      <span className="text-gray-300 text-[13px] leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
                {/* Additional time note */}
                <div className="mt-5 pt-4 border-t border-white/[0.06]">
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    <span className="text-[#D90429] font-semibold">Tambah waktu</span>{' '}(tanpa print):{' '}
                    <span className="text-white font-medium">Rp 500.000 / jam</span>
                  </p>
                </div>
              </div>

              {/* RIGHT — Price List */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6">
                <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-4 font-semibold">
                  Daftar Harga
                </p>
                <div>
                  {pkg.prices.map((item, i) => (
                    <PriceRow key={i} item={item} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Terms & Conditions ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="max-w-5xl mx-auto mt-4"
        >
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.15em] whitespace-nowrap flex items-center gap-1.5">
                <FiInfo size={10} /> Syarat &amp; Ketentuan
              </h3>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {TNC.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#D90429]/40 text-[10px] font-bold font-mono mt-0.5 shrink-0 tabular-nums w-4">
                    {item.num}
                  </span>
                  <p className="text-gray-500 text-[12px] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── CTA Buttons ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8"
        >
          <motion.a
            href="/PriceGuideSnapHub.id.pdf"
            download="PriceGuideSnapHub.pdf"
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

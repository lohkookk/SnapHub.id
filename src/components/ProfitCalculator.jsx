import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiCheck, FiInfo } from 'react-icons/fi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';

/* ── Helpers ─────────────────────────────────────────────── */
const fmt = (v) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v);

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-dark border border-white/10 rounded-xl px-4 py-3 text-sm">
      <p className="text-gray-400 mb-0.5">{label}</p>
      <p className="text-white font-semibold font-heading">{fmt(payload[0].value)}</p>
    </div>
  );
};

const Field = ({ label, value, onChange, prefix = '#', note }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center justify-between">
      <label className="text-gray-400 text-[0.82rem] font-medium">{label}</label>
      {note && <span className="text-gray-600 text-[10px]">{note}</span>}
    </div>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm select-none pointer-events-none">
        {prefix}
      </span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="calc-input"
      />
    </div>
  </div>
);

const ResultCard = ({ label, value, color, sublabel }) => (
  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
    <p className="text-gray-500 text-[0.75rem] mb-1.5 font-medium">{label}</p>
    <AnimatePresence mode="wait">
      <motion.p
        key={value}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.25 }}
        className="text-lg font-bold font-heading"
        style={{ color }}
      >
        {fmt(value)}
      </motion.p>
    </AnimatePresence>
    {sublabel && <p className="text-gray-600 text-[0.7rem] mt-1 leading-snug">{sublabel}</p>}
  </div>
);

/* ── Static Data ─────────────────────────────────────────── */
const FEATURES = [
  'Camera + Lighting',
  '2 Standby Crew',
  'Monitor 24" inch',
  '3 Shots / 1 Session',
  'Free 1 Print 2R/4R',
  'Photo Paper (high quality)',
  'Full Get Soft File',
  'Full Time Event',
  '10+ Design Layout',
  '2 Free Custom Design Layout',
  'Gif Booth',
];

const TNC = [
  { num: '01', text: 'Booth/Crew dikonfirmasi setelah surat perjanjian kerja sama disepakati kedua belah pihak.' },
  { num: '02', text: 'Maximal konfirmasi kerjasama adalah H-7 sebelum pelaksanaan acara.' },
  { num: '03', text: 'Base Pricing: Rp30.000/sesi foto (include 1 cetak foto).' },
  { num: '04', text: 'Extra Print: Rp10.000/cetak.' },
  { num: '05', text: 'Diskon Voucher: Rp5.000/sesi (harga jadi Rp25.000) — WAJIB pakai voucher resmi dari partner.' },
  { num: '06', text: 'Sharing Profit: Partner mendapat 20% dari revenue voucher yang terpakai.' },
  { num: '07', text: 'Tidak ada batasan voucher yang harus terpakai untuk mendapatkan sharing profit.' },
  { num: '08', text: 'Revenue sharing dibayar ke pihak kedua maks. 1×24 jam ketika acara selesai.' },
];

/* Harga tetap dari PDF */
const HARGA_VOUCHER = 25000;  // per sesi dengan voucher
const HARGA_NORMAL = 30000;  // per sesi tanpa voucher
const SHARING_PERSEN = 0.20;   // 20%

/* ── Main Component ──────────────────────────────────────── */
const ProfitCalculator = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [voucherUsed, setVoucherUsed] = useState(80);

  const revenueVoucher = voucherUsed * HARGA_VOUCHER;
  const vendorShare = revenueVoucher * SHARING_PERSEN;
  const snaphubRevenue = revenueVoucher - vendorShare;

  const chartData = [
    { name: 'Rev. Voucher', value: revenueVoucher },
    { name: 'Vendor Share', value: vendorShare },
    { name: 'SnapHub Rev', value: snaphubRevenue },
  ];
  const COLORS = ['#D90429', '#22c55e', '#6b7280'];

  return (
    <section id="calculator" className="section-pad bg-[#0B0B0B] relative overflow-hidden">
      {/* Top bleed */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#111111] to-transparent pointer-events-none" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[450px] h-[450px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D90429, transparent)', filter: 'blur(90px)' }} />

      <div className="wrap">
        {/* ── Header ─────────────────────────────── */}
        <div className="section-header" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="eyebrow-row">
            <div className="eyebrow-line" /><span className="text-eyebrow">Kolaborasi & Revenue Sharing</span><div className="eyebrow-line" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            className="text-section-title text-white mt-3 mb-4">
            Event <span className="text-[#D90429]">Fun Snap</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.65, delay: 0.2 }}
            className="section-desc">
            Kalkulator sharing profit untuk partner kolaborasi SnapHub — Campus, Concert, dan event lainnya.
          </motion.p>
        </div>

        {/* ── Main Layout ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.3 }}
          className="grid lg:grid-cols-5 gap-5"
        >
          {/* LEFT — Package Info (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* FREE badge */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-white font-bold font-heading text-base leading-none">Event Fun Snap</h3>
                    <span className="text-[11px] font-semibold bg-green-500/20 text-green-400 border border-green-500/30 px-2.5 py-0.5 rounded-full leading-none">
                      FREE
                    </span>
                  </div>
                  <p className="text-gray-500 text-[11px] mt-1.5">Campus · Concert · Dll — T&amp;C Apply</p>
                </div>
              </div>

              <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-3 font-semibold">Sudah Termasuk</p>
              <ul className="space-y-2">
                {FEATURES.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#D90429]/15 border border-[#D90429]/30 flex items-center justify-center shrink-0">
                      <FiCheck size={8} className="text-[#D90429]" />
                    </div>
                    <span className="text-gray-300 text-[12px]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Harga info */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
              <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-3 font-semibold">Struktur Harga</p>
              <div className="space-y-2.5">
                {[
                  { label: 'Sesi Normal', value: 'Rp 30.000', sub: 'include 1 cetak foto' },
                  { label: 'Sesi + Voucher', value: 'Rp 25.000', sub: 'diskon Rp5.000 (voucher resmi)' },
                  { label: 'Extra Print', value: 'Rp 10.000', sub: 'per cetak tambahan' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.05] last:border-0">
                    <div>
                      <span className="text-white text-[12px] font-medium">{item.label}</span>
                      <span className="text-gray-500 text-[10px] block">{item.sub}</span>
                    </div>
                    <span className="text-[#D90429] font-bold text-[13px]">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-2.5 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-green-400 text-[11px] font-semibold">💰 Sharing Profit: 20% dari revenue voucher</p>
              </div>
            </div>
          </div>

          {/* RIGHT — Calculator (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">

            {/* Inputs */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6">
              <h3 className="text-white font-semibold text-base font-heading mb-1">Kalkulator Sharing Profit</h3>
              <p className="text-gray-500 text-[0.78rem] mb-5">Masukkan jumlah voucher yang digunakan untuk menghitung sharing profit partner.</p>

              <div className="grid grid-cols-1 gap-4">
                <Field
                  label="Voucher Digunakan"
                  value={voucherUsed}
                  onChange={setVoucherUsed}
                />
              </div>

              {/* Summary chip */}
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="text-[11px]">
                  <span className="text-gray-500">Sesi Voucher: </span>
                  <span className="text-orange-400 font-medium">{voucherUsed} sesi × Rp25.000</span>
                </div>
              </div>
            </div>

            {/* Result cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ResultCard label="Revenue Voucher" value={revenueVoucher} color="#D90429" sublabel={`${voucherUsed} × Rp25K`} />
              <ResultCard label="Vendor Share 20%" value={vendorShare} color="#22c55e" sublabel="Profit partner" />
              <ResultCard label="SnapHub Revenue" value={snaphubRevenue} color="#9ca3af" sublabel="80% dari rev. voucher" />
            </div>

            {/* Status */}
            <AnimatePresence mode="wait">
              <motion.div
                key={vendorShare}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 rounded-xl px-4 py-3.5 text-[0.82rem] leading-relaxed"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
              >
                <span className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0 bg-green-500 animate-pulse" />
                <span className="text-green-400">
                  Partner mendapat <strong>{fmt(vendorShare)}</strong> dari {voucherUsed} voucher yang digunakan.
                  SnapHub revenue: <strong>{fmt(snaphubRevenue)}</strong>.
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Chart */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 flex-1">
              <h3 className="text-white font-semibold text-[0.88rem] font-heading mb-4">Revenue Overview</h3>
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={chartData} margin={{ top: 0, right: 8, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tickFormatter={(v) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(0)}K` : v}
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                    axisLine={false} tickLine={false} width={38}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.025)', radius: 6 }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* ── Terms & Conditions ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5"
        >
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.15em] whitespace-nowrap flex items-center gap-1.5">
                <FiInfo size={10} /> Syarat &amp; Ketentuan — Event Fun Snap
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
      </div>
    </section>
  );
};

export default ProfitCalculator;

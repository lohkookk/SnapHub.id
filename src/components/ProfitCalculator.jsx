import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';

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

const Field = ({ label, value, onChange, prefix = 'Rp' }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-gray-400 text-[0.82rem] font-medium">{label}</label>
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
  <div className="glass-card p-5 text-center sm:text-left">
    <p className="text-gray-500 text-[0.78rem] mb-1.5 font-medium">{label}</p>
    <AnimatePresence mode="wait">
      <motion.p
        key={value}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3 }}
        className="text-xl font-bold font-heading"
        style={{ color }}
      >
        {fmt(value)}
      </motion.p>
    </AnimatePresence>
    {sublabel && <p className="text-gray-600 text-[0.72rem] mt-1 leading-snug">{sublabel}</p>}
  </div>
);

const ProfitCalculator = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [pkg,     setPkg]     = useState(1500000);
  const [events,  setEvents]  = useState(8);
  const [opCost,  setOpCost]  = useState(300000);
  const [addCost, setAddCost] = useState(500000);

  const revenue     = pkg * events;
  const totalOpCost = opCost * events;
  const netProfit   = revenue - totalOpCost - addCost;
  const isProfit    = netProfit >= 0;

  const chartData = [
    { name: 'Revenue',    value: revenue },
    { name: 'Op. Cost',  value: totalOpCost },
    { name: 'Add. Cost', value: addCost },
    { name: 'Net Profit',value: Math.abs(netProfit) },
  ];
  const COLORS = ['#D90429', '#4b5563', '#6b7280', isProfit ? '#22c55e' : '#ef4444'];

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
            <div className="eyebrow-line" /><span className="text-eyebrow">Business Tool</span><div className="eyebrow-line" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            className="text-section-title text-white mt-3 mb-4">
            Profit <span className="text-[#D90429]">Calculator</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.65, delay: 0.2 }}
            className="section-desc">
            Estimate your photobooth business profit and make smarter data-driven decisions.
          </motion.p>
        </div>

        {/* ── Main layout ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.3 }}
          className="grid lg:grid-cols-5 gap-6"
        >
          {/* Inputs — 2 cols */}
          <div className="lg:col-span-2 glass-card p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <h3 className="text-white font-semibold text-base font-heading mb-1">Input Parameters</h3>
              <p className="text-gray-500 text-[0.8rem]">Adjust the values below to estimate your monthly profit.</p>
            </div>

            <div className="grid gap-4">
              <Field label="Package Price (per event)"   value={pkg}     onChange={setPkg} />
              <Field label="Events per Month"            value={events}  onChange={setEvents}  prefix="#" />
              <Field label="Operational Cost (per event)"value={opCost}  onChange={setOpCost} />
              <Field label="Monthly Additional Cost"     value={addCost} onChange={setAddCost} />
            </div>

            {/* Status pill */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isProfit ? 'profit' : 'loss'}
                initial={{ opacity: 0, scale: 0.95, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 rounded-xl px-4 py-3.5 text-[0.82rem] leading-relaxed"
                style={{
                  background: isProfit ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                  border:     `1px solid ${isProfit ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
                }}
              >
                <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${isProfit ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                <span className={isProfit ? 'text-green-400' : 'text-red-400'}>
                  {isProfit
                    ? `Profitable! You earn ${fmt(netProfit)} per month.`
                    : `Loss of ${fmt(Math.abs(netProfit))} per month.`}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Results — 3 cols */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Three result cards in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ResultCard label="Monthly Revenue"        value={revenue}     color="#D90429" sublabel={`${events} event(s) × ${fmt(pkg)}`} />
              <ResultCard label="Total Op. Cost"         value={totalOpCost}  color="#9ca3af" sublabel={`${events} event(s) × ${fmt(opCost)}`} />
              <ResultCard label="Net Profit"             value={netProfit}    color={isProfit ? '#22c55e' : '#ef4444'} sublabel={isProfit ? 'Keep it up!' : 'Reduce your costs'} />
            </div>

            {/* Chart */}
            <div className="glass-card p-6 flex-1">
              <h3 className="text-white font-semibold text-[0.9rem] font-heading mb-5">Financial Overview</h3>
              <ResponsiveContainer width="100%" height={195}>
                <BarChart data={chartData} margin={{ top: 0, right: 8, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    axisLine={false} tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => v >= 1e6 ? `${(v/1e6).toFixed(1)}M` : v >= 1e3 ? `${(v/1e3).toFixed(0)}K` : v}
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                    axisLine={false} tickLine={false} width={42}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.025)', radius: 6 }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={52}>
                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfitCalculator;

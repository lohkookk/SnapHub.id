import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FiTrendingUp, FiTarget, FiArrowUpRight, FiActivity, FiPieChart, FiCalendar, FiStar, FiPercent, FiList, FiDollarSign } from 'react-icons/fi';
import { format, getDaysInMonth, getDate } from 'date-fns';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEventIncome: 0,
    totalEventExpense: 0,
    netProfit: 0
  });
  const [insightStats, setInsightStats] = useState({
    totalEvents: 0,
    avgProfit: 0,
    profitMargin: 0,
    topEventName: '-',
    topEventProfit: 0
  });
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [targetKeuntungan, setTargetKeuntungan] = useState(10000000);
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const [pastSchedules, setPastSchedules] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data: events } = await supabase.from('financial_events').select('*').order('date', { ascending: true });
      const { data: transactions } = await supabase.from('transactions').select('*');
      const { data: settingsData } = await supabase.from('settings').select('*').like('key', 'target_keuntungan%');
      const { data: schedules } = await supabase.from('booked_dates').select('*').order('date', { ascending: true });
      
      const currentMonthStr = format(new Date(), 'yyyy-MM');

      if (settingsData) {
        const targets = {};
        settingsData.forEach(t => targets[t.key] = t.value);
        
        const currentKey = `target_keuntungan_${currentMonthStr}`;
        if (targets[currentKey]) {
          setTargetKeuntungan(Number(targets[currentKey]));
        } else if (targets['target_keuntungan']) {
          setTargetKeuntungan(Number(targets['target_keuntungan']));
        }
      }

      let unifiedSchedules = [];
      if (schedules) {
        unifiedSchedules = [...schedules];
      }
      if (events) {
        events.forEach(ev => {
          if (ev.date) {
            const exists = unifiedSchedules.some(s => s.date === ev.date && s.event_name === ev.name);
            if (!exists) {
              unifiedSchedules.push({ id: `fin_${ev.id}`, date: ev.date, event_name: ev.name });
            }
          }
        });
      }

      if (unifiedSchedules.length > 0) {
        const today = new Date(new Date().setHours(0,0,0,0));
        const upcoming = unifiedSchedules.filter(d => new Date(d.date) >= today).sort((a,b) => new Date(a.date) - new Date(b.date));
        const past = unifiedSchedules.filter(d => new Date(d.date) < today).sort((a,b) => new Date(b.date) - new Date(a.date));
        setUpcomingSchedules(upcoming);
        setPastSchedules(past);
      } else {
        setUpcomingSchedules([]);
        setPastSchedules([]);
      }

      let eventExpense = 0;
      let eventIncome = 0;
      let thisMonthNetProfit = 0;

      if (events && transactions) {
        eventIncome = events.reduce((acc, curr) => acc + Number(curr.income), 0);
        
        transactions.forEach(t => {
          if (t.type === 'event_expense') eventExpense += Number(t.amount);
        });

        events.forEach(ev => {
          if (ev.date && ev.date.startsWith(currentMonthStr)) {
            const evExpenses = transactions.filter(t => t.event_id === ev.id && t.type === 'event_expense').reduce((sum, t) => sum + Number(t.amount), 0);
            thisMonthNetProfit += (Number(ev.income) - evExpenses);
          }
        });
      }

      const netProfit = eventIncome - eventExpense;

      // Calculations for insights
      const totalEvents = events ? events.length : 0;
      let topEventName = '-';
      let topEventProfit = 0;
      
      if (events && transactions) {
        events.forEach(ev => {
          const evExpenses = transactions.filter(t => t.event_id === ev.id).reduce((sum, t) => sum + Number(t.amount), 0);
          const evProfit = Number(ev.income) - evExpenses;
          if (evProfit >= topEventProfit && evProfit > 0) {
            topEventProfit = evProfit;
            topEventName = ev.name;
          }
        });
      }

      const avgProfit = totalEvents > 0 ? netProfit / totalEvents : 0;
      const profitMargin = eventIncome > 0 ? (netProfit / eventIncome) * 100 : 0;

      setInsightStats({
        totalEvents,
        avgProfit,
        profitMargin,
        topEventName,
        topEventProfit,
        thisMonthNetProfit
      });

      setStats({
        totalEventIncome: eventIncome,
        totalEventExpense: eventExpense,
        netProfit: netProfit
      });

      // Prepare Chart Data
      if (events && transactions) {
        const dataForChart = events.map(ev => {
          const evExpenses = transactions.filter(t => t.event_id === ev.id).reduce((sum, t) => sum + Number(t.amount), 0);
          return {
            name: ev.name.substring(0, 10) + (ev.name.length > 10 ? '...' : ''),
            Pemasukan: Number(ev.income),
            Pengeluaran: evExpenses
          };
        }).slice(-7); // Last 7 events
        
        setChartData(dataForChart);
      }

      // Prepare Pie Chart Data
      if (transactions) {
        const expenseMap = {};
        transactions.filter(t => t.type === 'event_expense').forEach(t => {
          const desc = t.description.toLowerCase().trim();
          const displayDesc = desc.charAt(0).toUpperCase() + desc.slice(1);
          expenseMap[displayDesc] = (expenseMap[displayDesc] || 0) + Number(t.amount);
        });
        
        let pieArr = Object.keys(expenseMap).map(key => ({ name: key, value: expenseMap[key] }));
        pieArr.sort((a,b) => b.value - a.value); // Sort descending
        
        if (pieArr.length > 4) {
          const top4 = pieArr.slice(0, 4);
          const othersValue = pieArr.slice(4).reduce((sum, curr) => sum + curr.value, 0);
          pieArr = [...top4, { name: 'Lainnya', value: othersValue }];
        } else if (pieArr.length === 0) {
          pieArr = [{ name: 'Belum Ada', value: 1 }];
        }
        
        setPieData(pieArr);
      }

    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatIDR = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-start pt-32 h-screen relative">
        <div className="w-10 h-10 border-4 border-[#E79EA7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tercapai = Math.max(0, Math.min(((insightStats.thisMonthNetProfit || 0) / targetKeuntungan) * 100, 100));
  const PIE_COLORS = ['#D28A94', '#64D194', '#E79EA7', '#8E7B7D', '#6E3A42'];
  
  const todayDate = new Date();
  const daysLeft = getDaysInMonth(todayDate) - getDate(todayDate);

  return (
    <div className="space-y-4 font-sans max-w-[1100px]">
      
      {/* Top Hero Card */}
      <div className="bg-[var(--admin-surface)] border border-[var(--admin-border)] rounded-[1.5rem] p-6 md:p-8 shadow-[var(--admin-shadow)]">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
          <div>
            <p className="text-[var(--admin-text-muted)] text-[0.9rem] font-medium tracking-wide">Total Laba Bersih</p>
            <h2 className="text-4xl md:text-[2.75rem] font-bold text-[var(--admin-accent)] mt-1.5 leading-tight">{formatIDR(stats.netProfit)}</h2>
            <p className="text-[var(--admin-text-muted)] text-xs mt-2">dari seluruh event & transaksi</p>
          </div>
          <div className="flex flex-col gap-5 md:text-right">
            <div>
              <p className="text-[var(--admin-text-muted)] text-[0.9rem] font-medium tracking-wide">Total Pemasukan Event</p>
              <div className="flex items-center md:justify-end gap-1.5 text-[#64D194] mt-1">
                <FiTrendingUp size={18} />
                <span className="text-xl font-bold">{formatIDR(stats.totalEventIncome)}</span>
              </div>
            </div>
            <div>
              <p className="text-[var(--admin-text-muted)] text-[0.9rem] font-medium tracking-wide">Total Pengeluaran Event</p>
              <div className="flex items-center md:justify-end gap-1.5 text-[#D28A94] mt-1">
                <FiArrowUpRight size={18} />
                <span className="text-xl font-bold">{formatIDR(stats.totalEventExpense)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Target Progress Bar */}
        <div className="mt-10">
          <div className="flex justify-between items-center text-[var(--admin-accent)] mb-3">
            <span className="flex items-center gap-2 text-sm font-semibold"><FiTarget size={16} /> Target Bulanan</span>
            <div className="text-right">
              <div className="text-sm font-bold">{formatIDR(targetKeuntungan)}</div>
              <div className="text-[var(--admin-text-muted)] text-xs font-normal mt-0.5">Sisa {daysLeft} hari lagi bulan ini</div>
            </div>
          </div>
          <div className="h-4 w-full bg-[var(--admin-hover-bg)] rounded-full overflow-hidden border border-[var(--admin-border)]">
            <div className="h-full bg-gradient-to-r from-[#6E3A42] to-[#C9868F] rounded-full transition-all duration-1000 relative" style={{ width: `${tercapai}%` }}>
              <div className="absolute inset-0 bg-white/10 w-full h-full" />
            </div>
          </div>
          <div className="flex justify-between mt-2.5 text-xs text-[var(--admin-text-muted)] font-medium">
            <span>Terkumpul: {formatIDR(insightStats.thisMonthNetProfit || 0)}</span>
            <span>{tercapai.toFixed(1)}% Tercapai</span>
          </div>
        </div>
      </div>

      {/* Mini Cards (Statistik Bisnis) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Top Event */}
        <div className="bg-[var(--admin-surface)] border border-[var(--admin-border)] rounded-[1.5rem] p-5 shadow-[var(--admin-shadow)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--admin-accent-bg)] flex items-center justify-center text-[var(--admin-accent)] flex-shrink-0">
            <FiStar size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-[var(--admin-text-muted)] text-[11px] font-medium mb-1">Event Paling Untung</p>
            <p className="text-[var(--admin-text-main)] font-bold text-sm truncate" title={insightStats.topEventName}>{insightStats.topEventName}</p>
            <p className="text-[#64D194] text-xs font-semibold mt-0.5">{formatIDR(insightStats.topEventProfit)}</p>
          </div>
        </div>

        {/* Rata Rata Laba */}
        <div className="bg-[var(--admin-surface)] border border-[var(--admin-border)] rounded-[1.5rem] p-5 shadow-[var(--admin-shadow)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--admin-accent-bg)] flex items-center justify-center text-[var(--admin-accent)] flex-shrink-0">
            <FiDollarSign size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-[var(--admin-text-muted)] text-[11px] font-medium mb-1">Rata-rata Laba / Event</p>
            <p className="text-[var(--admin-text-main)] font-bold text-[1.1rem] truncate">{formatIDR(insightStats.avgProfit)}</p>
          </div>
        </div>

        {/* Profit Margin */}
        <div className="bg-[var(--admin-surface)] border border-[var(--admin-border)] rounded-[1.5rem] p-5 shadow-[var(--admin-shadow)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--admin-accent-bg)] flex items-center justify-center text-[var(--admin-accent)] flex-shrink-0">
            <FiPercent size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-[var(--admin-text-muted)] text-[11px] font-medium mb-1">Margin Keuntungan</p>
            <p className="text-[var(--admin-text-main)] font-bold text-[1.1rem] truncate">{insightStats.profitMargin.toFixed(1)}%</p>
          </div>
        </div>

        {/* Total Event */}
        <div className="bg-[var(--admin-surface)] border border-[var(--admin-border)] rounded-[1.5rem] p-5 shadow-[var(--admin-shadow)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--admin-accent-bg)] flex items-center justify-center text-[var(--admin-accent)] flex-shrink-0">
            <FiList size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-[var(--admin-text-muted)] text-[11px] font-medium mb-1">Total Event Aktif</p>
            <p className="text-[var(--admin-text-main)] font-bold text-[1.1rem] truncate">{insightStats.totalEvents} Event</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[var(--admin-surface)] border border-[var(--admin-border)] rounded-[1.5rem] p-6 shadow-[var(--admin-shadow)] flex flex-col">
          <h3 className="text-[var(--admin-accent)] font-semibold flex items-center gap-2 mb-6 text-[0.95rem]"><FiActivity /> Perkembangan Keuangan Event</h3>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--admin-text-muted)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="var(--admin-text-muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000000}jt`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: '12px', color: 'var(--admin-accent)' }}
                  itemStyle={{ color: 'var(--admin-accent)', fontSize: '13px' }}
                  labelStyle={{ color: 'var(--admin-text-muted)', fontSize: '12px', marginBottom: '4px' }}
                  formatter={(value) => formatIDR(value)}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#8E7B7D', paddingTop: '15px' }} />
                <Line type="monotone" dataKey="Pemasukan" stroke="#64D194" strokeWidth={2} dot={{ r: 4, fill: '#64D194', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Pengeluaran" stroke="#D28A94" strokeWidth={2} dot={{ r: 4, fill: '#D28A94', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-[var(--admin-surface)] border border-[var(--admin-border)] rounded-[1.5rem] p-6 shadow-[var(--admin-shadow)] flex flex-col">
          <h3 className="text-[var(--admin-accent)] font-semibold flex items-center gap-2 mb-2 text-[0.95rem]"><FiPieChart /> Kategori Pengeluaran Event</h3>
          <p className="text-[var(--admin-text-muted)] text-xs mb-4">Pengeluaran berdasarkan deskripsi.</p>
          <div className="flex-1 flex flex-col justify-center items-center relative min-h-[220px]">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  stroke="none"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Belum Ada' ? '#29181A' : PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatIDR(value)}
                  contentStyle={{ backgroundColor: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: '12px', fontSize: '13px' }}
                  itemStyle={{ color: 'var(--admin-accent)' }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 w-full justify-center text-[10px] text-[var(--admin-text-muted)]">
              {pieData.map((entry, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.name === 'Belum Ada' ? '#29181A' : PIE_COLORS[idx % PIE_COLORS.length] }} /> 
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Schedules Lists Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Upcoming Events Dashboard */}
        <div className="bg-[var(--admin-surface)] border border-[var(--admin-border)] p-6 rounded-[1.5rem] shadow-[var(--admin-shadow)] max-h-[340px] flex flex-col">
          <h3 className="text-[var(--admin-accent)] font-semibold mb-4 border-b border-[var(--admin-border)] pb-3 flex items-center gap-2">
            <FiCalendar /> Jadwal Mendatang
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {upcomingSchedules.length > 0 ? (
              upcomingSchedules.map(schedule => (
                <div key={schedule.id} className="bg-[var(--admin-input-bg)] border border-[var(--admin-border-subtle)] p-4 rounded-xl flex items-center gap-4">
                  <div className="bg-[#C9868F]/20 text-[var(--admin-accent)] w-12 h-12 rounded-lg flex flex-col items-center justify-center font-bold font-heading flex-shrink-0">
                    <span className="text-lg leading-none">{format(new Date(schedule.date), 'dd')}</span>
                    <span className="text-[10px] uppercase leading-none mt-0.5">{format(new Date(schedule.date), 'MMM')}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[var(--admin-text-main)] font-medium text-sm truncate">{schedule.event_name || 'Event Booked'}</p>
                    <p className="text-[var(--admin-text-muted)] text-xs mt-0.5">{format(new Date(schedule.date), 'EEEE, yyyy')}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">Belum ada jadwal terdekat.</div>
            )}
          </div>
        </div>

        {/* Past Events Dashboard */}
        <div className="bg-[var(--admin-surface)] border border-[var(--admin-border)] p-6 rounded-[1.5rem] shadow-[var(--admin-shadow)] max-h-[340px] flex flex-col">
          <h3 className="text-[var(--admin-text-muted)] font-semibold mb-4 border-b border-[var(--admin-border)] pb-3 flex items-center gap-2">
            <FiCalendar /> Jadwal Terlewati
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {pastSchedules.length > 0 ? (
              pastSchedules.map(schedule => (
                <div key={schedule.id} className="bg-[var(--admin-bg)] border border-[var(--admin-border)] p-4 rounded-xl flex items-center gap-4 opacity-70">
                  <div className="bg-[var(--admin-hover-bg)] border border-[var(--admin-border-subtle)] text-[var(--admin-text-muted)] w-12 h-12 rounded-lg flex flex-col items-center justify-center font-bold font-heading flex-shrink-0">
                    <span className="text-lg leading-none">{format(new Date(schedule.date), 'dd')}</span>
                    <span className="text-[10px] uppercase leading-none mt-0.5">{format(new Date(schedule.date), 'MMM')}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[var(--admin-text-muted)] font-medium text-sm truncate line-through decoration-current/30">{schedule.event_name || 'Event Booked'}</p>
                    <p className="text-[var(--admin-text-subtle)] text-xs mt-0.5">{format(new Date(schedule.date), 'EEEE, yyyy')}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">Belum ada histori jadwal.</div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;

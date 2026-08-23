import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import { motion, useInView } from 'framer-motion';
import { isSameDay, parseISO, format } from 'date-fns';
import { supabase } from '../lib/supabase';
import 'react-calendar/dist/Calendar.css';
import { FiCalendar } from 'react-icons/fi';

const BookingCalendar = () => {
  const [bookedDates, setBookedDates] = useState([]);
  const [dbData, setDbData] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const fetchBookedDates = async () => {
    try {
      if (!supabase.supabaseUrl) {
        setLoading(false);
        return; // Skip if no env setup
      }
      const { data, error } = await supabase.from('booked_dates').select('*');
      if (error) throw error;

      if (data) {
        setDbData(data);
        setBookedDates(data.map(item => parseISO(item.date)));
      }
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    } finally {
      setLoading(false);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isBooked = bookedDates.some(bookedDate => isSameDay(date, bookedDate));
      if (isBooked) return 'booked-date relative group';

      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
      const isTooClose = !isPast && date < minBookableDate;

      if (isPast) return 'past-date relative';
      if (isTooClose) return 'too-close-date relative group';

      return 'relative cursor-pointer group';
    }
    return null;
  };

  // Logika H-7
  const minBookableDate = new Date();
  minBookableDate.setDate(minBookableDate.getDate() + 7);
  minBookableDate.setHours(0, 0, 0, 0);

  const handleDateClick = (clickedDate) => {
    const isBooked = bookedDates.some(date => isSameDay(date, clickedDate));
    const isTooClose = clickedDate < minBookableDate;

    if (!isBooked && !isTooClose) {
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      const formattedDate = `${clickedDate.getDate()} ${months[clickedDate.getMonth()]} ${clickedDate.getFullYear()}`;
      const text = `Kak saya mau booking untuk tanggal ${formattedDate} apa bisa ya. Boleh saya tanya tanya terlebih dahulu?`;
      const waUrl = `https://wa.me/6285190643459?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    }
  };


  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const upcomingSchedules = dbData
    .filter(d => new Date(d.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section id="availability" className="section-pad bg-[#0B0B0B] relative overflow-hidden" ref={ref}>
      <div className="wrap relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="eyebrow-row mb-5">
          <div className="eyebrow-line" /><span className="text-eyebrow">Availability</span><div className="eyebrow-line" />
        </motion.div>

        {/* Title */}
        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }} className="text-section-title text-white mt-3 mb-4 text-center">
          Check Our <span className="text-[#D90429]">Schedule</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.65, delay: 0.2 }} className="section-desc mb-12 text-center max-w-xl">
          Tanggal dengan indikator merah menunjukkan bahwa jadwal SnapHub sudah di-booking penuh. Segera amankan tanggal bahagiamu!
        </motion.p>

        {/* Container for Calendar and List */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 w-full max-w-[1000px] justify-center">

          {/* Calendar Container */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-dark border border-white/10 p-6 md:p-8 rounded-[2rem] w-full max-w-md shadow-[0_0_40px_rgba(0,0,0,0.5)] calendar-wrapper shrink-0"
          >
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-2 border-white/10 border-t-[#D90429] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="relative">
              <Calendar
                onClickDay={handleDateClick}
                tileClassName={tileClassName}
                prev2Label={null}
                next2Label={null}
                minDate={minBookableDate}
                tileContent={({ date, view }) => {
                  if (view === 'month') {
                    const isBooked = bookedDates.some(bookedDate => isSameDay(date, bookedDate));
                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                    const isTooClose = !isPast && date < minBookableDate;

                    if (isBooked) {
                      return (
                        <div className="calendar-tooltip bg-[#D90429] glow-red-sm">
                          Booked
                        </div>
                      );
                    } else if (isTooClose) {
                      return (
                        <div className="calendar-tooltip bg-[#FFAA00] shadow-lg text-black font-semibold">
                          H-7 Not Available
                        </div>
                      );
                    } else if (!isPast && !isTooClose) {
                      return (
                        <div className="calendar-tooltip bg-[#25D366] shadow-lg">
                          Available
                        </div>
                      );
                    }
                  }
                  return null;
                }}
              />

              {/* Legend */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-white/[0.05] border border-white/10 flex items-center justify-center">
                      <span className="text-white text-[10px] font-medium">01</span>
                    </div>
                    <span className="font-medium">Available</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center bg-[#FFAA00]/10 border border-[#FFAA00]/20">
                      <span className="text-[#FFAA00]/80 text-[10px] font-medium">02</span>
                    </div>
                    <span className="font-medium">Not Available (H-7) </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(217, 4, 41, 0.05)',
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(217, 4, 41, 0.2) 3px, rgba(217, 4, 41, 0.2) 6px)'
                      }}>
                      <span className="text-white/30 text-[10px] font-medium line-through decoration-[#D90429]/70">03</span>
                    </div>
                    <span className="font-medium">Booked</span>
                  </div>
                </div>
                <div className="text-[0.75rem] text-gray-500 text-center bg-white/[0.02] px-4 py-2 rounded-lg border border-white/[0.05]">
                  <span className="text-[#D90429] mr-1">*</span>Pemesanan hanya dapat dilakukan maksimal <b>H-7</b> sebelum acara atau{' '}
                  <a href="https://wa.me/6285190643459?text=Halo%20SnapHub%2C%20saya%20ingin%20konsultasi%20mengenai%20booking%20yang%20kurang%20dari%20H-7!" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors cursor-pointer">
                    hubungi kami
                  </a>
                  {' '}untuk konfirmasi lebih lanjut
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Upcoming Events Container */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-dark border border-white/10 p-6 md:p-8 rounded-[2rem] w-full max-w-md shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FiCalendar className="text-[#D90429]" />
            Event Mendatang
          </h3>
          
          <div className="overflow-y-auto pr-2 custom-scrollbar max-h-[340px] space-y-3">
            {loading ? (
               <div className="flex justify-center items-center py-20">
                  <div className="w-8 h-8 border-2 border-white/10 border-t-[#D90429] rounded-full animate-spin" />
               </div>
            ) : upcomingSchedules.length === 0 ? (
              <p className="text-gray-400 text-sm italic text-center py-8">Belum ada event mendatang.</p>
            ) : (
              upcomingSchedules.map(sched => (
                <div key={sched.id} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.05] transition-colors">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border shrink-0 bg-[#D90429]/10 border-[#D90429]/20 text-[#D90429]">
                    <FiCalendar size={18} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{sched.event_name || 'Event Booked'}</p>
                    <p className="text-gray-400 text-sm">{format(parseISO(sched.date), 'EEEE, dd MMMM yyyy')}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
        
        </div>
      </div>
    </section>
  );
};

export default BookingCalendar;

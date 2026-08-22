import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import { motion, useInView } from 'framer-motion';
import { isSameDay, parseISO, format } from 'date-fns';
import { supabase } from '../lib/supabase';
import 'react-calendar/dist/Calendar.css';

const BookingCalendar = () => {
  const [bookedDates, setBookedDates] = useState([]);
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
      const { data, error } = await supabase.from('booked_dates').select('date');
      if (error) throw error;

      if (data) {
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
      return 'relative cursor-pointer group';
    }
    return null;
  };

  const handleDateClick = (clickedDate) => {
    const isBooked = bookedDates.some(date => isSameDay(date, clickedDate));
    const isPast = clickedDate < new Date(new Date().setHours(0, 0, 0, 0));

    if (!isBooked && !isPast) {
      const formattedDate = format(clickedDate, 'dd-MM-yyyy');
      const text = `Kak saya mau booking untuk tanggal ${formattedDate} apa bisa ya. Boleh saya tanya tanya terlebih dahulu?`;
      const waUrl = `https://wa.me/6285190643459?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    }
  };



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

        {/* Calendar Container */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-dark border border-white/10 p-6 md:p-8 rounded-[2rem] max-w-md w-full shadow-[0_0_40px_rgba(0,0,0,0.5)] calendar-wrapper"
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
                minDate={new Date()}
                tileContent={({ date, view }) => {
                  if (view === 'month') {
                    const isBooked = bookedDates.some(bookedDate => isSameDay(date, bookedDate));
                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                    if (isBooked) {
                      return (
                        <div className="calendar-tooltip bg-[#D90429] glow-red-sm">
                          Booked
                        </div>
                      );
                    } else if (!isPast) {
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
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-white/[0.05] border border-white/10 flex items-center justify-center">
                    <span className="text-white text-[10px] font-medium">01</span>
                  </div>
                  <span className="font-medium">Available</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(217, 4, 41, 0.05)',
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(217, 4, 41, 0.2) 3px, rgba(217, 4, 41, 0.2) 6px)'
                    }}>
                    <span className="text-white/30 text-[10px] font-medium line-through decoration-[#D90429]/70">02</span>
                  </div>
                  <span className="font-medium">Booked</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingCalendar;

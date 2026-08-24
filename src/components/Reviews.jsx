import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const [plugins] = useState(() => [
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', dragFree: false },
    plugins
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1 text-yellow-500 mb-4">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} className={i < rating ? "fill-current" : "text-gray-600"} size={16} />
        ))}
      </div>
    );
  };

  if (!loading && reviews.length === 0) {
    return null; // Don't show the section if there are no reviews yet
  }

  // Duplicate the reviews array to ensure the carousel always looks full, especially when there are only 1-2 reviews
  const displayReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section id="reviews" className="py-20 md:py-[6.5rem] bg-[#0B0B0B] relative overflow-hidden">
      <div className="wrap">
        <div className="section-header" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="eyebrow-row">
            <div className="eyebrow-line" />
            <span className="text-eyebrow">Testimoni</span>
            <div className="eyebrow-line" />
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }} className="text-section-title text-white mt-3 mb-4">
            Apa Kata <span className="text-[#D90429]">Mereka?</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.65, delay: 0.2 }} className="section-desc mb-12">
            Kebahagiaan klien adalah prioritas kami. Berikut adalah pengalaman mereka bersama SnapHub.
          </motion.p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-[#D90429] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="group relative w-full py-4 -rotate-1 cursor-grab active:cursor-grabbing">
          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-2 md:left-6 flex items-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={scrollPrev} className="bg-[#111111]/80 hover:bg-[#D90429] text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-colors border border-white/10 shadow-xl cursor-pointer">
              <FiChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute inset-y-0 right-2 md:right-6 flex items-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={scrollNext} className="bg-[#111111]/80 hover:bg-[#D90429] text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-colors border border-white/10 shadow-xl cursor-pointer">
              <FiChevronRight size={24} />
            </button>
          </div>

          {/* Subtle gradient masks for the edges */}
          <div className="absolute top-0 bottom-0 left-0 w-12 md:w-8 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex touch-pan-y py-6">
              {displayReviews.map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_22%] min-w-0 px-3 md:px-4"
                >
                  <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-[#D90429]/30 hover:-translate-y-2 transition-all duration-300 h-full">
                    <div>
                      <FaQuoteLeft className="text-[#D90429]/20 text-3xl md:text-4xl mb-4" />
                      {renderStars(review.rating)}
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed italic mb-8">
                        &quot;{review.comment}&quot;
                      </p>
                    </div>
                    <div className="border-t border-white/10 pt-4 mt-auto">
                      <h4 className="text-white font-semibold font-heading">{review.client_name}</h4>
                      <p className="text-[#D90429] text-xs font-medium uppercase tracking-wider mt-1">{review.event_type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;

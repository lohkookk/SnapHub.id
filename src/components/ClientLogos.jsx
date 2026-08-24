import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

const ClientLogos = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const { data, error } = await supabase
          .from('client_logos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setLogos(data || []);
      } catch (error) {
        console.error('Error fetching client logos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  if (loading || logos.length === 0) return null;

  // Pastikan baseSet memiliki minimal 12 logo agar lebar totalnya melebihi layar
  let baseSet = [...logos];
  while (baseSet.length < 8) {
    baseSet = [...baseSet, ...logos];
  }

  return (
    <section className="py-8 bg-black border-y border-[#1a1a1a] overflow-hidden relative">
      {/* Styles untuk Infinite Marquee */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#888888] text-sm uppercase tracking-widest font-medium"
        >
          Telah Dipercaya Oleh
        </motion.p>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Gradient Blur Kiri & Kanan */}
        <div className="absolute top-0 left-0 w-24 md:w-80 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-80 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Container */}
        <div className="animate-marquee pt-16 pb-8">
          {/* Set Pertama */}
          <div className="flex items-center gap-12 sm:gap-20 pr-12 sm:pr-20">
            {baseSet.map((logo, index) => (
              <div
                key={`set1-${logo.id}-${index}`}
                className="group relative flex items-center justify-center min-w-[120px] max-w-[150px] opacity-90 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
              >
                {logo.instagram_url ? (
                  <a
                    href={logo.instagram_url.startsWith('http') ? logo.instagram_url : `https://${logo.instagram_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 block w-full cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={logo.logo_url}
                      alt={logo.client_name}
                      className="w-full h-auto object-contain max-h-16 mx-auto"
                      loading="lazy"
                      draggable={false}
                    />
                  </a>
                ) : (
                  <img
                    src={logo.logo_url}
                    alt={logo.client_name}
                    className="w-full h-auto object-contain max-h-16"
                    loading="lazy"
                    draggable={false}
                  />
                )}

                {/* Hover Tooltip (Chat Bubble Style) */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap bg-[#D90429] text-white text-xs font-medium px-3 py-1.5 rounded-md z-20 shadow-lg translate-y-2 group-hover:-translate-y-1 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[#D90429]">
                  {logo.client_name}
                </div>
              </div>
            ))}
          </div>

          {/* Set Kedua (Identik dengan Set Pertama untuk seamless loop) */}
          <div className="flex items-center gap-12 sm:gap-20 pr-12 sm:pr-20">
            {baseSet.map((logo, index) => (
              <div
                key={`set2-${logo.id}-${index}`}
                className="group relative flex items-center justify-center min-w-[120px] max-w-[150px] opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
              >
                {logo.instagram_url ? (
                  <a
                    href={logo.instagram_url.startsWith('http') ? logo.instagram_url : `https://${logo.instagram_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 block w-full cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={logo.logo_url}
                      alt={logo.client_name}
                      className="w-full h-auto object-contain max-h-16 mx-auto"
                      loading="lazy"
                      draggable={false}
                    />
                  </a>
                ) : (
                  <img
                    src={logo.logo_url}
                    alt={logo.client_name}
                    className="w-full h-auto object-contain max-h-16"
                    loading="lazy"
                    draggable={false}
                  />
                )}

                {/* Hover Tooltip (Chat Bubble Style) */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap bg-[#D90429] text-white text-xs font-medium px-3 py-1.5 rounded-md z-20 shadow-lg translate-y-2 group-hover:-translate-y-1 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[#D90429]">
                  {logo.client_name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;

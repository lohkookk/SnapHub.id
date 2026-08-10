import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiInstagram, FiMail, FiArrowUp } from 'react-icons/fi';

const QUICK_LINKS = [
  { label: 'Home',       to: 'home' },
  { label: 'About',      to: 'about' },
  { label: 'Features',   to: 'features' },
  { label: 'Gallery',    to: 'gallery' },
  { label: 'Pricelist',  to: 'pricelist' },
  { label: 'Calculator', to: 'calculator' },
  { label: 'Location',   to: 'maps' },
  { label: 'Contact',    to: 'contact' },
];

const SOCIALS = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/snaphub.id',
    hoverClass: 'hover:border-pink-500/50 hover:text-pink-400',
    icon: <FiInstagram size={16} />,
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://tiktok.com/@snaphub.id',
    hoverClass: 'hover:border-white/30 hover:text-white',
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.78a4.85 4.85 0 01-1-.09z"/>
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/6285190643459',
    hoverClass: 'hover:border-green-500/50 hover:text-green-400',
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:hello@snaphub.id',
    hoverClass: 'hover:border-blue-500/50 hover:text-blue-400',
    icon: <FiMail size={16} />,
  },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#0B0B0B] border-t border-white/[0.06]">

      {/* ── Top Divider Glow ──────────────────────── */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(217,4,41,0.3), transparent)' }} />

      <div className="container">
        {/* ── Main Grid ─────────────────────────────── */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-16">

          {/* Brand column */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#D90429] flex items-center justify-center glow-red-sm flex-shrink-0">
                <span className="text-white font-black text-base font-heading">S</span>
              </div>
              <span className="text-white font-bold text-lg font-heading">
                Snap<span className="text-[#D90429]">Hub</span>
              </span>
            </div>

            <p className="text-gray-500 text-[0.85rem] leading-[1.75] mb-6 max-w-xs">
              Premium photobooth services that transform your special moments into timeless memories.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 glass border border-white/[0.09] rounded-xl flex items-center justify-center text-gray-500 transition-all duration-300 ${s.hoverClass}`}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-[0.8rem] mb-5 tracking-[0.1em] uppercase font-heading">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-72}
                    duration={650}
                    className="text-gray-500 hover:text-[#D90429] text-[0.85rem] cursor-pointer transition-colors duration-250 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#D90429] transition-all duration-300 rounded" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-[0.8rem] mb-5 tracking-[0.1em] uppercase font-heading">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5 text-[0.85rem] text-gray-500">
              <p className="leading-snug">Jl. Pemuda No. 45,<br />Jakarta Pusat</p>
              <a href="tel:+6281XXXXXXXX"     className="hover:text-[#D90429] transition-colors duration-200">+62 812-XXXX-XXXX</a>
              <a href="mailto:hello@snaphub.id" className="hover:text-[#D90429] transition-colors duration-200">hello@snaphub.id</a>
              <p>Mon – Sun: 09:00 – 21:00</p>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────── */}
        <div className="border-t border-white/[0.05] py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-[0.8rem]">
            © {new Date().getFullYear()} SnapHub. All rights reserved. Made with ♥ for premium moments.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, boxShadow: '0 0 22px rgba(217,4,41,0.45)' }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 bg-[#D90429] rounded-full flex items-center justify-center text-white flex-shrink-0"
            aria-label="Back to top"
          >
            <FiArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

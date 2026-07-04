import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer id="site-footer" className="bg-[#05080c] border-t border-slate-900/60 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Brand/Signature */}
          <div className="text-center md:text-left">
            <span className="text-white font-sans font-bold tracking-tight text-lg block">
              Harekrishna Shah
            </span>
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase mt-1 block">
              Bridging Data Infrastructure &amp; Business Intelligence
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <motion.a
              href={PERSONAL_INFO.github}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60 text-slate-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all shadow-md hover:shadow-zinc-800/30"
              aria-label="GitHub Profile"
            >
              <Github className="h-4.5 w-4.5" />
            </motion.a>
            <motion.a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60 text-slate-400 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5]/80 transition-all shadow-md hover:shadow-[#0077b5]/30"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </motion.a>
            <motion.a
              href={`mailto:${PERSONAL_INFO.email}`}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60 text-slate-400 hover:text-white hover:bg-[#ea4335] hover:border-[#ea4335]/80 transition-all shadow-md hover:shadow-[#ea4335]/30"
              aria-label="Email Address"
            >
              <Mail className="h-4.5 w-4.5" />
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-900/50 w-full mb-8" />

        {/* Sub-footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xs text-slate-500 font-mono">
            &copy; {currentYear} Harekrishna Shah. All rights reserved. Designed for recruiters &amp; data teams.
          </div>

          <div className="flex items-center gap-6">
            <div className="text-[11px] text-slate-600 font-mono flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Greenwich Mean Time (GMT / IST)
            </div>
            
            <button
              onClick={handleScrollTop}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-mono transition-colors group cursor-pointer"
              aria-label="Scroll back to top"
            >
              Back to top
              <ArrowUp className="h-3 w-3 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

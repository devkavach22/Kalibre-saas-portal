import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MagneticLogo from "./MagneticLogo";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed left-1/2 -translate-x-1/2 z-[90] transition-all duration-700 ease-in-out flex justify-between items-center
        ${
          isScrolled
            ? "top-6 w-[95%] md:w-[75%] bg-white/80 backdrop-blur-xl py-3 px-10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/[0.03]"
            : "top-0 w-full py-10 px-12 bg-transparent border-b border-black/[0.02]"
        }`}
    >
      {/* 1. Brand Logo Area */}
      <div className="flex items-center gap-6">
        <MagneticLogo />
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.02]">
          <span className="flex h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-black/40">
            Network Active
          </span>
        </div>
      </div>

      {/* 2. Navigation Links: Shifted to charcoal/black */}
      <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[3px]">
        {["Solutions", "Candidates", "Pricing", "Resources"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-black/40 hover:text-brand-red transition-colors duration-300"
          >
            {item}
          </a>
        ))}
      </div>

      {/* 3. Action Buttons */}
      <div className="flex items-center gap-8">
        <Link to="/login" className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-brand-black transition-all">
          Log In
        </Link>
        <Link
          to="/register"
          className={`transition-all duration-500 font-black uppercase tracking-widest
          ${
            isScrolled
              ? "bg-brand-black text-white text-[9px] px-6 py-2.5 rounded-full shadow-lg shadow-black/10"
              : "bg-brand-red text-white text-[10px] px-8 py-3.5 rounded-2xl shadow-xl shadow-brand-red/20"
          }`}
        >
          Join Now
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;

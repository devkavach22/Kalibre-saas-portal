import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import KalibreLogo from "../assets/logo.png";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "Job Board", to: "/" },
        { label: "For Candidates", to: "/register" },
        { label: "For Employers", to: "/register" },
        { label: "Pricing", to: "/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", to: "/" },
        { label: "Terms of Service", to: "/" },
        { label: "Cookie Policy", to: "/" },
      ],
    },
  ];

  return (
    <footer className="relative bg-[#050505] text-white pt-32 pb-12 overflow-hidden border-t border-brand-red/20 shadow-[0_-20px_50px_rgba(211,47,47,0.05)]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-red/10 blur-[150px] opacity-50 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-block mb-10 group">
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl w-max">
                  <img src={KalibreLogo} alt="Kalibre Logo" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>

              <h2 className="text-5xl sm:text-6xl font-black tracking-tighter leading-[0.9] uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30">
                Architecting <br /> <span className="text-brand-red filter drop-shadow-[0_0_15px_rgba(211,47,47,0.3)]">Elite</span> Teams.
              </h2>
            </div>

            <div className="mt-16 md:mt-12">
              <p className="text-[10px] font-black uppercase tracking-[4px] text-white/40 mb-5">
                Join our private newsletter
              </p>
              <div className="relative max-w-sm group">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm focus:border-brand-red focus:bg-white/10 outline-none transition-all placeholder:text-white/20 backdrop-blur-md"
                />
                <button className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center bg-brand-red text-white text-lg rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/20 hover:scale-105 active:scale-95 duration-300">
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 gap-12 pt-4">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-[11px] font-black uppercase tracking-[3px] text-brand-red mb-8">
                  {group.title}
                </h4>
                <ul className="space-y-5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-white/60 hover:text-white transition-colors tracking-wide flex items-center gap-2 group"
                      >
                        <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-brand-red">
                          —
                        </span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-3">
            {[ 
              { Icon: FaTwitter, href: "#" },
              { Icon: FaLinkedinIn, href: "#" },
              { Icon: FaGithub, href: "#" },
              { Icon: FaInstagram, href: "#" },
            ].map((item, idx) => (
              <motion.a
                key={idx}
                whileHover={{ y: -4, backgroundColor: "rgba(211, 47, 47, 0.2)" }}
                href={item.href}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/60 hover:text-brand-red hover:border hover:border-brand-red/30 transition-all backdrop-blur-md"
              >
                <item.Icon size={16} />
              </motion.a>
            ))}
          </div>

          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[3px]">
            © {currentYear} KALIBRE — <span className="text-brand-red/80">BETTER PLACED</span>
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
              </div>
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-[2px]">
                Systems Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

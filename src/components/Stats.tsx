import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Globe2, ArrowUpRight } from "lucide-react";

const Stats: React.FC = () => {
  return (
    <section className="py-40 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* HEADER: ASYMMETRIC LOGIC */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-xl">
            <p className="text-[10px] font-black uppercase tracking-[5px] text-brand-red mb-6">
              Network Metrics
            </p>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-brand-black leading-[0.85] uppercase">
              Proven <br />
              <span className="text-black/5 italic">Authority.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-6 items-start lg:items-end text-left lg:text-right">
            <TrendingUp size={40} className="text-brand-red opacity-20" />
            <p className="text-brand-grey text-lg font-medium max-w-[280px] leading-relaxed italic">
              Empirical data driving the world's most{" "}
              <span className="text-brand-black">sophisticated</span> hiring
              ecosystems.
            </p>
          </div>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* PRIMARY STAT: THE HERO CARD */}
          <motion.div
            whileHover={{ y: -10 }}
            className="md:col-span-8 bg-brand-bg rounded-[3.5rem] p-12 md:p-20 border border-black/[0.03] flex flex-col justify-between min-h-[500px] group relative overflow-hidden transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)]"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.05] mb-12">
                <span className="text-[9px] font-black uppercase tracking-widest text-black/40 italic">
                  Success Rate
                </span>
              </div>
              <h3 className="text-[12vw] md:text-[9vw] font-black text-brand-black leading-none tracking-tighter">
                98<span className="text-brand-red animate-pulse">%</span>
              </h3>
            </div>

            <div className="relative z-10 mt-12 flex justify-between items-end">
              <p className="text-2xl font-bold text-brand-black max-w-sm leading-tight uppercase tracking-tighter">
                Placement accuracy <br /> for elite SaaS teams.
              </p>
              <ArrowUpRight
                size={32}
                className="text-black/10 group-hover:text-brand-red group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500"
              />
            </div>

            {/* Background Watermark */}
            <div className="absolute -right-10 -bottom-10 text-[350px] font-black text-black/[0.015] select-none pointer-events-none leading-none italic">
              K
            </div>
          </motion.div>

          {/* SECONDARY STATS: THE VERTICAL STACK */}
          <div className="md:col-span-4 flex flex-col gap-8">
            {/* Avg Salary Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex-1 bg-white border border-black/[0.06] p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-center group hover:border-brand-red/20 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <Users
                  size={24}
                  className="text-brand-red opacity-40 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-[9px] font-black uppercase tracking-widest text-black/20 italic">
                  Compensation
                </span>
              </div>
              <span className="text-6xl font-black text-brand-black tracking-tighter">
                $240K+
              </span>
              <span className="text-[10px] font-black uppercase tracking-[4px] text-brand-red mt-4">
                Avg Base Salary
              </span>
            </motion.div>

            {/* Partners Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex-1 bg-brand-black p-10 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden group shadow-2xl shadow-black/20"
            >
              <div className="flex justify-between items-start mb-6 relative z-10">
                <Globe2 size={24} className="text-brand-red" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/20 italic">
                  Coverage
                </span>
              </div>
              <span className="text-6xl font-black text-white tracking-tighter relative z-10">
                450+
              </span>
              <span className="text-[10px] font-black uppercase tracking-[4px] text-white/40 mt-4 relative z-10">
                Global Partners
              </span>

              {/* Subtle grid pattern for dark card */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
            </motion.div>
          </div>
        </div>

        {/* BOTTOM METRIC: THE PROOF LINE */}
        <div className="mt-12 pt-12 border-t border-black/[0.03] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-full border-4 border-white bg-brand-bg flex items-center justify-center overflow-hidden"
              >
                <div className="w-full h-full bg-black/5 flex items-center justify-center text-[10px] font-black text-black/20">
                  ELITE
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] font-black uppercase tracking-[4px] text-black/30">
            Trusted by founders at{" "}
            <span className="text-brand-red">Linear</span>,{" "}
            <span className="text-brand-red">Stripe</span>, and{" "}
            <span className="text-brand-red">Vercel</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;

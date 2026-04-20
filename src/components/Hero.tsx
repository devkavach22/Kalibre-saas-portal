import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search,  Sparkles, MoveRight } from "lucide-react";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-bg pt-20">
      {/* 1. ARCHITECTURAL BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Large Geometric Watermark */}
        <span className="absolute -left-20 top-1/4 text-[25vw] font-black text-black/[0.02] leading-none select-none">
          K
        </span>
        {/* Soft Red Gradient Blur */}
        <div className="absolute top-[10%] right-[-5%] w-[50vw] h-[50vw] bg-brand-red/[0.04] blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          
          {/* 2. THE STATUS CHIP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-sm mb-10"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-brand-grey/20" />
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">
              12 Elite Roles Added <span className="text-brand-red">Today</span>
            </span>
            <Sparkles size={12} className="text-brand-red animate-pulse" />
          </motion.div>

          {/* 3. HERO CONTENT: EDITORIAL STYLE */}
          <div className="text-center">
            <motion.h1 
              style={{ y: y2 }}
              className="text-[10vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter text-brand-black uppercase"
            >
              Excellence <br />
              <span className="relative">
                In <span className="text-brand-red italic">Hiring</span>
                {/* Decorative underline */}
                <motion.svg 
                  viewBox="0 0 300 20" 
                  className="absolute -bottom-2 left-0 w-full h-4 text-brand-red/30"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                >
                  <path d="M5 15 Q 150 5 295 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-brand-grey text-lg md:text-xl max-w-xl mx-auto font-medium"
            >
              Kalibre is the high-performance infrastructure for <span className="text-brand-black font-bold">top-tier talent</span>. We don't just find jobs; we engineer <span className="italic">legacies</span>.
            </motion.p>
          </div>

          {/* 4. THE COMMAND SEARCH (Ultra-Modern) */}
          <motion.div
            style={{ y: y1 }}
            className="mt-16 w-full max-w-3xl"
          >
            <div className="glass-peak bg-white/90 p-2 rounded-[2rem] shadow-[0_30px_90px_-10px_rgba(0,0,0,0.1)] group">
              <div className="flex items-center p-2">
                <div className="flex-1 flex items-center gap-4 px-4 border-r border-black/[0.05]">
                  <Search className="text-brand-red" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search roles like 'Lead Engineer'..."
                    className="bg-transparent w-full outline-none text-brand-black font-semibold placeholder:text-black/20"
                  />
                </div>
                <button className="bg-brand-black hover:bg-brand-red text-white h-14 px-8 rounded-[1.5rem] flex items-center gap-3 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-brand-red/20">
                  <span className="text-[11px] font-black uppercase tracking-widest">Explore</span>
                  <MoveRight size={18} />
                </button>
              </div>
              
              {/* Hot Tags Logic */}
              <div className="flex items-center gap-4 px-6 py-3 border-t border-black/[0.03] mt-1">
                <span className="text-[9px] font-black uppercase text-black/30 tracking-widest">Trending:</span>
                {["Fintech", "AI", "Remote", "SaaS"].map(tag => (
                  <button key={tag} className="text-[9px] font-bold text-black/50 hover:text-brand-red transition-colors uppercase tracking-widest">
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

    
        </div>
      </div>

      {/* 5. FLOATING ELEMENTS: "Peak" SaaS Aesthetic */}
      <div className="absolute left-12 bottom-12 hidden xl:flex items-center gap-6 opacity-30">
        <div className="h-12 w-[1px] bg-brand-black" />
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest">Latency</p>
          <p className="text-xl font-mono font-bold tracking-tighter">0.02ms</p>
        </div>
      </div>

      <div className="absolute right-12 bottom-12 hidden xl:flex items-center gap-6 opacity-30 text-right">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest">Active nodes</p>
          <p className="text-xl font-mono font-bold tracking-tighter">842</p>
        </div>
        <div className="h-12 w-[1px] bg-brand-black" />
      </div>
    </section>
  );
};

export default Hero;
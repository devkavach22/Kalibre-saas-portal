import React from "react";
import { motion } from "framer-motion";

const FeaturedRoles: React.FC = () => {
  return (
    <section className="py-32 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: Large Feature */}
        <motion.div
          whileHover={{ y: -5 }}
          className="md:col-span-8 glass-peak p-12 min-h-[450px] flex flex-col justify-end group"
        >
          <div className="mb-auto">
            <div className="w-12 h-12 bg-brand-red/20 rounded-xl flex items-center justify-center text-brand-red font-black text-2xl mb-6">
              01
            </div>
            <h2 className="text-5xl font-black max-w-md leading-tight">
              AI-Driven <br /> Precision Vetting
            </h2>
          </div>
          <p className="text-brand-grey text-xl max-w-lg mt-8 opacity-60 group-hover:opacity-100 transition-opacity">
            Our proprietary neural network analyzes 50+ data points to ensure
            candidate-culture fit with 99.4% accuracy.
          </p>
        </motion.div>

        {/* Card 2: Small Feature */}
        <motion.div
          whileHover={{ y: -5 }}
          className="md:col-span-4 glass-peak p-10 flex flex-col items-center justify-center text-center bg-gradient-to-br from-brand-red/10 to-transparent"
        >
          <span className="text-7xl font-black text-white">$2.4M</span>
          <span className="text-brand-red font-black text-xs tracking-[4px] uppercase mt-4">
            Avg. Equity Secured
          </span>
        </motion.div>

        {/* Card 3: Horizontal Feature */}
        <motion.div
          whileHover={{ y: -5 }}
          className="md:col-span-12 glass-peak p-10 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="flex -space-x-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-20 h-20 rounded-2xl border-[6px] border-[#050505] bg-zinc-900 overflow-hidden glass-peak"
              />
            ))}
          </div>
          <div className="text-right mt-6 md:mt-0">
            <p className="text-3xl font-black">12,400+</p>
            <p className="text-brand-grey uppercase tracking-widest text-xs">
              Vetted Experts in Pipeline
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedRoles;

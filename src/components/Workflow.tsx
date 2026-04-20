import React from "react";
import { motion } from "framer-motion";
import { Target, Zap, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: <Target size={24} />,
    title: "Precision Vetting",
    desc: "Our AI-driven engine filters the top 1% of talent based on technical synergy and cultural alignment.",
    tag: "AI Powered",
  },
  {
    icon: <Zap size={24} />,
    title: "Instant Shortlist",
    desc: "Forget the screening marathons. Access a curated pipeline of elite candidates in under 48 hours.",
    tag: "High Velocity",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Verified Integrity",
    desc: "Every professional is rigorously background checked and verified for high-performance SaaS roles.",
    tag: "Zero Risk",
  },
];

const Workflow: React.FC = () => {
  return (
    <section className="py-40 px-10 bg-brand-bg relative overflow-hidden">
      {/* Editorial Background Text */}
      <div className="absolute top-20 left-10 opacity-[0.02] select-none pointer-events-none">
        <h2 className="text-[20vw] font-black leading-none">PROTOCOL</h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
            <p className="text-[10px] font-black uppercase tracking-[5px] text-brand-red mb-6">
              Execution Strategy
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-brand-black leading-none uppercase">
              How we scale <br />{" "}
              <span className="text-black/10 italic">Excellence.</span>
            </h2>
          </div>
          <div className="h-[1px] flex-1 bg-black/5 mx-12 hidden lg:block" />
          <p className="text-brand-grey text-sm font-bold uppercase tracking-widest max-w-[200px] leading-loose">
            From identification to integration.
          </p>
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group cursor-default relative"
            >
              {/* Top Meta Info */}
              <div className="flex justify-between items-center mb-10">
                <div className="w-14 h-14 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-brand-black shadow-sm group-hover:bg-brand-red group-hover:text-white transition-all duration-500 group-hover:shadow-xl group-hover:shadow-brand-red/20">
                  {step.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[2px] text-brand-red/40 group-hover:text-brand-red transition-colors">
                  {step.tag}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-black text-black/5 italic select-none group-hover:text-brand-red/10 transition-colors">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl font-black text-brand-black uppercase tracking-tighter">
                    {step.title}
                  </h3>
                </div>

                <p className="text-brand-grey text-lg font-medium leading-relaxed italic">
                  {step.desc}
                </p>

                {/* Bottom Interactive Line */}
                <div className="pt-6">
                  <div className="w-12 h-[2px] bg-black/5 group-hover:w-full group-hover:bg-brand-red transition-all duration-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;

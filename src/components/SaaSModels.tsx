import React, { useState, useEffect } from "react";
import { Check, Zap, Globe, ShieldCheck, ArrowRight, Loader2, Clock, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPlanDetails, type PlanDetail } from "../api/plans";

const PlanCard: React.FC<{ plan: PlanDetail; index: number; isEnterprise: boolean }> = ({ plan, index, isEnterprise }) => {
  return (
    <motion.div
      key={plan.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col justify-between overflow-hidden group transition-colors duration-500
        ${isEnterprise ? "bg-brand-bg" : "bg-white hover:bg-brand-bg/50"}
      `}
    >
      {/* Background "K" branding mark */}
      {isEnterprise && (
        <span className="absolute -right-10 -bottom-10 text-[200px] font-black text-black/[0.025] select-none leading-none pointer-events-none">
          K
        </span>
      )}

      {/* Popular Badge */}
      {plan.ui_meta?.is_popular && (
        <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-brand-red/30">
          <Star size={10} fill="currentColor" />
          Most Popular
        </div>
      )}

      {/* Named badge from backend (e.g. "Best Value") */}
      {plan.ui_meta?.badge && !plan.ui_meta?.is_popular && (
        <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-brand-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
          {plan.ui_meta.badge}
        </div>
      )}

      <div className="p-12 md:p-16 flex flex-col flex-1">
        {/* Icon Row */}
        <div className="flex items-start mb-12">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl
              ${isEnterprise
                ? "bg-brand-red text-white shadow-brand-red/20 group-hover:scale-110"
                : "bg-black/[0.03] border border-black/[0.06] text-brand-black group-hover:bg-brand-red group-hover:text-white"
              }
            `}
          >
            {isEnterprise ? <Globe size={24} /> : <Zap size={24} />}
          </div>
        </div>

        {/* Plan Name */}
        <h3 className="text-3xl font-black tracking-tight text-brand-black mb-3 uppercase">
          {plan.title || plan.name}
        </h3>

        {/* Description */}
        {plan.description ? (
          <p className="text-brand-grey font-medium mb-8 leading-relaxed text-sm">
            {plan.description}
          </p>
        ) : (
          <p className="text-brand-grey font-medium mb-8 leading-relaxed text-sm">
            {isEnterprise
              ? "The ultimate infrastructure for high-growth teams. Manage your entire pipeline with surgical precision."
              : "Elevate your visibility with direct recruiter access and premium profile features."}
          </p>
        )}

        {/* Price Display */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-6xl font-black text-brand-black leading-none">
            {plan.pricing.display}
          </span>
          <span className="text-brand-grey font-bold uppercase text-[10px] tracking-widest self-end pb-1">
            / Per Month
          </span>
        </div>

        {/* Validity Badge */}
        <div className="flex items-center gap-2 mb-10">
          <Clock size={13} className="text-brand-grey" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-grey">
            Validity: {plan.validity}
          </span>
        </div>

        {/* Highlights */}
        <ul className="space-y-4 flex-1">
          {plan.highlights.map((feat) => (
            <li key={feat} className="flex items-center gap-3 text-sm font-semibold text-brand-black/75">
              {isEnterprise
                ? <ShieldCheck size={15} className="text-brand-red shrink-0" />
                : <Check size={15} className="text-brand-red shrink-0" />
              }
              {feat}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="px-12 md:px-16 pb-12 md:pb-16">
        {isEnterprise ? (
          <button className="w-full py-5 rounded-2xl bg-brand-red text-white font-black uppercase tracking-widest text-xs hover:bg-brand-black transition-all duration-300 shadow-xl shadow-brand-red/20 flex items-center justify-center gap-3 active:scale-[0.98]">
            Get {plan.name}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button className="w-full py-5 rounded-2xl border-2 border-brand-black text-brand-black font-black uppercase tracking-widest text-xs hover:bg-brand-black hover:text-white transition-all duration-300 active:scale-[0.98]">
            Get Started
          </button>
        )}
      </div>
    </motion.div>
  );
};

const SaaSModels: React.FC = () => {
  const [plans, setPlans] = useState<PlanDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPlanDetails();
        if (response.status === "Success") {
          setPlans(response.data);
        } else {
          setError(response.message || "Failed to fetch plans");
        }
      } catch (err) {
        setError("Error connecting to pricing service");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const colClass =
    plans.length === 1
      ? "lg:grid-cols-1 max-w-lg mx-auto"
      : plans.length === 3
      ? "lg:grid-cols-3"
      : "lg:grid-cols-2";

  return (
    <section className="py-32 px-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <p className="text-[10px] font-black uppercase tracking-[5px] text-brand-red mb-6">
              Investment Tiers
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-brand-black leading-none uppercase">
              Scaled for <br />{" "}
              <span className="text-black/10 italic">Performance.</span>
            </h2>
          </div>
          <p className="text-brand-grey text-lg font-medium max-w-xs pb-2">
            Transparent pricing for elite professionals and global enterprises.
          </p>
        </div>

        {/* LOADING STATE */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <Loader2 className="animate-spin text-brand-red" size={40} />
              <p className="text-brand-grey font-bold uppercase tracking-widest text-xs">
                Curating Plans...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ERROR STATE */}
        {!isLoading && error && (
          <div className="text-center py-16 text-brand-grey font-medium text-sm">
            Unable to load pricing plans at this time.
          </div>
        )}

        {/* DYNAMIC PLAN GRID */}
        {!isLoading && !error && plans.length > 0 && (
          <div
            className={`grid grid-cols-1 ${colClass} gap-px bg-black/[0.05] border border-black/[0.05] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)]`}
          >
            {plans.map((plan, index) => {
              const isEnterprise =
                plan.name.toLowerCase().includes("msme") ||
                plan.name.toLowerCase().includes("enterprise") ||
                plan.ui_meta?.is_popular ||
                plan.pricing.amount > 10;

              return (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  index={index}
                  isEnterprise={isEnterprise}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SaaSModels;

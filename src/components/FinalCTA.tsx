import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-brand-bg flex items-center justify-center">
      {/* Background radial gradient spotlight */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[800px] max-h-[800px] bg-brand-red/[0.04] blur-[120px] rounded-full point-events-none" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-peak border border-brand-red/10 rounded-[40px] p-12 sm:p-20 shadow-[0_40px_80px_rgba(211,47,47,0.07)]"
        >
          <div className="inline-flex h-2 w-2 rounded-full bg-brand-red animate-pulse mb-8" />
          
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-brand-black mb-6 leading-tight">
            Ready to find your <br className="hidden sm:block" /> perfect match?
          </h2>
          
          <p className="text-brand-grey text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Join thousands of elite candidates and top-tier organizations already scaling their future with Kalibre.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-brand-red text-white text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-brand-red/20 flex items-center justify-center gap-2 group hover:-translate-y-1"
            >
              Get Started Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-brand-black text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-black/5 transition-colors border border-black/10 flex items-center justify-center"
            >
              Sign In Instead
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;

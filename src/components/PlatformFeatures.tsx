import { motion } from "framer-motion";
import { BrainCircuit, Search, Zap, BarChart3, Users, Video } from "lucide-react";

const features = [
  {
    title: "AI Talent Matching",
    description: "Our proprietary algorithm analyzes thousands of data points to find the perfect synergy between candidate skills and role requirements.",
    icon: <BrainCircuit size={24} className="text-brand-red" />,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Smart Sourcing",
    description: "Automated pipelines that intelligently gather candidate pools.",
    icon: <Search size={24} className="text-brand-red" />,
    colSpan: "col-span-1",
  },
  {
    title: "Instant Verification",
    description: "Background and skill verification executed in real-time.",
    icon: <Zap size={24} className="text-brand-red" />,
    colSpan: "col-span-1",
  },
  {
    title: "Deep Analytics",
    description: "Comprehensive dashboards giving recruiters total visibility into hiring metrics and pipeline health.",
    icon: <BarChart3 size={24} className="text-brand-red" />,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Collaborative Hiring",
    description: "Involve your entire team in the decision process effortlessly.",
    icon: <Users size={24} className="text-brand-red" />,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Video Interviews",
    description: "Built-in, high-fidelity video tools tailored for technical and behavioral assessments.",
    icon: <Video size={24} className="text-brand-red" />,
    colSpan: "col-span-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const PlatformFeatures = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-brand-bg overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-red/[0.02] blur-[100px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-center mx-auto mb-16 sm:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red font-semibold text-xs tracking-widest uppercase mb-4">
            Platform Capabilities
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-black mb-6">
            Engineered for precision. Built for scale.
          </h2>
          <p className="text-brand-grey text-lg">
            Kalibre provides a complete suite of tools to transform your hiring workflow from end to end, driven by state-of-the-art intelligent systems.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`glass-peak rounded-3xl p-8 transition-transform duration-300 ${feature.colSpan} border border-black/[0.03] hover:border-brand-red/20 hover:shadow-[0_20px_40px_rgba(211,47,47,0.05)]`}
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-black mb-3">{feature.title}</h3>
              <p className="text-brand-grey leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformFeatures;

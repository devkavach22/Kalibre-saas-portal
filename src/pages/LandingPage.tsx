import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import "../App.css"; // Keep original CSS import or adjust if it moved

// Components
import FeaturedRoles from "../components/FeaturedRoles";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Navbar from "../components/Navbar";
import SaaSModels from "../components/SaaSModels";
import Stats from "../components/Stats";
import Workflow from "../components/Workflow";
import Preloader from "../components/Preloader";
import Footer from "../components/Footer";
import PlatformFeatures from "../components/PlatformFeatures";
import Testimonials from "../components/Testimonials";
import FinalCTA from "../components/FinalCTA";

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      document.title = document.hidden
        ? "Waiting for you... | KALIBRE"
        : "KALIBRE — Better Placed";
    };

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* 1. Elite Preloader */}
      <AnimatePresence mode="wait">
        {loading && <Preloader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="relative min-h-screen bg-brand-bg selection:bg-brand-red selection:text-white"
        >
          {/* 2. Global Effects Layer */}
          <div className="noise-overlay opacity-[0.015]" />

          {/* 3. Top Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-brand-red z-[100] origin-left shadow-[0_2px_10px_rgba(211,47,47,0.2)]"
            style={{ scaleX: scrollYProgress }}
          />

          <Navbar />

          <main className="relative z-10 pt-20">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Hero />

              <div className="bg-white/50 backdrop-blur-sm border-y border-black/[0.03]">
                <Marquee />
              </div>

              <Workflow />

              <div className="bg-gradient-to-b from-brand-bg to-white">
                <Stats />
              </div>

              <PlatformFeatures />

              <FeaturedRoles />
              <SaaSModels />

              <Testimonials />
              <FinalCTA />
            </motion.div>
          </main>

          {/* 4. Elite Light Footer */}
          <Footer />
        </motion.div>
      )}
    </>
  );
};

export default LandingPage;

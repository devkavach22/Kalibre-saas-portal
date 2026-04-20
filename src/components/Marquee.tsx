import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import googleLogo from "../assets/logos/google.svg";
import vercelLogo from "../assets/logos/vercel.svg";
import stripeLogo from "../assets/logos/stripe.svg";
import linearLogo from "../assets/logos/linear.svg";
import openaiLogo from "../assets/logos/openai.svg";
import metaLogo from "../assets/logos/meta.svg";
import airbnbLogo from "../assets/logos/airbnb.svg";

const Marquee: React.FC = () => {
  const brands = [
    { name: "Google", src: googleLogo },
    { name: "Vercel", src: vercelLogo },
    { name: "Stripe", src: stripeLogo },
    { name: "Linear", src: linearLogo },
    { name: "OpenAI", src: openaiLogo },
    { name: "Meta", src: metaLogo },
    { name: "Airbnb", src: airbnbLogo },
  ];

  return (
    <div className="py-20 bg-transparent overflow-hidden relative border-y border-black/[0.02]">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 mb-16 flex justify-center mt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/5 shadow-sm"
        >
          <Sparkles size={14} className="text-brand-red" />
          <span className="text-brand-black text-[11px] font-bold tracking-[0.2em] uppercase">
            Trusted by the world's best
          </span>
        </motion.div>
      </div>

      <div className="relative w-full mx-auto max-w-[100vw]">
        {/* Edge Fades for Light Theme */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-[#fcfcfc] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-[#fcfcfc] to-transparent z-10 pointer-events-none" />

        {/* Floating Track */}
        <div className="flex items-center whitespace-nowrap animate-marquee-unique pb-4">
          {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="inline-flex flex-col items-center justify-center mx-6 md:mx-10 shrink-0 group transition-all duration-300"
            >
              <img
                src={brand.src}
                alt={brand.name}
                // Increased logo dimensions to match the large banner proportions
                className="w-36 h-12 md:w-48 md:h-16 object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeUnique {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-unique {
          display: flex;
          width: max-content;
          animation: marqueeUnique 40s linear infinite;
        }
        .animate-marquee-unique:hover { 
          animation-play-state: paused; 
        }
      `}</style>
    </div>
  );
};

export default Marquee;

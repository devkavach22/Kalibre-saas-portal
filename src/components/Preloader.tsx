import { motion } from "framer-motion";
import KalibreLogo from "../assets/logo.png";

const Preloader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-brand-bg flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        <motion.img
          src={KalibreLogo}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-14 w-auto relative z-10"
        />

        {/* Minimalist loading bar */}
        <div className="mt-8 w-32 h-[1px] bg-black/5 relative overflow-hidden">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/2 bg-brand-red"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;

import { motion } from "framer-motion";
import heroImage from "../../../assets/images/hero.jpg";

const HeroSection = () => {
  return (
    <motion.section
      className="relative w-full h-screen flex items-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Text content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-12">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to Our Website
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          We provide amazing services to help your business grow.
        </motion.p>

        <motion.button
          className="bg-white text-black font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>
      </div>
    </motion.section>
  );
};

export default HeroSection;

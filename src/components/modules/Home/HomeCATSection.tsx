import { Link, useNavigate } from "react-router";
import { motion, cubicBezier } from "framer-motion";

const HomeCTASection = () => {
  const navigate = useNavigate();

  const handleSendParcel = () => {
    const token = localStorage.getItem("accessToken");
    if (token) navigate("/send-parcel");
    else navigate("/login");
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: cubicBezier(0.25, 0.1, 0.25, 1) } },
  };

  const hoverScale = { scale: 1.05 };

  return (
    <motion.section
      className="relative flex flex-col items-center justify-center text-center py-24 px-6
                 bg-gradient-to-br from-background via-background/80 to-muted
                 dark:from-background-dark dark:via-background-dark/80 dark:to-muted-dark
                 overflow-hidden transition-colors duration-700"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Background Decorative Circles */}
      <motion.div
        className="absolute top-0 left-0 w-60 h-60
                   bg-primary/20 dark:bg-primary-dark/30
                   rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72
                   bg-secondary/20 dark:bg-secondary-dark/30
                   rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Text Content */}
      <motion.div className="relative z-10 max-w-2xl" variants={containerVariants}>
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-foreground dark:text-foreground-dark mb-6 leading-tight"
          variants={itemVariants}
        >
          Fast, Safe & Reliable Parcel Delivery 🚚
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground-dark mb-10"
          variants={itemVariants}
        >
          Track your parcels instantly or send new deliveries with confidence — all in one place.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row justify-center items-center gap-4" variants={itemVariants}>
          <motion.div whileHover={hoverScale}>
            <Link
              to="/trackParcel"
              className="bg-primary text-primary-foreground
                         hover:bg-primary/90 dark:hover:bg-primary-dark/90
                         font-semibold px-8 py-3 rounded-full shadow-lg
                         transform transition-all duration-300"
            >
              Track Parcel
            </Link>
          </motion.div>

          <motion.div whileHover={hoverScale}>
            <button
              onClick={handleSendParcel}
              className="bg-background text-foreground border-2 border-primary
                         dark:bg-background-dark dark:text-foreground-dark dark:border-primary-dark
                         font-semibold px-8 py-3 rounded-full shadow-md
                         hover:bg-accent hover:text-accent-foreground
                         dark:hover:bg-accent-dark/30 dark:hover:text-accent-foreground-dark
                         transform transition-all duration-300"
            >
              Send a Parcel
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HomeCTASection;

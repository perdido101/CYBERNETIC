import { motion } from 'framer-motion';

const MorphingSilhouette = () => {
  return (
    <motion.div
      className="fixed left-0 top-0 h-full w-1/3 opacity-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ duration: 2 }}
    >
      <svg
        viewBox="0 0 200 800"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M100,100 C150,100 150,200 100,200 C50,200 50,100 100,100"
          fill="url(#cyber-gradient)"
          animate={{
            d: [
              "M100,100 C150,100 150,200 100,200 C50,200 50,100 100,100",
              "M100,100 C200,150 150,300 100,300 C50,300 0,150 100,100",
              "M100,100 C150,100 150,200 100,200 C50,200 50,100 100,100"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <defs>
          <linearGradient id="cyber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="100%" stopColor="#4facfe" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default MorphingSilhouette; 
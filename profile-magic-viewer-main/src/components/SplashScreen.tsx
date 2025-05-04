import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onAccept: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState('');

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Generate glitch effect text
    const glitchInterval = setInterval(() => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const length = Math.floor(Math.random() * 5) + 3;
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setGlitchText(result);
    }, 50);

    return () => {
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    setTimeout(onAccept, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          {/* Glitch effect background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-9xl font-bold text-white/5 tracking-widest"
            >
              {glitchText}
            </motion.div>
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center space-y-12">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-7xl font-bold tracking-wider text-white"
              >
                <span className="text-blue-500">[</span>
                SYSTEM
                <span className="text-blue-500">]</span>
              </motion.h1>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-96 h-1 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-2 text-white/60 text-sm tracking-widest"
            >
              <p>INITIALIZING CORE SYSTEMS</p>
              <p>LOADING NEURAL INTERFACE</p>
              <p>ESTABLISHING CONNECTION</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAccept}
                disabled={progress < 100}
                className={`
                  text-lg tracking-widest
                  ${progress < 100
                    ? 'text-white/30 cursor-not-allowed'
                    : 'text-white hover:text-blue-400 transition-colors duration-300'
                  }
                `}
              >
                {progress < 100 ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    LOADING {progress}%
                  </span>
                ) : (
                  'ENTER SYSTEM'
                )}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 
import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logos/logo.png';

const Loading = memo(() => {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <motion.img
            src={logo}
            alt="Loading..."
            className="w-32 h-32 object-contain"
            style={{ willChange: 'transform' }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

Loading.displayName = 'Loading';

export default Loading; 
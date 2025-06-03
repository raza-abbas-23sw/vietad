import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logos/logo.png';

const Loading = () => {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm z-50"
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
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              scale: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-blue-600"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-gray-600 font-medium"
        >
          Loading...
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading; 
import React from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function GetKeyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div 
          className="relative group inline-block mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full opacity-50 group-hover:opacity-75 transition duration-500 blur-xl"></div>
          <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border-2 border-gray-700">
            <Clock className="w-16 h-16 text-gray-400" />
          </div>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Coming Soon
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-400 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          The key system is currently under development. Stay tuned for updates!
        </motion.p>
      </div>
    </div>
  );
}

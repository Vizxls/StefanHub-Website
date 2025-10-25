import React from "react";
import { motion } from "framer-motion";

export default function GamesPage() {
  const games = [
    {
      title: "Mythical Tower Defense",
      status: "online",
    },
    {
      title: "The Strongest Battleground",
      status: "offline",
    },
    {
      title: "Steal A Brainrot",
      status: "offline",
    },
    {
      title: "Arsenal",
      status: "offline",
    },
    {
      title: "Universal",
      status: "offline",
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Games
        </motion.h1>
        <motion.p 
          className="text-center text-gray-400 text-lg mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Browse all available game scripts
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-gray-950/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      game.status === "online"
                        ? "bg-green-500 shadow-lg shadow-green-500/50"
                        : "bg-red-500 shadow-lg shadow-red-500/50"
                    }`}
                  ></div>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      game.status === "online"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {game.status === "online" ? "Online" : "Offline"}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">{game.title}</h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function GamesPage() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const games = [
    {
      title: "Mythical Tower Defense",
      status: "online",
      code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Vizxls/StefanHub/refs/heads/main/MythicalTD/main.lua"))()`,
    },
    {
      title: "The Strongest Battleground",
      status: "offline",
      code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Vizxls/StefanHub/refs/heads/main/TSB/main.lua"))()`,
    },
    {
      title: "Steal A Brainrot",
      status: "offline",
      code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Vizxls/StefanHub/refs/heads/main/StealBrainrot/main.lua"))()`,
    },
    {
      title: "Arsenal",
      status: "offline",
      code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Vizxls/StefanHub/refs/heads/main/Arsenal/main.lua"))()`,
    },
    {
      title: "Universal",
      status: "offline",
      code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Vizxls/StefanHub/refs/heads/main/Universal/main.lua"))()`,
    },
  ];

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const highlightLuaCode = (code) => {
    const parts = [];
    let remaining = code;
    let key = 0;

    const patterns = [
      { regex: /^(loadstring|game|HttpGet)/, className: "text-purple-400" },
      { regex: /^"([^"]*)"/, className: "text-green-400" },
      { regex: /^:(\w+)/, className: "text-blue-400", includeColon: true },
      { regex: /^([().,])/, className: "text-gray-300" },
    ];

    while (remaining.length > 0) {
      let matched = false;

      for (const pattern of patterns) {
        const match = remaining.match(pattern.regex);
        if (match) {
          if (pattern.includeColon) {
            parts.push(
              <span key={key++} className={pattern.className}>
                :{match[1]}
              </span>
            );
          } else {
            parts.push(
              <span key={key++} className={pattern.className}>
                {match[0]}
              </span>
            );
          }
          remaining = remaining.slice(match[0].length);
          matched = true;
          break;
        }
      }

      if (!matched) {
        parts.push(
          <span key={key++} className="text-gray-300">
            {remaining[0]}
          </span>
        );
        remaining = remaining.slice(1);
      }
    }

    return parts;
  };

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

        <div className="space-y-4">
          {games.map((game, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-gray-950/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                {/* Title and Status */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      game.status === "online"
                        ? "bg-green-500 shadow-lg shadow-green-500/50"
                        : "bg-red-500 shadow-lg shadow-red-500/50"
                    }`}
                  ></div>
                  <h2 className="text-2xl font-bold text-white">{game.title}</h2>
                  <span
                    className={`ml-auto text-sm px-3 py-1 rounded-full ${
                      game.status === "online"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {game.status === "online" ? "Online" : "Offline"}
                  </span>
                </div>

                {/* Code Block with Lua syntax highlighting */}
                <div className="flex items-start gap-4 bg-black/40 rounded-lg p-4 border border-gray-800">
                  <code className="flex-1 text-sm font-mono break-all leading-relaxed">
                    {highlightLuaCode(game.code)}
                  </code>
                  <Button
                    onClick={() => handleCopy(game.code, index)}
                    className="bg-gray-800/80 hover:bg-gray-700/80 text-white border border-gray-700 transition-all duration-300 shrink-0"
                    size="sm"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const scriptCode = `loadstring(game:HttpGet("https://raw.githubusercontent.com/Vizxls/JonpoorHub/refs/heads/main/Loader.lua"))()`;

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [visibleBoxes, setVisibleBoxes] = useState([false, false, false]);
  const boxRefs = useRef([]);

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleBoxes((prev) => {
                const newState = [...prev];
                const boxIndex = boxRefs.current.indexOf(entry.target);
                newState[boxIndex] = true;
                return newState;
              });
            }, index * 200);
          }
        });
      },
      { threshold: 0.2 }
    );

    boxRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "Top Bug & Exploit Finder",
      description: "Our script specializes in finding the best bugs and exploits to give you an edge. We constantly update to discover new methods and keep you ahead of the game.",
    },
    {
      title: "Smooth Performance",
      description: "Experience lag-free gameplay with optimized code. Our scripts are designed to run efficiently without affecting your game performance or causing stutters.",
    },
    {
      title: "Multi-Game Support",
      description: "Access multiple exploits across various games. One hub, endless possibilities - supporting all your favorite Roblox games with regular updates.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-7xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              Get{" "}
            </span>
            <span 
              className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent"
              style={{
                filter: "drop-shadow(0 0 20px rgba(250, 204, 21, 0.5))",
              }}
            >
              StefanHub
            </span>
            <span className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              {" "}For Free!
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light tracking-wide">
            StefanHub The Best!
          </p>

          {/* Code Block */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative bg-gray-950/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-start gap-4">
                  <code className="flex-1 text-left text-sm md:text-base text-gray-300 font-mono break-all leading-relaxed">
                    {scriptCode}
                  </code>
                  <Button
                    onClick={handleCopy}
                    className="bg-gray-800/80 hover:bg-gray-700/80 text-white border border-gray-700 transition-all duration-300 shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
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
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => (boxRefs.current[index] = el)}
                className={`
                  transition-all duration-1000 transform
                  ${visibleBoxes[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                  }
                `}
              >
                <div className="relative group h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative h-full bg-gray-950/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Gamepad2, Key, Github } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navigationItems = [
    { name: "Home", url: createPageUrl("Home"), icon: Home },
    { name: "Games", url: createPageUrl("Games"), icon: Gamepad2 },
    { name: "Get Key", url: createPageUrl("GetKey"), icon: Key },
  ];

  const isActive = (url) => location.pathname === url;

  return (
    <div className="min-h-screen bg-black text-white relative">
      <style>{`
        body {
          background-color: black !important;
          overflow-x: hidden;
        }

        html {
          background-color: black !important;
        }
        
        @keyframes drift {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(100px, 50px);
          }
          50% {
            transform: translate(-50px, 100px);
          }
          75% {
            transform: translate(75px, -30px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        .star {
          position: fixed;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s infinite, drift 20s infinite ease-in-out;
          pointer-events: none;
        }

        .nav-link:hover {
          text-decoration: underline;
        }
      `}</style>
      
      {/* Space background with moving stars - FIXED position */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-black to-black"></div>
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: `${Math.random() * 3}s, ${Math.random() * 20}s`,
              animationDuration: `${2 + Math.random() * 2}s, ${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Name - Clickable to Home */}
            <button 
              onClick={() => navigate(createPageUrl("Home"))}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f9f9bd987fa8ced915fac6/515a97d22_iconlogo.png"
                  alt="StefanHub Logo"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-wide">StefanHub</span>
            </button>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              {/* GitHub Button */}
              <a
                href="https://github.com/Vizxls/StefanHub"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link px-6 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span className="font-medium">GitHub</span>
              </a>

              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`
                    nav-link px-6 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2
                    ${isActive(item.url)
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with Page Transitions */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Gamepad2, Key, Github } from "lucide-react";

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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s infinite;
        }

        .nav-link:hover {
          text-decoration: underline;
        }
      `}</style>
      
      {/* Space background with stars */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-black to-black"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
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
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f9f9bd987fa8ced915fac6/7fc6fdb9e_yonpoorlogotransparent.png"
                alt="StefanHub Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold tracking-wide">StefanHub</span>
            </button>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              {/* GitHub Button */}
              <a
                href="https://github.com/Vizxls/JonpoorHub"
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

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}
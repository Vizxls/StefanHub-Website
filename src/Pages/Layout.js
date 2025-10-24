import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Gamepad2, Key, Github } from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Games", url: "/games", icon: Gamepad2 },
    { name: "Get Key", url: "/getkey", icon: Key },
  ];

  const isActive = (url) => location.pathname === url;

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-black">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random(),
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="relative z-10 backdrop-blur-sm bg-black/50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f9f9bd987fa8ced915fac6/7fc6fdb9e_yonpoorlogotransparent.png"
            alt="Logo"
            className="w-12 h-12"
          />
          <span className="text-xl font-bold">StefanHub</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Vizxls/JonpoorHub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-400 hover:text-white"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>

          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
                isActive(item.url) ? "text-white bg-gray-800" : "text-gray-400 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

 <main className="relative z-10 mt-32 px-4 md:px-8">
  {children}
</main>


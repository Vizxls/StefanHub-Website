import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LuaCodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple Lua syntax highlighting - returns JSX elements instead of HTML string
  const highlightLuaCode = (code) => {
    const parts = [];
    let remaining = code;
    let key = 0;

    // Match keywords, strings, methods, etc.
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
    <div className="max-w-3xl mx-auto">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl opacity-50 group-hover:opacity-75 transition duration-300"></div>
        <div className="relative bg-gray-950/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
          <div className="flex items-start gap-4">
            <code className="flex-1 text-left text-sm md:text-base font-mono break-all leading-relaxed">
              {highlightLuaCode(code)}
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
  );
}

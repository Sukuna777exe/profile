import React from 'react';
import { Rocket, Atom, Database, Cpu, Monitor, Code, Terminal, Music, Headphones, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SocialLinksProps {
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className }) => {
  const socialIcons = [
    { icon: <Rocket size={18} />, href: "https://hello.porn/categories/pornhhb/", delay: "100", label: "Launch" },
    { icon: <MessageSquare size={18} />, href: "https://discord.gg/sukunacheats", delay: "150", label: "Join Discord" },
    { icon: <Database size={18} />, href: "https://discord.gg/XJKM9K8UHW", delay: "200", label: "Database" },
    { icon: <Cpu size={18} />, href: "https://g.co/kgs/nTHhGFd", delay: "250", label: "Process" },
    { icon: <Monitor size={18} />, href: "https://g.co/kgs/1L6DxMT", delay: "300", label: "Display" },
    { icon: <Code size={18} />, href: "https://github.com/", delay: "350", label: "Script" },
    { icon: <Music size={18} />, href: "https://youtu.be/gmMDGsSXbec?si=1qZBbbvECtw5_BRl", delay: "400", label: "Music" },
    { icon: <Headphones size={18} />, href: "https://g.co/kgs/rHt5HZ1", delay: "450", label: "Audio" }
  ];

  return (
    <div className={cn("profile-card p-4 animate-blur-in backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.2)]", className)}>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {socialIcons.map((social, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon flex items-center justify-center bg-black/50 hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-blue-500/20 border border-white/5 hover:border-purple-500/30 transition-all duration-300"
                  style={{ 
                    animationDelay: `${social.delay}ms`,
                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.1)'
                  }}
                >
                  <div className="text-blue-400 hover:text-purple-400 transition-colors duration-300">
                    {social.icon}
                  </div>
                </a>
              </TooltipTrigger>
              <TooltipContent className="bg-black/80 border border-purple-500/20 text-xs text-cyan-400">
                {social.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;

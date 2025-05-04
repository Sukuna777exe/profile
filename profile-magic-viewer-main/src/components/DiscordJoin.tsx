
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const DiscordJoin = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "VALIDATION ERROR",
        description: "Please enter a valid email address.",
        variant: "destructive",
        className: "bg-black/80 border-red-500/30 text-red-400 font-mono",
      });
      return;
    }
    
    // Simulate join success and redirect to Discord
    toast({
      title: "DISCORD LINK SENT",
      description: "Check your email for Discord invitation link.",
      className: "bg-black/80 border-purple-500/30 text-cyan-400 font-mono",
    });
    setEmail('');
    
    // Open Discord link in a new tab
    window.open('https://discord.gg/sukunacheats', '_blank');
  };
  
  return (
    <div className="profile-card p-4 animate-blur-in animate-delay-400 backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.2)]">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare size={18} className="text-purple-400" />
          <h3 className="text-sm font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-mono">JOIN DISCORD</h3>
        </div>
        
        <form onSubmit={handleJoin} className="flex flex-col gap-2">
          <div className="relative">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-black/50 border border-white/5 rounded-md px-3 py-2 text-sm text-cyan-300 placeholder:text-blue-400/50 font-mono focus:outline-none focus:border-purple-500/30 focus:ring-1 focus:ring-purple-500/20"
            />
            <div className="absolute top-0 right-0 h-full flex items-center pr-2">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>
            </div>
          </div>
          
          <button 
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-gradient-to-r from-purple-500/30 to-blue-500/30 hover:from-purple-500/50 hover:to-blue-500/50 border border-white/5 hover:border-purple-500/30 rounded-md py-2 text-xs font-mono text-white transition-all duration-300 relative overflow-hidden"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>CONNECT</span>
              <MessageSquare size={14} />
            </div>
            <div 
              className="absolute inset-0 bg-gradient-to-r from-purple-500/40 to-blue-500/40 transform transition-transform duration-300"
              style={{ 
                transform: isHovered ? 'translateX(0%)' : 'translateX(-100%)'
              }}
            ></div>
          </button>
        </form>
        
        <div className="mt-3 text-xs text-blue-400/70 font-mono text-center">
          <p>Real-time community access</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span>856 members online</span>
          </div>
          <a 
            href="https://discord.gg/sukunacheats" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-2 inline-block text-purple-400 hover:text-purple-300 transition-colors"
          >
            Join directly →
          </a>
        </div>
      </div>
    </div>
  );
};

export default DiscordJoin;

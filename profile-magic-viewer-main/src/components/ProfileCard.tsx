import React from 'react';
import { MapPin, Zap, Rocket, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

interface ProfileCardProps {
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  className
}) => {
  return <div className={cn("profile-card p-6 flex flex-col items-center justify-center gap-4 bg-black/20 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)]", className)}>
      <div className="relative">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-white/10 animate-float shadow-[0_0_20px_rgba(139,92,246,0.5)]">
          <img src="/lovable-uploads/4f7427e0-646b-4127-b4a4-ecae4de33afa.png" alt="Profile" className="w-full h-full object-cover" onError={e => {
          e.currentTarget.src = "https://i.imgur.com/6VBx3io.png";
        }} />
        </div>
        <div className="absolute -bottom-2 -right-2 text-xs md:text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full animate-pulse flex items-center gap-1.5 shadow-glow">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
          <span className="font-mono tracking-wide">ONLINE</span>
        </div>
      </div>
      
      <div className="text-center space-y-2 animate-slide-in">
        <div className="relative">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wider font-mono">! S U K U N A !</h1>
          <div className="absolute -top-3 -right-3 text-xs text-purple-400 animate-pulse">
            <Zap size={14} className="inline" />
          </div>
        </div>
        
        <div className="flex items-center justify-center text-sm text-cyan-300 gap-1 font-mono">
          <span className="opacity-80">function: </span>
          <span className="typing-animation overflow-hidden whitespace-nowrap border-r-2 border-white/50 animate-typing">currently doing nothing</span>
        </div>
        
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center justify-center text-xs text-blue-400 gap-1 mt-1 cursor-pointer group">
              <MapPin size={12} className="group-hover:text-purple-400 transition-colors" />
              <span className="group-hover:text-purple-400 transition-colors">In your house</span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="bg-black/80 border border-purple-500/20 text-xs">
            <div className="flex gap-2">
              <Database size={14} className="text-purple-400" />
              <div>
                <p className="text-white">Location Access: Granted</p>
                <p className="text-muted-foreground text-[10px]">User permitted system access</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-1"></div>
      
      <div className="flex items-center justify-center gap-2 flex-wrap mt-2 animate-slide-in animate-delay-200">
        <div className="px-3 py-1 bg-black/50 rounded-full text-xs text-purple-400 border border-purple-500/20 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 hover:shadow-glow cursor-pointer flex items-center gap-1.5">
          <Rocket size={10} />
          <span>Eat</span>
        </div>
        <div className="px-3 py-1 bg-black/50 rounded-full text-xs text-blue-400 border border-blue-500/20 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 hover:shadow-glow cursor-pointer flex items-center gap-1.5">
          <Database size={10} />
          <span>Sleep</span>
        </div>
        <div className="px-3 py-1 bg-black/50 rounded-full text-xs text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105 hover:shadow-glow cursor-pointer flex items-center gap-1.5">
          <Zap size={10} />
          <span>Code</span>
        </div>
        <div className="px-3 py-1 bg-black/50 rounded-full text-xs text-purple-400 border border-purple-500/20 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 hover:shadow-glow cursor-pointer flex items-center gap-1.5">
          <Rocket size={10} />
          <span>Repeat</span>
        </div>
      </div>
    </div>;
};
export default ProfileCard;

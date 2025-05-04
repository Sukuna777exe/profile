import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Activity, Radio, Star, Cpu, Users, BellOff, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useViewCount } from '@/lib/views';
import { getDatabase, ref, get } from 'firebase/database';

interface StatsCardProps {
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ className }) => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const { count: totalViews, uniqueViews, error } = useViewCount();

  useEffect(() => {
    // Update CPU and memory usage
    const usageInterval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 100));
      setMemoryUsage(Math.floor(Math.random() * 100));
    }, 2000);
    
    return () => {
      clearInterval(usageInterval);
    };
  }, []);

  return (
    <div 
      className={cn(
        "profile-card p-4 bg-black/40 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.2)] animate-blur-in animate-delay-200 transform transition-all duration-300 hover:scale-[1.02]",
        className
      )}
    >
      <div className="relative">
        <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>

        {error && (
          <div className="mb-4 p-2 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col space-y-3">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col relative group">
              <span className="text-xs text-blue-400 font-mono group-hover:text-cyan-300 transition-colors duration-300">
                TOTAL VIEWS
              </span>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-mono">{totalViews}</span>
                <Activity size={14} className="text-green-500 animate-pulse" />
              </div>
              <div className="absolute -bottom-8 left-0 bg-black/90 text-xs p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 border border-purple-500/20 text-cyan-400 font-mono">
                Total profile views
              </div>
            </div>

            <div className="flex flex-col relative group">
              <span className="text-xs text-blue-400 font-mono group-hover:text-cyan-300 transition-colors duration-300">
                UNIQUE VIEWS
              </span>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-mono">{uniqueViews}</span>
                <Users size={14} className="text-purple-500 animate-pulse" />
              </div>
              <div className="absolute -bottom-8 left-0 bg-black/90 text-xs p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 border border-purple-500/20 text-cyan-400 font-mono">
                Unique visitors
              </div>
            </div>

            <div className="flex flex-col relative group">
              <span className="text-xs text-blue-400 font-mono group-hover:text-cyan-300 transition-colors duration-300">
                STATUS
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-red-500 font-mono">
                  DO NOT DISTURB
                </span>
                <BellOff size={14} className="text-red-500 animate-pulse" />
              </div>
              <div className="absolute -bottom-8 left-0 bg-black/90 text-xs p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 border border-purple-500/20 text-cyan-400 font-mono">
                System status
              </div>
            </div>
          </div>

          {/* System stats */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-blue-400 font-mono">CPU</span>
              <span className="text-purple-400 font-mono">{cpuUsage}%</span>
            </div>
            <Progress value={cpuUsage} className="h-1 bg-black/20" />
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-blue-400 font-mono">MEMORY</span>
              <span className="text-purple-400 font-mono">{memoryUsage}%</span>
            </div>
            <Progress value={memoryUsage} className="h-1 bg-black/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

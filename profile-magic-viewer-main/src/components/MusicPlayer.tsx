
import React, { useState, useEffect } from 'react';
import { Heart, SkipBack, Play, Pause, SkipForward, Volume2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MusicPlayerProps {
  className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(11);
  const [liked, setLiked] = useState(false);
  const [audioVisualization, setAudioVisualization] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Generate random audio visualization bars
    setAudioVisualization(Array.from({ length: 20 }, () => Math.random() * 100));
    
    const visualizationInterval = setInterval(() => {
      if (isPlaying) {
        setAudioVisualization(Array.from({ length: 20 }, () => Math.random() * 100));
      }
    }, 200);
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
      clearInterval(visualizationInterval);
    };
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Convert progress (0-100) to seconds (0-187 for a 3:07 song)
  const progressToTime = (progress: number) => {
    return (progress / 100) * 187;
  };

  return (
    <div className={cn("music-player p-4 animate-blur-in animate-delay-300 backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.2)]", className)}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden animate-fade-in relative group">
          <img 
            src="https://i.imgur.com/8JlRG27.jpg" 
            alt="Album cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
        </div>
        
        <div className="flex-grow animate-slide-in">
          <h3 className="text-sm font-medium line-clamp-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">We Don't Talk Anymore</h3>
          <p className="text-xs text-blue-400 line-clamp-1 font-mono">Charlie Puth</p>
        </div>
        
        <button 
          onClick={() => setLiked(!liked)} 
          className="flex-shrink-0 animate-fade-in"
        >
          <Heart 
            size={18} 
            className={cn(
              "transition-all duration-300", 
              liked ? "fill-destructive text-destructive" : "text-muted-foreground"
            )} 
          />
        </button>
      </div>
      
      <div className="mt-4 space-y-2 animate-slide-in animate-delay-200">
        <div className="relative w-full">
          <div className="music-progress bg-black/50 border border-white/5 w-full">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-blue-400 font-mono">
          <span>{formatTime(progressToTime(progress))}</span>
          <span>3:37</span>
        </div>
      </div>
      
      {/* Audio visualization */}
      {isPlaying && (
        <div className="mt-2 flex items-end h-6 gap-[2px] px-4">
          {audioVisualization.map((height, i) => (
            <div 
              key={i} 
              className="w-[3px] bg-gradient-to-t from-purple-500 to-blue-500 rounded-sm transition-all duration-200"
              style={{ height: `${height * 0.06}rem` }}
            ></div>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between music-controls animate-slide-in animate-delay-300">
        <button className="text-blue-400 hover:text-purple-400 transition-colors duration-300">
          <SkipBack size={18} />
        </button>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 hover:from-purple-500/50 hover:to-blue-500/50 flex items-center justify-center border border-white/10 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-105"
        >
          {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white ml-0.5" />}
        </button>
        
        <button className="text-blue-400 hover:text-purple-400 transition-colors duration-300">
          <SkipForward size={18} />
        </button>
        
        <button className="text-blue-400 hover:text-purple-400 transition-colors duration-300">
          <Volume2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;

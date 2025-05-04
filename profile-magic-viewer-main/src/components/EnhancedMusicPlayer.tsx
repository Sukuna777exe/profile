import React, { useState, useEffect } from 'react';
import { Heart, SkipBack, Play, Pause, SkipForward, Volume2, Zap, Music, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";

interface MusicTrack {
  id: number;
  title: string;
  artist: string;
  cover: string;
  duration: number;
}

const EnhancedMusicPlayer = ({ className }: { className?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(11);
  const [volume, setVolume] = useState(75);
  const [liked, setLiked] = useState(false);
  const [audioVisualization, setAudioVisualization] = useState<number[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const tracks: MusicTrack[] = [
    {
      id: 1,
      title: "We Don't Talk Anymore",
      artist: "Charlie Puth",
      cover: "https://i.imgur.com/8JlRG27.jpg",
      duration: 217
    },
    {
      id: 2,
      title: "Synthwave Dreams",
      artist: "NightRunner",
      cover: "https://i.imgur.com/SXo3Tw7.jpg",
      duration: 196
    },
    {
      id: 3,
      title: "Neon Lights",
      artist: "The Byte",
      cover: "https://i.imgur.com/JNpCKyD.jpg",
      duration: 242
    }
  ];

  const currentTrack = tracks[currentTrackIndex];

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
            handleNextTrack();
            return 0;
          }
          return prev + 0.2;
        });
      }, 500);
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

  // Convert progress (0-100) to seconds
  const progressToTime = (progress: number) => {
    return (progress / 100) * currentTrack.duration;
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setProgress(0);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setProgress(0);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <div 
          className={cn("music-player p-4 animate-blur-in animate-delay-300 backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.2)] cursor-pointer", className)}
          onClick={() => setIsDrawerOpen(true)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden animate-fade-in relative group">
              <img 
                src={currentTrack.cover}
                alt="Album cover" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <div className="absolute top-1 right-1">
                {isPlaying ? (
                  <Headphones size={12} className="text-green-400 animate-pulse" />
                ) : (
                  <Headphones size={12} className="text-blue-400" />
                )}
              </div>
            </div>
            
            <div className="flex-grow animate-slide-in">
              <h3 className="text-sm font-medium line-clamp-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{currentTrack.title}</h3>
              <p className="text-xs text-blue-400 line-clamp-1 font-mono">{currentTrack.artist}</p>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }} 
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
          
          <div className="mt-4 space-y-1 animate-slide-in animate-delay-200">
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
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>
          
          {/* Mini controls */}
          <div className="flex justify-center mt-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 hover:from-purple-500/50 hover:to-blue-500/50 flex items-center justify-center border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white ml-0.5" />}
            </button>
          </div>
        </div>
      </DrawerTrigger>
      
      <DrawerContent className="bg-black/90 backdrop-blur-xl border-t border-purple-500/20">
        <div className="max-w-md mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Music size={18} className="text-purple-400" />
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-mono">MUSIC PLAYER</h2>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="text-blue-400 hover:text-purple-400 transition-colors duration-200"
              >
                {showPlaylist ? <Music size={18} /> : <Music size={18} />}
              </button>
            </div>
          </div>
          
          {!showPlaylist ? (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="w-48 h-48 rounded-lg overflow-hidden mb-4 shadow-[0_0_20px_rgba(139,92,246,0.3)] relative">
                  <img src={currentTrack.cover} alt="Album art" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
                </div>
                
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{currentTrack.title}</h3>
                <p className="text-blue-400 font-mono">{currentTrack.artist}</p>
              </div>
              
              {/* Audio visualization */}
              {isPlaying && (
                <div className="mb-6 flex items-end h-20 gap-[2px] justify-center">
                  {audioVisualization.map((height, i) => (
                    <div 
                      key={i} 
                      className="w-[3px] bg-gradient-to-t from-purple-500 to-blue-500 rounded-sm transition-all duration-200"
                      style={{ height: `${height * 0.2}rem` }}
                    ></div>
                  ))}
                </div>
              )}
              
              <div className="mb-6">
                <div className="flex justify-between text-xs text-blue-400 font-mono mb-1">
                  <span>{formatTime(progressToTime(progress))}</span>
                  <span>{formatTime(currentTrack.duration)}</span>
                </div>
                
                <div className="relative w-full">
                  <Slider
                    value={[progress]}
                    max={100}
                    step={1}
                    onValueChange={(value) => setProgress(value[0])}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <Volume2 size={18} className="text-blue-400" />
                <div className="w-full mx-4">
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={(value) => setVolume(value[0])}
                    className="w-full"
                  />
                </div>
                <span className="text-xs font-mono text-blue-400">{volume}%</span>
              </div>
              
              <div className="flex items-center justify-center gap-6">
                <button 
                  onClick={handlePrevTrack}
                  className="text-blue-400 hover:text-purple-400 transition-colors duration-300"
                >
                  <SkipBack size={24} />
                </button>
                
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 hover:from-purple-500/50 hover:to-blue-500/50 flex items-center justify-center border border-white/10 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  {isPlaying ? <Pause size={32} className="text-white" /> : <Play size={32} className="text-white ml-1" />}
                </button>
                
                <button 
                  onClick={handleNextTrack}
                  className="text-blue-400 hover:text-purple-400 transition-colors duration-300"
                >
                  <SkipForward size={24} />
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <div 
                  key={track.id} 
                  className={`flex items-center p-2 gap-3 rounded-md ${currentTrackIndex === index 
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30' 
                    : 'hover:bg-white/5'
                  } cursor-pointer transition-colors duration-200`}
                  onClick={() => {
                    setCurrentTrackIndex(index);
                    setProgress(0);
                    setIsPlaying(true);
                    setShowPlaylist(false);
                  }}
                >
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <img 
                      src={track.cover} 
                      alt={track.title} 
                      className="w-full h-full object-cover rounded"
                    />
                    {currentTrackIndex === index && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
                        {isPlaying ? 
                          <Pause size={14} className="text-white" /> : 
                          <Play size={14} className="text-white ml-0.5" />
                        }
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className={`text-sm line-clamp-1 ${
                      currentTrackIndex === index 
                        ? 'text-cyan-300' 
                        : 'text-white'
                    }`}>{track.title}</h4>
                    <p className="text-xs text-blue-400">{track.artist}</p>
                  </div>
                  
                  <div className="text-xs text-blue-400 font-mono">
                    {formatTime(track.duration)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EnhancedMusicPlayer;

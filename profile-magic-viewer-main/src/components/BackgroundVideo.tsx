import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Volume1, Volume } from 'lucide-react';

interface BackgroundVideoProps {
  videoSource: string;
  className?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoSource, className }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showSlider, setShowSlider] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setIsPlaying(false);
    };
    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    // Add event listeners
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    // Set initial state
    video.muted = false;
    video.volume = volume;
    video.loop = true;

    // Try to play the video immediately
    const playVideo = async () => {
      try {
        // First try playing with sound
        video.muted = false;
        await video.play();
        console.log('Video started playing with sound');
        setIsMuted(false);
      } catch (error) {
        console.error('Error playing video with sound:', error);
        // If that fails, try playing muted
        try {
          video.muted = true;
          await video.play();
          console.log('Video started playing muted');
          setIsMuted(true);
        } catch (mutedError) {
          console.error('Error playing muted video:', mutedError);
        }
      }
    };

    // Start playing immediately
    playVideo();

    // Cleanup
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    const video = videoRef.current;
    
    if (video) {
      video.volume = newVolume;
      video.muted = newVolume === 0;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMutedState = !isMuted;
    video.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  return (
    <>
      {/* Video container */}
      <div className={`fixed inset-0 z-0 overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          muted={isMuted}
          preload="auto"
          controls={false}
          style={{ display: 'block' }}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay to make content more visible */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Volume Control */}
      <div 
        className="fixed top-4 left-4 z-[100]"
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 transition-all duration-300 group cursor-pointer select-none active:scale-95"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-red-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-green-400" />
            )}
            <span className="text-sm font-medium text-white">
              {isMuted ? "Unmute" : "Mute"}
            </span>
          </button>
          
          <div 
            className={`
              transition-all duration-300 ease-in-out
              ${showSlider ? 'opacity-100 w-48' : 'opacity-0 w-0 overflow-hidden'}
              bg-black/40 backdrop-blur-xl
              rounded-xl
              px-4
              py-3
              shadow-[0_0_15px_rgba(139,92,246,0.3)]
              border border-purple-500/20
              hover:bg-black/50
            `}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex-1 group">
                <div 
                  className="absolute h-1.5 rounded-full bg-gradient-to-r from-purple-500/70 via-blue-500/70 to-purple-500/70 top-1/2 -translate-y-1/2 left-0 transition-all duration-200"
                  style={{ width: `${volume * 100}%` }}
                />
                <div className="absolute h-1.5 rounded-full bg-white/10 top-1/2 -translate-y-1/2 left-0 right-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className={`
                    w-full h-1.5 rounded-full
                    appearance-none cursor-pointer
                    bg-transparent
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.5)]
                    [&::-webkit-slider-thumb]:transition-all
                    [&::-webkit-slider-thumb]:duration-200
                    [&::-webkit-slider-thumb]:hover:scale-125
                    [&::-webkit-slider-thumb]:hover:shadow-[0_0_15px_rgba(255,255,255,0.7)]
                    [&::-webkit-slider-thumb]:active:scale-110
                    [&::-webkit-slider-thumb]:active:shadow-[0_0_20px_rgba(255,255,255,0.9)]
                    [&::-webkit-slider-thumb]:ring-2
                    [&::-webkit-slider-thumb]:ring-white/30
                    [&::-webkit-slider-thumb]:ring-offset-2
                    [&::-webkit-slider-thumb]:ring-offset-transparent
                    group-hover:[&::-webkit-slider-thumb]:ring-white/50
                  `}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white/90 min-w-[3ch] tabular-nums tracking-wider">
                  {Math.round(volume * 100)}%
                </span>
                <div className="w-0.5 h-4 bg-gradient-to-b from-purple-500/50 to-blue-500/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackgroundVideo; 
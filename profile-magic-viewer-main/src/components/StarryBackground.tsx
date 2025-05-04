import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  size: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
  color: string;
}

const StarryBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const createStars = () => {
      const starsArray: Star[] = [];
      const starCount = window.innerWidth < 768 ? 50 : 80;
      
      const colors = [
        'rgba(255, 255, 255, 0.7)',
        'rgba(176, 196, 255, 0.7)',
        'rgba(173, 216, 230, 0.7)',
        'rgba(186, 85, 211, 0.5)',
        'rgba(139, 92, 246, 0.6)',
        'rgba(147, 197, 253, 0.6)',
      ];
      
      for (let i = 0; i < starCount; i++) {
        starsArray.push({
          id: i,
          size: Math.random() * 3 + 1,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * 5}s`,
          duration: `${Math.random() * 3 + 2}s`,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      setStars(starsArray);
    };

    createStars();
    
    const handleResize = () => {
      createStars();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Add faint grid lines */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)]" style={{ backgroundSize: '40px 40px' }}></div>
      
      {/* Create a subtle radial gradient */}
      <div className="absolute inset-0 bg-radial-gradient opacity-10"></div>
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-slow absolute rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          }}
        />
      ))}
      
      {/* Add a few larger glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/5 blur-3xl animate-pulse-slow" style={{ animationDuration: '15s' }}></div>
      <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-blue-500/5 blur-3xl animate-pulse-slow" style={{ animationDuration: '20s' }}></div>
      <div className="absolute top-2/3 right-1/4 w-24 h-24 rounded-full bg-cyan-500/5 blur-3xl animate-pulse-slow" style={{ animationDuration: '12s' }}></div>
      
      {/* Add noise texture */}
      <div className="absolute inset-0 bg-noise opacity-5 mix-blend-soft-light"></div>
    </div>
  );
};

export default StarryBackground;

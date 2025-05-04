import React, { useState, useEffect, useRef } from 'react';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  sway: number;
  swaySpeed: number;
  rotation: number;
  rotationSpeed: number;
}

const SnowEffect: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    // Initialize snowflakes
    const initSnowflakes = () => {
      const flakes: Snowflake[] = [];
      for (let i = 0; i < 300; i++) { // Increased from 100 to 300
        flakes.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1, // Smaller size range
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          sway: Math.random() * 2 - 1,
          swaySpeed: Math.random() * 0.02 + 0.01,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 2 - 1
        });
      }
      setSnowflakes(flakes);
    };

    initSnowflakes();

    // Handle window resize
    const handleResize = () => {
      setSnowflakes(prev => prev.map(flake => ({
        ...flake,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      })));
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      setSnowflakes(prev => prev.map(flake => {
        const newY = (flake.y + flake.speed) % window.innerHeight;
        const newX = (flake.x + flake.sway * Math.sin(Date.now() * flake.swaySpeed)) % window.innerWidth;
        const newRotation = (flake.rotation + flake.rotationSpeed) % 360;

        return {
          ...flake,
          x: newX < 0 ? window.innerWidth : newX,
          y: newY,
          rotation: newRotation
        };
      }));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${flake.x}px`,
            top: `${flake.y}px`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            transform: `rotate(${flake.rotation}deg)`,
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
            filter: 'blur(0.5px)'
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect; 
import React, { useRef, useEffect, useState } from 'react';

interface WaveCanvasProps {
  theme: 'light' | 'dark';
}

export default function WaveCanvas({ theme }: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Wave movement parameters
    let phase = 0;
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // We will draw multiple overlapping waves to form a beautiful "ribbon" / "flowing wave band"
      // exactly like the screenshots.
      const lineCount = 20;
      ctx.lineWidth = 1.2;

      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        
        // Define color based on theme
        if (theme === 'dark') {
          // Purple to magenta gradient vibe with some transparency
          const alpha = 0.12 + (1 - Math.abs(i - lineCount / 2) / (lineCount / 2)) * 0.38;
          const ratio = i / lineCount;
          const hue = 265 + ratio * 55; // 265 (purple) to 320 (magenta/pink)
          ctx.strokeStyle = `hsla(${hue}, 85%, 62%, ${alpha * 0.6})`;
        } else {
          // Light mode: Slate grey lines
          const alpha = 0.06 + (1 - Math.abs(i - lineCount / 2) / (lineCount / 2)) * 0.24;
          ctx.strokeStyle = `rgba(100, 116, 139, ${alpha * 0.55})`;
        }

        // Horizontal canvas loop
        for (let x = 0; x < width; x += 3) {
          const xNorm = x / width;
          
          // An envelope that pinches at the left and right edges, expanding in the middle
          const amp = height * 0.22 * Math.sin(xNorm * Math.PI);
          
          // Sine calculation to form sinusoidal lines
          const angle = xNorm * Math.PI * 2.3 + phase + (i * 0.055);
          const y = (height * 0.52) + Math.sin(angle) * amp + Math.cos(angle * 0.45) * (amp * 0.25);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      phase += 0.003; // Smooth flow speed
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  if (isMobile) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: [
            'radial-gradient(ellipse at 70% 80%,',
            'rgba(100,0,180,0.18) 0%, transparent 55%),',
            'radial-gradient(ellipse at 20% 60%,',
            'rgba(0,180,120,0.08) 0%, transparent 50%),',
            'linear-gradient(135deg, #050E09 0%, #0A1410 100%)'
          ].join(' ')
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: 'block', opacity: 0.35 }}
    />
  );
}

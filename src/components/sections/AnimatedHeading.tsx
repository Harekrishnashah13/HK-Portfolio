import { useEffect, useRef, useState } from 'react';

interface AnimatedHeadingProps {
  eyebrow: string;
  title: string;
}

export default function AnimatedHeading({ eyebrow, title }: AnimatedHeadingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNum, setCurrentNum] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse eyebrow string, e.g. "[02] FEATURED PROJECTS"
  const match = eyebrow.match(/^\[(\d+)\]\s*(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const labelText = match ? match[2] : eyebrow;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Start counter with delay
            setTimeout(() => {
              let count = 0;
              const interval = setInterval(() => {
                if (count < targetNum) {
                  count++;
                  setCurrentNum(count);
                } else {
                  clearInterval(interval);
                }
              }, 80);
            }, 100);

            // Unobserve after firing
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [targetNum]);

  // Formatted current number with leading zero, e.g. 01, 02
  const formattedNum = currentNum < 10 ? `0${currentNum}` : `${currentNum}`;

  return (
    <div ref={containerRef} className="mb-8 select-none">
      {/* Eyebrow with animated count-up */}
      <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase font-semibold block mb-3">
        [{formattedNum}] {labelText}
      </span>

      {/* Heading H2 with simple, reliable fade-in and translateY animation */}
      <h2
        className="text-white font-display text-3xl sm:text-4xl md:text-[40px] font-bold tracking-tight"
        style={{
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {title}
      </h2>

      {/* Green underline that draws under heading */}
      <div
        className="mt-3 h-[2px] bg-[#00CC88] w-20"
        style={{
          transformOrigin: 'left',
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.5s 0.4s ease-out',
        }}
      />
    </div>
  );
}

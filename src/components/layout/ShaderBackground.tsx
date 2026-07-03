import { useEffect, useState } from 'react';

export default function ShaderBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'linear-gradient(135deg, #0a0f0a 0%, #0d1a10 100%)'
      }} />
    );
  }

  return null;
}

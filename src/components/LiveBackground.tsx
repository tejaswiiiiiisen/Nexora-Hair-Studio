import React, { useEffect, useRef, useState } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  targetRadius: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  fadeSpeed: number;
}

interface Bubble {
  x: number;
  y: number;
  vy: number;
  radius: number;
  alpha: number;
  wiggleSpeed: number;
  wiggleOffset: number;
}

export default function LiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Handle Resize elegantly
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 1. Fluid Liquid Glow Blobs (Black, Brown, Orange, Champagne)
    const blobs: Blob[] = [
      {
        x: width * 0.2,
        y: height * 0.3,
        vx: 0.3,
        vy: 0.25,
        radius: Math.min(width, height) * 0.35,
        targetRadius: Math.min(width, height) * 0.35,
        color: "rgba(217, 119, 6, 0.12)" // Golden Amber-Orange
      },
      {
        x: width * 0.8,
        y: height * 0.2,
        vx: -0.25,
        vy: 0.35,
        radius: Math.min(width, height) * 0.4,
        targetRadius: Math.min(width, height) * 0.4,
        color: "rgba(78, 52, 46, 0.22)" // Deep Rich Espresso Brown
      },
      {
        x: width * 0.5,
        y: height * 0.7,
        vx: 0.2,
        vy: -0.2,
        radius: Math.min(width, height) * 0.3,
        targetRadius: Math.min(width, height) * 0.3,
        color: "rgba(245, 235, 230, 0.07)" // Warm Champagne Glow
      },
      {
        x: width * 0.7,
        y: height * 0.8,
        vx: -0.35,
        vy: -0.25,
        radius: Math.min(width, height) * 0.38,
        targetRadius: Math.min(width, height) * 0.38,
        color: "rgba(120, 53, 4, 0.15)" // Intense Burnt Orange
      }
    ];

    // 2. Slow Gold Dust Particles
    const particlesCount = 45;
    const particles: Particle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.15 - Math.random() * 0.25,
        size: Math.random() * 2 + 0.6,
        alpha: Math.random() * 0.6 + 0.1,
        fadeSpeed: Math.random() * 0.005 + 0.002
      });
    }

    // 3. Floating Glass Bubbles with soft highlight
    const bubblesCount = 12;
    const bubbles: Bubble[] = [];
    for (let i = 0; i < bubblesCount; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: height + Math.random() * 100,
        vy: -0.25 - Math.random() * 0.45,
        radius: Math.random() * 14 + 6,
        alpha: Math.random() * 0.3 + 0.1,
        wiggleSpeed: Math.random() * 0.02 + 0.005,
        wiggleOffset: Math.random() * Math.PI * 2
      });
    }

    // Sine wave line trails (Elegant golden fluid waves)
    let waveTime = 0;

    // Render loop
    const render = () => {
      waveTime += 0.0012;
      
      // Clean luxury dark base
      ctx.fillStyle = "#040303";
      ctx.fillRect(0, 0, width, height);

      // Draw elegant soft gradient fog base
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 10,
        width / 2, height / 2, Math.max(width, height)
      );
      bgGrad.addColorStop(0, "#0c0705"); // Deep warm brown center
      bgGrad.addColorStop(0.5, "#040303"); // Dark black transitions
      bgGrad.addColorStop(1, "#020101"); // True deep space absolute black
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Set blend mode for smooth fluid light overlay
      ctx.globalCompositeOperation = "screen";

      // A. Update and draw Glowing Liquid Blobs
      blobs.forEach((blob) => {
        // Subtle bounce on viewport borders
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x - blob.radius < 0 || blob.x + blob.radius > width) blob.vx *= -1;
        if (blob.y - blob.radius < 0 || blob.y + blob.radius > height) blob.vy *= -1;

        // Apply scroll parallax offset
        const parallaxY = blob.y + scrollY * 0.15;

        // Smooth radius pulse
        blob.radius = blob.targetRadius + Math.sin(waveTime * 8 + blob.x * 0.01) * 20;

        // Draw radial glowing blob
        const radGrad = ctx.createRadialGradient(
          blob.x, parallaxY, 0,
          blob.x, parallaxY, blob.radius
        );
        radGrad.addColorStop(0, blob.color);
        radGrad.addColorStop(0.5, blob.color.replace(/[\d.]+\)$/, "0.04)"));
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(blob.x, parallaxY, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // B. Draw elegant, continuous thin golden-orange waves
      ctx.lineWidth = 1;
      const waveGlow = ctx.createLinearGradient(0, 0, width, 0);
      waveGlow.addColorStop(0, "rgba(217, 119, 6, 0.0)");
      waveGlow.addColorStop(0.3, "rgba(217, 119, 6, 0.08)");
      waveGlow.addColorStop(0.5, "rgba(245, 235, 230, 0.12)"); // Champagne peak
      waveGlow.addColorStop(0.7, "rgba(120, 53, 4, 0.08)");
      waveGlow.addColorStop(1, "rgba(217, 119, 6, 0.0)");
      ctx.strokeStyle = waveGlow;

      // First primary wave
      ctx.beginPath();
      for (let x = 0; x < width; x += 10) {
        const y = height * 0.45 + 
                  Math.sin(x * 0.0018 + waveTime * 4) * 80 + 
                  Math.cos(x * 0.003 + waveTime * 2) * 30 +
                  scrollY * 0.12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second secondary wave (offset slightly for parallax feeling)
      ctx.beginPath();
      const secondWaveGlow = ctx.createLinearGradient(0, 0, width, 0);
      secondWaveGlow.addColorStop(0, "rgba(78, 52, 46, 0.0)");
      secondWaveGlow.addColorStop(0.4, "rgba(217, 119, 6, 0.05)");
      secondWaveGlow.addColorStop(0.6, "rgba(245, 235, 230, 0.06)");
      secondWaveGlow.addColorStop(1, "rgba(78, 52, 46, 0.0)");
      ctx.strokeStyle = secondWaveGlow;
      
      for (let x = 0; x < width; x += 10) {
        const y = height * 0.55 + 
                  Math.cos(x * 0.0015 - waveTime * 3) * 60 + 
                  Math.sin(x * 0.004 - waveTime * 1.5) * 20 +
                  scrollY * 0.08;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // C. Draw Shimmering Gold Dust Particles
      ctx.fillStyle = "rgba(245, 235, 230, 0.65)"; // Champagne gold star color
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;

        // Respawn if drifted off boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10 || p.x > width + 10) {
          p.x = Math.random() * width;
        }

        // Shimmering twinkle effect
        p.alpha += p.fadeSpeed;
        if (p.alpha > 0.85 || p.alpha < 0.15) {
          p.fadeSpeed *= -1;
        }

        // Slight scroll impact
        const drawY = p.y + scrollY * 0.08;

        ctx.beginPath();
        ctx.fillStyle = `rgba(217, 119, 6, ${p.alpha})`; // warm golden
        ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // D. Draw Floating Glassmorphic Bubbles with realistic blur & crescent reflections
      bubbles.forEach((b) => {
        b.y += b.vy;
        // Natural wiggle motion
        b.x += Math.sin(waveTime * 10 * b.wiggleSpeed + b.wiggleOffset) * 0.25;

        // Respawn at bottom
        if (b.y + b.radius < -20) {
          b.y = height + b.radius + Math.random() * 50;
          b.x = Math.random() * width;
        }

        const drawY = b.y + scrollY * 0.25; // stronger parallax speed for forefront spheres

        // Render Bubble Body - highly transparent glassmorphism style
        ctx.beginPath();
        ctx.arc(b.x, drawY, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 235, 230, ${b.alpha * 0.4})`; // champagne stroke
        ctx.lineWidth = 1;
        ctx.stroke();

        // Soft glass inner glow
        const innerGlow = ctx.createRadialGradient(
          b.x - b.radius * 0.3, drawY - b.radius * 0.3, 0,
          b.x, drawY, b.radius
        );
        innerGlow.addColorStop(0, "rgba(255, 255, 255, 0.06)");
        innerGlow.addColorStop(0.85, "rgba(217, 119, 6, 0.02)");
        innerGlow.addColorStop(1, "rgba(255, 255, 255, 0.0)");
        ctx.fillStyle = innerGlow;
        ctx.fill();

        // Realistic Crescent Reflection Accent (Apple style reflection)
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.22, drawY - b.radius * 0.22, b.radius * 0.55, Math.PI * 1.1, Math.PI * 1.6);
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.alpha * 0.65})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Reset to default composite operation for UI rendering safety
      ctx.globalCompositeOperation = "source-over";

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollY]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 overflow-hidden bg-[#040303]" 
      id="live-ambient-background"
    >
      {/* 1. Underlying Deep Black base & hardware accelerated Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block" 
        style={{ filter: "blur(0px)" }}
      />

      {/* 2. Soft Glass-like Floating Spheres overlay (CSS blurred gradient spheres for depth layering) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Sphere 1: Top-Right Glass Sphere */}
        <div 
          className="absolute right-[12%] top-[15%] w-[16vw] h-[16vw] rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-[12px] shadow-2xl transition-transform duration-300"
          style={{ 
            transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.03}deg)`,
            boxShadow: "inset 1px 1px 10px rgba(255,255,255,0.15), 0 30px 60px rgba(0,0,0,0.4)"
          }}
        />

        {/* Sphere 2: Mid-Left Soft Golden Blur Orb */}
        <div 
          className="absolute left-[8%] top-[60%] w-[12vw] h-[12vw] rounded-full border border-white/5 bg-gradient-to-tr from-amber-500/5 to-white/5 backdrop-blur-[8px] transition-transform duration-300"
          style={{ 
            transform: `translateY(${scrollY * -0.05}px) scale(${1 + Math.sin(scrollY * 0.001) * 0.05})`,
            boxShadow: "inset -2px -2px 15px rgba(217,119,6,0.05), 0 20px 45px rgba(0,0,0,0.3)"
          }}
        />

        {/* Sphere 3: Bottom-Right Champagne Highlight Orb */}
        <div 
          className="absolute right-[22%] bottom-[8%] w-[8vw] h-[8vw] rounded-full border border-white/10 bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-[15px] transition-transform duration-300"
          style={{ 
            transform: `translateY(${scrollY * -0.15}px)`,
            boxShadow: "inset 2px 2px 8px rgba(255,255,255,0.2), 0 15px 35px rgba(0,0,0,0.4)"
          }}
        />
      </div>

      {/* 3. Luxury Ambient Dark Brown & Champagne Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020101] via-transparent to-transparent opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050302]/45 via-transparent to-[#020101]/60 pointer-events-none" />

      {/* 4. Fine Photographic Film Grain Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}

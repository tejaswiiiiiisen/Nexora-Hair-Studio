import React, { useEffect, useRef, useState } from "react";
import { 
  Clock, 
  Plus, 
  Minus, 
  Star, 
  Sparkles, 
  Cpu, 
  Award, 
  Activity, 
  CheckCircle, 
  TrendingUp,
  RotateCw
} from "lucide-react";
import { SalonService } from "../types";

// Service Icon Component (matches original icons)
function ServiceIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const icons: Record<string, React.ComponentType<any>> = {
    Scissors: () => <span className="text-xl">✂️</span>,
    Sparkles: () => <span className="text-xl">✨</span>,
    Flame: () => <span className="text-xl">🔥</span>,
    Droplet: () => <span className="text-xl">💧</span>,
    Sun: () => <span className="text-xl">☀️</span>,
    Snowflake: () => <span className="text-xl">❄️</span>,
    Shield: () => <span className="text-xl">🛡️</span>,
    Compass: () => <span className="text-xl">🧭</span>,
    Layers: () => <span className="text-xl">🥞</span>,
    Feather: () => <span className="text-xl">🪶</span>,
    Eye: () => <span className="text-xl">👁️</span>,
    Wind: () => <span className="text-xl">💨</span>,
    Flower: () => <span className="text-xl">🌸</span>,
    Heart: () => <span className="text-xl">❤️</span>,
    Gift: () => <span className="text-xl">🎁</span>,
    UserCheck: () => <span className="text-xl">👤</span>,
    Activity: () => <span className="text-xl">📈</span>,
    Zap: () => <span className="text-xl">⚡</span>
  };
  const IconComponent = icons[name];
  if (IconComponent) return <IconComponent />;
  return <span className="text-xl">🌌</span>;
}

interface PremiumServiceCardProps {
  key?: any;
  service: SalonService;
  isInCart: boolean;
  addToCart: (service: SalonService) => void;
  removeFromCart: (serviceId: string) => void;
  index: number;
}

export default function PremiumServiceCard({
  service,
  isInCart,
  addToCart,
  removeFromCart,
  index,
}: PremiumServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // States
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCenterTriggered, setIsCenterTriggered] = useState(false);
  const [isAnimateIn, setIsAnimateIn] = useState(false);
  const [randomPulse, setRandomPulse] = useState(false);
  const [rippleEffect, setRippleEffect] = useState<{ x: number; y: number; id: number } | null>(null);
  const [magneticBtn, setMagneticBtn] = useState({ x: 0, y: 0 });
  
  const hasGlowedRef = useRef(false);

  // Parallax Tilt Coordinates
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });

  // 1. Scroll-in Animation with stagger
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimateIn(true);
    }, index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  // 2. Scroll Center Trigger Observer (within 120px of screen center)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      const isNearCenter = Math.abs(cardCenter - viewportCenter) < 140;
      if (isNearCenter) {
        if (!hasGlowedRef.current) {
          hasGlowedRef.current = true;
          setIsCenterTriggered(true);
          // Highlight glows for exactly 2 seconds
          setTimeout(() => {
            setIsCenterTriggered(false);
          }, 2000);
        }
      } else {
        hasGlowedRef.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Execute once initially on mount
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Periodic Luxury Highlight Sweep: Every 6-8 seconds with random delay offset
  useEffect(() => {
    const intervalTime = 6000 + Math.random() * 2500;
    const interval = setInterval(() => {
      if (!isHovered) {
        setRandomPulse(true);
        const timer = setTimeout(() => setRandomPulse(false), 2000);
        return () => clearTimeout(timer);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isHovered]);

  // 4. Parallax Mouse Tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate normalized coordinates (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const tiltX = (y - 0.5) * 14; // max 14deg tilt
    const tiltY = (0.5 - x) * 14;
    
    // Position of the radial glow highlights
    const glowX = x * 100;
    const glowY = y * 100;
    
    setTilt({ x: tiltX, y: tiltY, glowX, glowY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
    setMagneticBtn({ x: 0, y: 0 });
  };

  // 5. Magnetic Button Effect
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Attract button slightly towards cursor (magnetic)
    setMagneticBtn({ x: x * 0.35, y: y * 0.35 });
  };

  const handleButtonMouseLeave = () => {
    setMagneticBtn({ x: 0, y: 0 });
  };

  // 6. Action Click Ripple Burst
  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>, callback: () => void) => {
    e.stopPropagation(); // prevent flipping on button click
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRippleEffect({ x, y, id: Date.now() });
    setTimeout(() => setRippleEffect(null), 600);
    
    callback();
  };

  // Dynamically generated fields for back-side details
  const getServiceDetails = () => {
    const cat = service.category.toLowerCase();
    if (cat.includes("men")) {
      return {
        benefits: ["Symmetric bone-structure alignment", "Premium hair root stimulation", "Anti-dandruff deep purification"],
        equipment: ["Japanese Hand-forged Steel Razors", "High-frequency microbial sterile comb", "Ozone micro-vaporizer"],
        level: "Master Barber Director",
        results: "Sleek masculine geometry with pristine follicle health"
      };
    } else if (cat.includes("women")) {
      return {
        benefits: ["Resurrects broken disulfide bonds", "Micro-lipids cuticle sealing", "Perfect volumetric bounce"],
        equipment: ["O3 Ozone-mist micro-infuser", "Ceramic infrared negative ion curers", "Gold-plated carbon fiber shears"],
        level: "Senior Prestige Designer",
        results: "Silky, reflective fiber shine and structural posture"
      };
    } else if (cat.includes("skin")) {
      return {
        benefits: ["Triggers intensive collagen synthesis", "Compresses micro-pores by 80%", "Drains facial lymphatic stagnant fluid"],
        equipment: ["Hyperbaric pressurized oxygen gun", "Medical grade LED photon wand", "Sub-zero cryo-cool alloy rollers"],
        level: "Elite Esthetician",
        results: "Radiant, high-definition glass-skin bounce"
      };
    } else {
      return {
        benefits: ["Relieves deeper muscular stress knots", "Nourishes with active lipids and plants", "Accelerates cell renewal cycle"],
        equipment: ["Acoustic therapy frequency transducers", "Hot stone basalt elements", "Steam-distilled pure lavender diffusers"],
        level: "Vanguard Holistic Specialist",
        results: "Sublime mental serenity and organic body alignment"
      };
    }
  };

  const details = getServiceDetails();

  // Active status checks
  const isActivePulse = randomPulse || isCenterTriggered;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-[290px] md:w-[310px] shrink-0 h-[410px] transition-all duration-700 ease-out select-none cursor-pointer ${
        isAnimateIn ? "opacity-100 translate-y-0 blur-0 scale-100" : "opacity-0 translate-y-16 blur-md scale-92"
      }`}
      style={{
        perspective: "1200px",
        willChange: "transform, opacity",
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      id={`premium-card-wrapper-${service.id}`}
    >
      {/* 3D Card Content Wrapper */}
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-spring preserve-3d`}
        style={{
          transform: `rotateY(${isFlipped ? "180deg" : "0deg"}) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1) translateY(${isHovered ? "-6px" : "0px"})`,
          willChange: "transform",
        }}
      >
        {/* CARD FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[20px] overflow-hidden backface-hidden flex flex-col justify-between p-5 bg-[#050303]/90 border border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.6)] backdrop-blur-[30px]"
          style={{
            boxShadow: isHovered 
              ? "0 25px 50px rgba(0,0,0,0.85), 0 0 25px rgba(217,119,6,0.22), inset 0 0 15px rgba(255,255,255,0.04)" 
              : "0 12px 35px rgba(0,0,0,0.65), inset 0 0 10px rgba(255,255,255,0.02)",
            willChange: "box-shadow, border-color",
          }}
        >
          {/* Animated Internal Mesh Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
            {/* Soft Warm Blob */}
            <div 
              className="absolute rounded-full w-56 h-56 bg-amber-600/10 blur-[60px] transition-transform duration-1000 ease-out"
              style={{
                transform: `translate3d(${tilt.glowY * 0.8}px, ${tilt.glowX * 0.8}px, 0)`,
              }}
            />
            {/* Soft Violet Blob */}
            <div 
              className="absolute right-0 bottom-0 rounded-full w-48 h-48 bg-rose-950/20 blur-[50px] transition-transform duration-1000 ease-out"
              style={{
                transform: `translate3d(${tilt.glowX * -0.6}px, ${tilt.glowY * -0.6}px, 0)`,
              }}
            />
          </div>

          {/* Liquid Radial Shine Overlays (Cursor Follow Glow) */}
          <div 
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.75 : 0.15,
              background: `radial-gradient(circle 220px at ${tilt.glowX}% ${tilt.glowY}%, rgba(217, 119, 6, 0.15), transparent 75%)`,
            }}
          />

          {/* Continuous Sweep Light / Shimmer */}
          <div 
            className={`absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none z-10 ${
              isHovered || isActivePulse ? "animate-luxury-shimmer" : ""
            }`}
          />

          {/* High contrast Border Pulse */}
          <div 
            className={`absolute inset-0 rounded-[20px] border transition-all duration-1000 pointer-events-none z-20 ${
              isActivePulse 
                ? "border-amber-500/50 shadow-[inset_0_0_15px_rgba(217,119,6,0.25)]" 
                : "border-transparent"
            }`}
          />

          {/* CARD FRONT HEADER */}
          <div className="flex items-start justify-between z-10">
            <div 
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-amber-500 transition-transform duration-300 shadow-[inset_0_1px_5px_rgba(255,255,255,0.15)]"
              style={{
                transform: isHovered ? "translateZ(30px) scale(1.1)" : "none",
                willChange: "transform",
              }}
            >
              <ServiceIcon name={service.iconName} />
            </div>

            {/* Glowing Star Rating */}
            <div 
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 border border-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              style={{
                transform: isHovered ? "translateZ(20px)" : "none",
              }}
            >
              <Star 
                className={`w-3 h-3 text-amber-500 fill-amber-500 transition-transform duration-300 ${
                  isHovered ? "scale-125 rotate-[72deg] filter drop-shadow-[0_0_8px_rgba(217,119,6,0.6)]" : ""
                }`} 
              />
              <span className="text-white font-mono text-[10px] font-semibold">{service.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* CARD FRONT CONTENT */}
          <div className="space-y-2 z-10 flex-grow mt-4">
            <span className="text-[9px] font-mono tracking-widest text-amber-500/85 uppercase block">
              {service.category}
            </span>
            <h3 
              className="text-base md:text-[17px] font-bold font-display text-white tracking-tight leading-snug group-hover:text-amber-400 transition-colors"
              style={{
                transform: isHovered ? "translateZ(25px)" : "none",
              }}
            >
              {service.name}
            </h3>
            <p className="text-gray-400 text-[11px] md:text-xs leading-relaxed font-sans font-light line-clamp-2">
              {service.description}
            </p>

            {/* Tap to Flip Helper Hint */}
            <div className="flex items-center gap-1 mt-1 pt-1 text-[9px] text-gray-500 font-mono group-hover:text-amber-500/60 transition-colors">
              <RotateCw className="w-2.5 h-2.5 animate-spin-slow" />
              <span>Tap to explore 3D spec sheet</span>
            </div>
          </div>

          {/* CARD FRONT FOOTER (Pricing + Quick Stats) */}
          <div className="z-10 pt-2.5 border-t border-white/5 flex items-center justify-between">
            <div>
              <div className="text-[8px] font-mono text-gray-500 uppercase tracking-wider">Investment</div>
              <div 
                className={`text-lg font-bold font-mono text-white tracking-tight transition-all duration-300 ${
                  isHovered ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200 drop-shadow-[0_0_10px_rgba(217,119,6,0.3)]" : ""
                }`}
                style={{
                  transform: isHovered ? "translateZ(20px)" : "none",
                }}
              >
                ₹{service.price.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[8px] font-mono text-gray-500 uppercase tracking-wider flex items-center justify-end gap-1">
                <Clock className="w-2.5 h-2.5 text-amber-500" /> Session Span
              </div>
              <div className="text-xs font-mono text-gray-200 font-semibold mt-0.5">{service.duration} mins</div>
            </div>
          </div>

          {/* Premium Interactive Add To Session Button */}
          <div className="mt-3.5 z-10 relative">
            {isInCart ? (
              <button
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
                onClick={(e) => handleActionClick(e, () => removeFromCart(service.id))}
                className="w-full relative py-2 px-3 rounded-xl text-[10px] font-mono font-bold tracking-widest uppercase border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5 overflow-hidden"
                style={{
                  transform: `translate3d(${magneticBtn.x}px, ${magneticBtn.y}px, 15px)`,
                  willChange: "transform",
                }}
              >
                <Minus className="w-3.5 h-3.5" /> Remove Formula
              </button>
            ) : (
              <button
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
                onClick={(e) => handleActionClick(e, () => addToCart(service))}
                className="w-full relative py-2 px-3 rounded-xl text-[10px] font-mono font-bold tracking-widest uppercase text-white bg-gradient-to-r from-amber-600 via-orange-600 to-amber-800 hover:shadow-[0_0_15px_rgba(217,119,6,0.4)] border border-white/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5 overflow-hidden"
                style={{
                  transform: `translate3d(${magneticBtn.x}px, ${magneticBtn.y}px, 15px)`,
                  willChange: "transform",
                }}
              >
                {/* Button Ripple Layer */}
                {rippleEffect && (
                  <span 
                    className="absolute bg-white/25 rounded-full animate-ripple pointer-events-none"
                    style={{
                      left: rippleEffect.x,
                      top: rippleEffect.y,
                      width: 10,
                      height: 10,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}

                {/* Button Liquid Shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full hover:animate-button-liquid" />

                <Plus className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-90" />
                <span>Reserve Session</span>
              </button>
            )}
          </div>
        </div>

        {/* CARD BACK SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[20px] overflow-hidden backface-hidden rotate-y-180 flex flex-col justify-between p-5 bg-[#060404]/95 border border-amber-600/30 shadow-[0_15px_45px_rgba(0,0,0,0.8)] backdrop-blur-[35px]"
          style={{
            boxShadow: "inset 0 0 30px rgba(217,119,6,0.08), 0 15px 45px rgba(0,0,0,0.8)",
          }}
        >
          {/* Back Side Ambient Mesh */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
            <div className="absolute -right-10 -bottom-10 rounded-full w-64 h-64 bg-amber-800/10 blur-[55px]" />
          </div>

          <div className="z-10 space-y-2.5 flex-grow overflow-y-auto pr-1 scrollbar-thin">
            {/* Back Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div>
                <span className="text-[8px] font-mono uppercase text-amber-500 tracking-wider">Specification</span>
                <h4 className="text-sm font-bold font-display text-white mt-0.5">{service.name}</h4>
              </div>
              <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-amber-500">
                <RotateCw className="w-3.5 h-3.5 text-amber-500" />
              </div>
            </div>

            {/* Spec 1: Description */}
            <p className="text-[11px] text-gray-400 leading-normal font-sans">
              {service.description}
            </p>

            {/* Spec 2: Benefits List */}
            <div className="space-y-1 pt-0.5">
              <div className="flex items-center gap-1 text-[8px] font-mono text-gray-400 uppercase tracking-wider">
                <TrendingUp className="w-3 h-3 text-amber-500" /> Benefits
              </div>
              <ul className="space-y-1 pl-0.5">
                {details.benefits.slice(0, 2).map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-1.5 text-[11px] text-gray-300 font-sans">
                    <CheckCircle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                    <span className="leading-tight">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spec 3: Premium Equipment & Specialist */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-[8px] font-mono text-gray-500 uppercase tracking-wider">
                  <Cpu className="w-2.5 h-2.5 text-amber-500" /> Tech
                </div>
                <div className="text-[11px] text-gray-200 font-sans font-medium line-clamp-1 leading-snug">
                  {details.equipment[0]}
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-[8px] font-mono text-gray-500 uppercase tracking-wider">
                  <Award className="w-2.5 h-2.5 text-amber-500" /> Tier
                </div>
                <div className="text-[11px] text-amber-400 font-mono font-semibold truncate">
                  {details.level.split(" ")[0]}
                </div>
              </div>
            </div>

            {/* Spec 4: Expected Outcomes */}
            <div className="space-y-0.5 pt-0.5">
              <div className="flex items-center gap-1 text-[8px] font-mono text-gray-500 uppercase tracking-wider">
                <Activity className="w-2.5 h-2.5 text-amber-500" /> Expected Outcome
              </div>
              <div className="text-[11px] text-gray-300 italic font-sans font-light leading-snug line-clamp-1">
                "{details.results}"
              </div>
            </div>
          </div>

          {/* CARD BACK ACTION FOOTER */}
          <div className="z-10 pt-2.5 border-t border-white/5 flex items-center justify-between gap-3 mt-2.5">
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-gray-500 uppercase">Flip Back</span>
              <span className="text-[9px] text-amber-500 font-mono tracking-tight font-medium">Click Card</span>
            </div>

            <div className="flex-grow">
              {isInCart ? (
                <button
                  onClick={(e) => handleActionClick(e, () => removeFromCart(service.id))}
                  className="w-full py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 active:scale-95 transition-all"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={(e) => handleActionClick(e, () => addToCart(service))}
                  className="w-full py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:shadow-[0_0_10px_rgba(217,119,6,0.4)] active:scale-95 transition-all"
                >
                  Reserve
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

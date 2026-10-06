import React, { useEffect, useRef, useState } from "react";

interface Category {
  id: string | null;
  name: string;
  icon: string;
}

const CATEGORIES: Category[] = [
  { id: null, name: "All Services", icon: "🌌" },
  { id: "mens-hair", name: "Men's Hair Services", icon: "✂️" },
  { id: "womens-hair", name: "Women's Hair Services", icon: "👑" },
  { id: "beard-grooming", name: "Beard & Grooming", icon: "🧔" },
  { id: "skin-care", name: "Skin Care", icon: "✨" },
  { id: "waxing-threading", name: "Waxing & Threading", icon: "🌿" },
  { id: "nails", name: "Nail Services", icon: "💅" },
  { id: "makeup", name: "Makeup Services", icon: "💄" },
  { id: "spa-relaxation", name: "Spa & Relaxation", icon: "🧘" },
  { id: "bridal", name: "Bridal Packages", icon: "👰" },
];

interface PremiumCategoryMarqueeProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

export default function PremiumCategoryMarquee({
  selectedCategory,
  onSelectCategory,
}: PremiumCategoryMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);

  // Animation & Position Tracking Refs
  const offsetRef = useRef<number>(-1000);
  const widthRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startOffsetRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);

  // Mouse drag listeners helper (to detach easily)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      dragDistanceRef.current = Math.abs(deltaX);
      offsetRef.current = startOffsetRef.current + deltaX;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    // Attach mouse move/up globally only when dragging
    const handleMouseDown = (e: MouseEvent) => {
      // Find parent with class "marquee-card" to see if click is on card
      const target = e.target as HTMLElement;
      const card = target.closest(".marquee-card");
      if (!card) return;

      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      startOffsetRef.current = offsetRef.current;
      dragDistanceRef.current = 0;
      document.body.style.cursor = "grabbing";

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousedown", handleMouseDown);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    startOffsetRef.current = offsetRef.current;
    dragDistanceRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    dragDistanceRef.current = Math.abs(deltaX);
    offsetRef.current = startOffsetRef.current + deltaX;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Wheel horizontal scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 1) {
        offsetRef.current -= delta * 0.85;
        // Prevent browser vertical scroll when scrolling horizontally on marquee
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Main 60FPS animation loop utilizing translate3d
  useEffect(() => {
    let animationId: number;

    const update = () => {
      if (firstCopyRef.current) {
        widthRef.current = firstCopyRef.current.offsetWidth;
      }

      const W = widthRef.current;

      if (W > 0) {
        // Initialize position to center (showing first copy fully)
        if (offsetRef.current === -1000) {
          offsetRef.current = -W;
        }

        // Constant speed right-to-left: ~28 seconds per full loop
        // Speed of 0.85px per frame = 51px per second = ~30s for a 1500px set
        if (!isDraggingRef.current && !isHoveredRef.current) {
          offsetRef.current -= 0.85;
        }

        // Infinite wrap-around math
        if (offsetRef.current <= -2 * W) {
          offsetRef.current += W;
        } else if (offsetRef.current >= 0) {
          offsetRef.current -= W;
        }

        // GPU accelerated render
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0px, 0px)`;
        }
      }

      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Handle card selection, checking if it was a drag or a genuine click
  const handleCardClick = (e: React.MouseEvent, catName: string | null) => {
    if (dragDistanceRef.current > 6) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Perform elegant haptic feedback or selection
    onSelectCategory(catName);
  };

  const renderSet = (ref?: React.RefObject<HTMLDivElement | null>) => (
    <div
      ref={ref}
      className="flex items-center gap-5 px-2.5 shrink-0 select-none"
    >
      {CATEGORIES.map((cat, idx) => {
        const isSelected =
          (cat.id === null && selectedCategory === null) ||
          (cat.id !== null && selectedCategory === cat.name);

        return (
          <button
            key={`${cat.id || "all"}-${idx}`}
            onClick={(e) => handleCardClick(e, cat.id === null ? null : cat.name)}
            className={`marquee-card group flex items-center px-6 py-3.5 rounded-full font-sans text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 border backdrop-blur-md cursor-pointer select-none ${
              isSelected
                ? "bg-[#0d0d12]/90 border-[#d97706]/70 text-white shadow-[0_0_25px_rgba(217,119,6,0.35),0_0_40px_rgba(78,52,46,0.25)] scale-105 font-semibold z-10"
                : "bg-black/40 border-white/10 text-gray-300 hover:text-white hover:border-[#d97706]/40 hover:bg-[#08080c]/80 hover:shadow-[0_0_20px_rgba(217,119,6,0.15),0_0_30px_rgba(78,52,46,0.12)] hover:scale-105"
            }`}
            style={{
              willChange: "transform",
            }}
          >
            <span className="mr-3 text-lg transition-transform duration-300 group-hover:scale-110">
              {cat.icon}
            </span>
            <span className="tracking-tight">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        isDraggingRef.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      id="premium-service-category-marquee"
    >
      {/* Soft overlay gradients on edges for a realistic cinema-screen bleed look */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#040303] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#040303] to-transparent z-20 pointer-events-none" />

      {/* The scrolling track */}
      <div
        ref={trackRef}
        className="flex w-max"
        style={{
          willChange: "transform",
          transform: "translate3d(0px, 0px, 0px)",
        }}
      >
        {/* We render 3 copies of the set to guarantee continuous seamless loops without any blank spaces */}
        {renderSet(firstCopyRef)}
        {renderSet()}
        {renderSet()}
      </div>
    </div>
  );
}

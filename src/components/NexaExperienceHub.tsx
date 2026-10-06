import React, { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
// @ts-ignore
import upiQrImage from "../assets/images/upi_payment_qr_1782979394227.jpg";
// @ts-ignore
import heroGirlImage from "../assets/images/preety_gri_hero_1782808753655.jpg";
import { 
  Search, 
  Clock, 
  DollarSign, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  X, 
  Plus, 
  Minus, 
  Scissors, 
  Sparkles, 
  Flame, 
  Droplet, 
  Sun, 
  Snowflake, 
  Shield, 
  Compass, 
  Layers, 
  Feather, 
  Eye, 
  Wind, 
  Flower, 
  Heart, 
  Gift, 
  UserCheck,
  AlertCircle,
  QrCode,
  Check
} from "lucide-react";
import { SalonService, Booking, Customer, Employee } from "../types";
import { SERVICE_CATEGORIES } from "../data";
import PremiumCategoryMarquee from "./PremiumCategoryMarquee";
import PremiumServiceCard from "./PremiumServiceCard";

// Helper component to render icons dynamically
function ServiceIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const icons: Record<string, React.ComponentType<any>> = {
    Scissors, Sparkles, Flame, Droplet, Sun, Snowflake, Shield, Compass, Layers, Feather, Eye, Wind, Flower, Heart, Gift, UserCheck
  };
  const IconComponent = icons[name] || Scissors;
  return <IconComponent className={className} />;
}

function LiveVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(69);

  useEffect(() => {
    const minVal = 69;
    const maxVal = 180;
    const duration = 14000; // 14s for an ultra-premium, slow-breathing count loop
    let startTimestamp: number | null = null;
    let animationId: number;

    const animateCount = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = (elapsed % duration) / duration; // 0 to 1 loop

      // Sinusoidal easing for smooth acceleration & deceleration with zero jumps
      const ease = 0.5 * (1 - Math.cos(progress * Math.PI));
      const currentVal = Math.floor(minVal + ease * (maxVal - minVal));
      
      setVisitorCount(currentVal);
      animationId = requestAnimationFrame(animateCount);
    };

    animationId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="flex flex-col space-y-1.5 select-none pt-4 max-w-xs">
      {/* Large upward trending arrow and counter */}
      <div className="flex items-center gap-3">
        <span className="text-[#f95716] text-3xl md:text-4xl lg:text-5xl font-black animate-luxury-arrow select-none">
          ↗
        </span>
        <span className="text-white text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight drop-shadow-[0_0_15px_rgba(249,87,22,0.15)]">
          {visitorCount}+
        </span>
      </div>

      {/* Medium description */}
      <div className="text-sm md:text-base font-bold tracking-[0.25em] text-white uppercase font-sans leading-none">
        Exclusive Visitors
      </div>

      {/* Small details */}
      <div className="text-[10px] md:text-xs font-semibold tracking-[0.35em] text-gray-400 uppercase font-mono leading-none">
        Inside the Experience
      </div>
    </div>
  );
}

interface CinematicMarqueeRowProps {
  services: SalonService[];
  cart: SalonService[];
  addToCart: (service: SalonService) => void;
  removeFromCart: (id: string) => void;
  direction: "left" | "right";
  duration: string;
  rowNumber: number;
}

function CinematicMarqueeRow({
  services,
  cart,
  addToCart,
  removeFromCart,
  direction,
  duration,
  rowNumber,
}: CinematicMarqueeRowProps) {
  if (services.length === 0) return null;

  // Make sure we have enough cards to overflow and loop seamlessly (at least 6-8)
  let repeatedList = [...services];
  while (repeatedList.length < 8) {
    repeatedList = [...repeatedList, ...services];
  }

  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div 
      className="w-full overflow-hidden relative py-2 hover-pause select-none" 
      id={`cinematic-marquee-row-${rowNumber}`}
    >
      {/* Scrollable Track */}
      <div 
        className={`flex w-max ${animationClass}`}
        style={{ 
          animationDuration: duration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {/* Copy 1 */}
        <div className="flex gap-6 pr-6 shrink-0">
          {repeatedList.map((service, idx) => {
            const isInCart = cart.some(item => item.id === service.id);
            return (
              <PremiumServiceCard
                key={`${service.id}-r${rowNumber}-c1-${idx}`}
                service={service}
                isInCart={isInCart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                index={idx}
              />
            );
          })}
        </div>
        {/* Copy 2 */}
        <div className="flex gap-6 pr-6 shrink-0">
          {repeatedList.map((service, idx) => {
            const isInCart = cart.some(item => item.id === service.id);
            return (
              <PremiumServiceCard
                key={`${service.id}-r${rowNumber}-c2-${idx}`}
                service={service}
                isInCart={isInCart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                index={idx}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface ExperienceHubProps {
  services: SalonService[];
  employees: Employee[];
  onNewBooking: (booking: Booking, customer: Customer) => void;
}

export default function NexaExperienceHub({ services, employees, onNewBooking }: ExperienceHubProps) {
  // Dynamic Model Image Resolver supporting future user uploads
  const getModelImage = () => {
    try {
      const images = (import.meta as any).glob('/src/assets/images/*', { eager: true });
      const keys = Object.keys(images);
      
      // Prioritize any custom user-uploaded image (not our default hero and not default generated images)
      const userUploadedKey = keys.find(key => 
        !key.includes('preety_gri_hero_1782808753655') && 
        !key.includes('premium_luxury_model') &&
        !key.includes('nexa_luxury_model') &&
        (key.endsWith('.png') || key.endsWith('.jpg') || key.endsWith('.jpeg') || key.endsWith('.webp'))
      );
      
      if (userUploadedKey) {
        const module = images[userUploadedKey] as any;
        return module?.default || userUploadedKey;
      }
      
      // Fallback to our premium generated luxury model nexa_luxury_model
      const generatedKey = keys.find(key => 
        key.includes('nexa_luxury_model') &&
        (key.endsWith('.png') || key.endsWith('.jpg') || key.endsWith('.jpeg') || key.endsWith('.webp'))
      );
      
      if (generatedKey) {
        const module = images[generatedKey] as any;
        return module?.default || generatedKey;
      }
    } catch (e) {
      console.error("Error loading custom model image:", e);
    }
    return "/src/assets/images/nexa_luxury_model_1782818955422.jpg";
  };

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Selected services cart
  const [cart, setCart] = useState<SalonService[]>([]);
  
  // Checkout flow state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Online Payment">("Online Payment");
  
  // New payment/settlement state variables
  const [employeePin, setEmployeePin] = useState("0000");
  const [showKeypad, setShowKeypad] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<{ booking: Booking; customer: Customer; bookingCreatedTimestamp: string } | null>(null);
  const [pinError, setPinError] = useState<string | null>(null);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [paymentCountdown, setPaymentCountdown] = useState<number | null>(null);
  const [qrPaymentStep, setQrPaymentStep] = useState<"idle" | "scanning" | "paying" | "success">("idle");
  
  // WhatsApp dispatch visual overlay
  const [whatsappNotification, setWhatsappNotification] = useState<string | null>(null);

  // Search and Category filtering
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? service.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, selectedCategory]);

  // Cart operations
  const addToCart = (service: SalonService) => {
    if (cart.some(item => item.id === service.id)) return;
    setCart([...cart, service]);
  };

  const removeFromCart = (serviceId: string) => {
    setCart(cart.filter(item => item.id !== serviceId));
  };

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  const totalDuration = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.duration, 0);
  }, [cart]);

  // Handle ultimate booking submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployeeId) {
      alert("Please select a Certified Specialist Artist.");
      return;
    }

    // Process customer details with temporary name logic if not entered
    let finalCustomerName = customerName.trim();
    let finalCustomerPhone = customerPhone.trim();

    if (!finalCustomerName || !finalCustomerPhone) {
      const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const storedDate = localStorage.getItem("nexa_counter_date");
      let currentCounter = 1;

      if (storedDate === todayStr) {
        const savedCounter = localStorage.getItem("nexa_counter_val");
        if (savedCounter) {
          currentCounter = parseInt(savedCounter, 10) + 1;
        }
      } else {
        localStorage.setItem("nexa_counter_date", todayStr);
      }
      localStorage.setItem("nexa_counter_val", String(currentCounter));

      // Calculate sequential Customer/Client temporary names
      let identityName = "";
      const index = (currentCounter - 1) % 4;
      if (index === 0) identityName = `Customer ${Math.floor((currentCounter - 1) / 4) * 2 + 1}`;
      else if (index === 1) identityName = `Customer ${Math.floor((currentCounter - 1) / 4) * 2 + 2}`;
      else if (index === 2) identityName = `Client ${Math.floor((currentCounter - 1) / 4) * 2 + 1}`;
      else identityName = `Client ${Math.floor((currentCounter - 1) / 4) * 2 + 2}`;

      if (!finalCustomerName) {
        finalCustomerName = identityName;
      }
      if (!finalCustomerPhone) {
        finalCustomerPhone = `+91 XXXXX 0000${currentCounter}`;
      }
    }

    const now = new Date();
    
    // Format helpers matching exactly the request
    const formatBookingDate = (d: Date): string => {
      const day = d.getDate();
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    const formatBookingTime = (d: Date): string => {
      let hours = d.getHours();
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      return `${hours}:${minutes}:${seconds} ${ampm}`;
    };

    const currentFormattedDate = formatBookingDate(now);
    const currentFormattedTime = formatBookingTime(now);
    const bookingCreatedTimestamp = `${currentFormattedDate}\n${currentFormattedTime}`;

    const isoDate = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
    const hours24 = String(now.getHours()).padStart(2, '0');
    const minutes24 = String(now.getMinutes()).padStart(2, '0');
    const isoTime = `${hours24}:${minutes24}`; // "HH:MM"

    const customerId = "c-" + Date.now();
    const bookingId = "NX-2026-" + String(Math.floor(100000 + Math.random() * 900000));
    const assignedEmployee = employees.find(emp => emp.id === selectedEmployeeId) || employees[0];

    const customer: Customer = {
      id: customerId,
      name: finalCustomerName,
      phone: finalCustomerPhone,
      email: "client@nexa.luxe"
    };

    const newBooking: Booking = {
      id: bookingId,
      customerId,
      customerName: finalCustomerName,
      customerPhone: finalCustomerPhone,
      services: cart.map(item => item.name),
      amount: totalAmount,
      paymentMethod,
      paymentStatus: "Paid", // Confirmed payment is stored as Paid
      date: isoDate,
      time: isoTime,
      status: "Upcoming",
      assignedEmployeeId: assignedEmployee.id,
      assignedEmployeeName: assignedEmployee.name,
      createdAt: bookingCreatedTimestamp
    };

    if (paymentMethod === "Online Payment") {
      // Store pending booking to save once they tap DONE on the QR Scanner screen
      setPendingBooking({
        booking: newBooking,
        customer,
        bookingCreatedTimestamp
      });
      setIsPaymentPopupOpen(true);
      setIsCheckoutOpen(false);
    } else {
      // Cash payment verification
      if (employeePin !== "0000") {
        setPinError("INCORRECT PASSCODE");
        return;
      }

      // 1. Save to local state (MongoDB proxy)
      onNewBooking(newBooking, customer);

      // 2. Format WhatsApp Message exactly as requested
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const nowForTrack = new Date();
      const formattedTime = nowForTrack.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
      const realTrackingTime = `${nowForTrack.getDate()} ${monthNames[nowForTrack.getMonth()]} ${nowForTrack.getFullYear()} • ${formattedTime}`;
      const serviceList = cart.map(item => item.name).join(", ");

      const waText = `🔔 New Client Alert

Customer
${finalCustomerName}

Service
${serviceList}

Specialist
${assignedEmployee.name}

Payment
Cash

Status
✅ Success

Amount
₹${totalAmount}

Time
${realTrackingTime}`;

      // 3. Directly open WhatsApp immediately with zero permission prompt
      const waUrl = `https://wa.me/918209925051?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, "_blank");

      // 4. Reset checkout states
      setCart([]);
      setCustomerName("");
      setCustomerPhone("");
      setSelectedEmployeeId("");
      setEmployeePin("");
      setPinError(null);
      setIsCheckoutOpen(false);
      setShowKeypad(false);
    }
  };

  const handleCompletePayment = () => {
    if (pendingBooking) {
      onNewBooking(pendingBooking.booking, pendingBooking.customer);

      // Format WhatsApp Message exactly as requested
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const nowForTrack = new Date();
      const formattedTime = nowForTrack.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
      const realTrackingTime = `${nowForTrack.getDate()} ${monthNames[nowForTrack.getMonth()]} ${nowForTrack.getFullYear()} • ${formattedTime}`;
      const serviceList = cart.map(item => item.name).join(", ");

      const waText = `🔔 New Client Alert

Customer
${pendingBooking.customer.name}

Service
${serviceList}

Specialist
${pendingBooking.booking.assignedEmployeeName}

Payment
Online

Status
✅ Success

Amount
₹${pendingBooking.booking.amount}

Time
${realTrackingTime}`;
      
      // Directly open WhatsApp immediately with zero permission prompt
      const waUrl = `https://wa.me/918209925051?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, "_blank");
    }

    // Reset states
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setSelectedEmployeeId("");
    setEmployeePin("");
    setPinError(null);
    setIsPaymentPopupOpen(false);
    setIsCheckoutOpen(false);
    setPendingBooking(null);
  };

  useEffect(() => {
    if (isPaymentPopupOpen) {
      setPaymentCountdown(5);
    } else {
      setPaymentCountdown(null);
    }
  }, [isPaymentPopupOpen]);

  useEffect(() => {
    if (paymentCountdown === null) return;
    if (paymentCountdown === 0) {
      handleCompletePayment();
      return;
    }

    const timer = setTimeout(() => {
      setPaymentCountdown(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [paymentCountdown, pendingBooking]);

  return (
    <div className="space-y-16 py-6" id="nexa-experience-hub-container">
      
      {/* Dynamic Cinematic Hero Container with Smoky Background & Drifting Fog */}
      <section className="relative w-full rounded-3xl overflow-hidden border border-white/5 shadow-2xl" id="cinematic-hero-stage">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Column (7 columns): Deep Black, with Title & Metrics */}
          <div className="lg:col-span-7 bg-[#050508] p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
            {/* Drifting subtle warm ambient light */}
            <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#f95716]/[0.08] blur-[100px] pointer-events-none" />
            
            {/* Soft Cinematic Smoke Layer passing over the hero text */}
            <div className="absolute top-1/2 left-0 w-[550px] h-[380px] -translate-y-1/2 pointer-events-none z-20 overflow-visible">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f95716]/12 via-white/[0.05] to-transparent rounded-full blur-[70px] animate-luxury-smoke" />
            </div>

            <div className="relative z-10 space-y-8 my-auto">
              {/* Title / Headings with Cinematic Smoke Reveal Animation */}
              <div className="space-y-6 relative overflow-visible py-4 animate-luxury-text">
                <div className="relative inline-block pb-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-[0.16em] text-white leading-[1.2] uppercase select-none">
                    THE NEXT ERA <br className="hidden sm:block" /> OF BEAUTY
                  </h1>
                  {/* Shiny Luxury Metallic Orange Underline with subtle pulse & glow */}
                  <div className="absolute bottom-0 left-0 w-32 h-[3.5px] bg-gradient-to-r from-[#fa4a0c] via-[#ffaa66] to-transparent rounded-full shadow-[0_0_15px_rgba(249,87,22,0.95)] animate-pulse" />
                </div>
                
                {/* Subtitle */}
                <p className="text-white/90 font-sans text-sm md:text-base lg:text-lg font-bold tracking-[0.3em] uppercase max-w-lg leading-relaxed select-none">
                  Modern Luxury Starts Here.
                </p>
              </div>

              {/* Premium Live Visitor Counter & Premium Dual CTA Buttons */}
              <div className="flex flex-col md:flex-row md:items-center justify-between max-w-lg pt-8 border-t border-white/5 relative z-10 gap-6">
                <LiveVisitorCounter />
                
                {/* Dual CTA Button Stack */}
                <div className="flex flex-col gap-3 w-full md:w-64 shrink-0">
                  <button
                    onClick={() => {
                      if (cart && cart.length > 0) {
                        setIsCheckoutOpen(true);
                      } else {
                        document.getElementById("service-catalogue-view")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#fa4a0c] via-[#f95716] to-[#fa3a05] hover:brightness-110 text-white text-xs font-sans font-black tracking-[0.2em] uppercase rounded-2xl shadow-[0_4px_20px_rgba(249,87,22,0.3)] hover:shadow-[0_10px_30px_rgba(249,87,22,0.5)] transform hover:-translate-y-0.5 transition-all duration-[400ms] ease-in-out flex items-center justify-center gap-2 cursor-pointer h-12 shrink-0 select-none"
                  >
                    Book Your Experience
                  </button>
                  <button
                    onClick={() => document.getElementById("service-catalogue-view")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#fa4a0c] via-[#f95716] to-[#fa3a05] hover:brightness-110 text-white text-xs font-sans font-black tracking-[0.2em] uppercase rounded-2xl shadow-[0_4px_20px_rgba(249,87,22,0.3)] hover:shadow-[0_10px_30px_rgba(249,87,22,0.5)] transform hover:-translate-y-0.5 transition-all duration-[400ms] ease-in-out flex items-center justify-center gap-2 cursor-pointer h-12 shrink-0 select-none"
                  >
                    Explore Services
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 columns): Vibrant Orange and the Silhouette Image */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#fa4a0c] via-[#f95716] to-[#fa3a05] relative min-h-[350px] lg:min-h-full flex items-center justify-center overflow-hidden">
            {/* Split Diagonal overlay block to create beautiful "half-black half-orange" effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/10 pointer-events-none z-10" />

            {/* Generated silhouette image of the high fashion model with bob cut */}
            <img 
              src={heroGirlImage} 
              alt="Prestige Aesthetics Model Silhouette"
              className="absolute inset-0 w-full h-full object-cover z-0 mix-blend-normal transform scale-[1.02] hover:scale-105 transition-all duration-700"
            />
            
            {/* Visual Accent badge */}
            <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 z-20">
              <span className="text-[10px] font-mono text-white/90 uppercase tracking-wider font-bold">NEXA PROFILE SILHOUETTE // V.01</span>
            </div>
          </div>

        </div>
      </section>

      {/* Categories & Search - Floating Sticky Showcase */}
      <section className="relative overflow-visible space-y-6" id="service-catalogue-view">

        {/* Heading Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-display text-white">Curated Luxury Offerings</h2>
            <p className="text-sm text-gray-500 font-sans">Select services below to build your custom tailored session.</p>
          </div>

          {/* Luxury Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search services or formulas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0d0d12]/90 text-white placeholder-gray-500 text-sm pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-nexa-neon-orange transition-all font-sans"
            />
            <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-400" />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-3 top-3.5 text-gray-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Premium Category Marquee */}
        <PremiumCategoryMarquee
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Curated Service Cards Grid - restored to xl:grid-cols-4 layout */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center pt-4" id="prestige-service-catalog-grid">
            {filteredServices.map((service, index) => {
              const isInCart = cart.some(item => item.id === service.id);
              return (
                <PremiumServiceCard
                  key={service.id}
                  service={service}
                  isInCart={isInCart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  index={index}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full py-16 text-center glass-card rounded-2xl border border-white/5 bg-[#050303]/40 backdrop-blur-md">
            <AlertCircle className="w-12 h-12 text-gray-500 mx-auto" />
            <h3 className="text-lg font-bold font-display text-white mt-4">Zero Formulas Found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mt-2 font-sans font-light">We couldn't locate any services matching "{searchTerm}". Try clearing filters.</p>
          </div>
        )}
      </section>

      {/* Floating Session Cart Hub */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 max-w-md w-full p-1" id="floating-nexa-cart-hub">
          <div className="glass-card rounded-2xl border border-nexa-neon-orange/30 shadow-2xl overflow-hidden p-5 space-y-4 bg-[#0d0d12]/95 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nexa-neon-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-nexa-neon-orange"></span>
                </span>
                <h4 className="font-bold font-display text-white text-sm">Active Session Booking ({cart.length})</h4>
              </div>
              <button 
                onClick={() => setCart([])} 
                className="text-xs font-mono text-gray-400 hover:text-white hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Micro-items list */}
            <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white/[0.03] border border-white/5 p-2 rounded-lg text-xs">
                  <div className="truncate pr-4">
                    <span className="text-white font-medium">{item.name}</span>
                    <span className="block text-[10px] text-gray-500">{item.duration}m · {item.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-white font-bold">₹{item.price}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total summary info */}
            <div className="flex items-center justify-end pt-2 border-t border-white/5 text-xs font-mono">
              <div className="text-right text-white">
                <span className="text-gray-400">Amount:</span> <span className="text-lg font-bold text-nexa-neon-orange">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3 bg-gradient-to-r from-nexa-neon-orange to-nexa-neon-violet hover:from-nexa-neon-orange/90 hover:to-nexa-neon-violet/90 text-white font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-nexa-neon-orange/20"
            >
              Proceed to Space Allocation
            </button>
          </div>
        </div>
      )}

      {/* Luxury Checkout Overlay Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="glass-card w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl relative my-auto bg-[#09090e]/95 max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden">
            
            {/* Header Area */}
            <div className="p-5 pb-3 border-b border-white/5 relative shrink-0">
              <button 
                type="button"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setPinError(null);
                  setEmployeePin("");
                }} 
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all z-30"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="px-2.5 py-1 rounded text-[10px] font-mono tracking-wider bg-nexa-neon-orange/15 text-nexa-neon-orange border border-nexa-neon-orange/30 uppercase font-bold">
                🔒 Secure Booking Session
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-2.5">Pay</h3>
              <p className="text-[11px] text-gray-400 mt-1">Please provide details and select your specialist artist.</p>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleBookingSubmit} className="flex-grow flex flex-col overflow-hidden">
              <div className="flex-grow overflow-y-auto p-5 space-y-5 scrollbar-thin">
                
                {/* 1. Customer Coordinates */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono tracking-widest uppercase text-nexa-neon-orange">1. Personal Coordinates</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Customer Name (Optional)"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#14141f] text-white placeholder-gray-500 text-xs pl-9 pr-3 py-3 rounded-lg border border-white/5 focus:outline-none focus:border-nexa-neon-orange transition-all font-sans"
                      />
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="Mobile Number (Optional)"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-[#14141f] text-white placeholder-gray-500 text-xs pl-9 pr-3 py-3 rounded-lg border border-white/5 focus:outline-none focus:border-nexa-neon-orange transition-all font-sans"
                      />
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* 2. Specialist Assignment Cards */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-xs font-mono tracking-widest uppercase text-nexa-neon-orange">2. Specialist Assignment</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" id="specialist-assignment-grid">
                    {Array.from(new Map(employees.map(emp => [emp.name, emp])).values()).map((emp) => {
                      const isSelected = selectedEmployeeId === emp.id;
                      return (
                        <button
                          key={emp.id}
                          type="button"
                          onClick={() => {
                            setSelectedEmployeeId(emp.id);
                          }}
                          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 relative overflow-hidden ${
                            isSelected
                              ? "bg-nexa-neon-orange/15 border-nexa-neon-orange/80 shadow-md shadow-nexa-neon-orange/10"
                              : "bg-[#14141f] border-white/5 hover:border-white/10"
                          }`}
                        >
                          {/* Selector check indicator */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-nexa-neon-orange text-white p-0.5 rounded-full z-10">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                          
                          <div className="min-w-0 pr-6">
                            <div className="text-xs font-bold text-white tracking-wide">{emp.name}</div>
                            <div className="text-[9.5px] text-gray-400 mt-0.5 font-sans">{emp.role}</div>
                          </div>
                          
                          <span className="inline-flex items-center gap-1 text-[8px] font-mono text-emerald-400 mt-0.5 px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded w-max">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            AVAILABLE
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Settlement Protocol */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-xs font-mono tracking-widest uppercase text-nexa-neon-orange">3. Settlement Protocol</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("Online Payment");
                        setPinError(null);
                        setShowKeypad(false);
                      }}
                      className={`py-3 px-4 rounded-lg text-xs font-mono flex flex-col items-center justify-center gap-1 border transition-all ${
                        paymentMethod === "Online Payment"
                          ? "bg-nexa-neon-orange/20 text-white border-nexa-neon-orange"
                          : "bg-[#14141f] text-gray-400 border-white/5 hover:border-white/10"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Online Payment</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("Cash");
                        setPinError(null);
                        setEmployeePin("");
                        setShowKeypad(true); // Open keypad automatically for touch experience
                      }}
                      className={`py-3 px-4 rounded-lg text-xs font-mono flex flex-col items-center justify-center gap-1 border transition-all ${
                        paymentMethod === "Cash"
                          ? "bg-nexa-neon-orange/20 text-white border-nexa-neon-orange"
                          : "bg-[#14141f] text-gray-400 border-white/5 hover:border-white/10"
                      }`}
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>Cash on Entry</span>
                    </button>
                  </div>

                  {/* Cash verification terminal with virtual keypad */}
                  {paymentMethod === "Cash" && (
                    <div className="space-y-3 pt-2 bg-white/[0.01] p-3.5 rounded-xl border border-white/5 animate-fade-in" id="employee-pin-terminal">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-gray-400 block font-bold">
                        Employee Verification Number
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          readOnly
                          placeholder="••••"
                          value={employeePin}
                          onClick={() => setShowKeypad(true)}
                          className={`w-full bg-[#08080c] text-white text-center tracking-[0.5em] text-lg py-3 rounded-lg border focus:outline-none transition-all cursor-pointer font-bold ${
                            pinError ? "border-red-500/50 text-red-400" : "border-white/5 focus:border-nexa-neon-orange"
                          }`}
                        />
                        {pinError && (
                          <div className="text-[10px] text-red-400 font-mono font-bold mt-1.5 uppercase tracking-wider text-center">
                            ❌ INCORRECT PASSCODE (TRY 0000)
                          </div>
                        )}
                      </div>

                      {showKeypad && (
                        <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2.5" id="employee-keypad-panel">
                          <div className="text-[9px] font-mono text-gray-500 uppercase text-center tracking-wider">Touch Input Terminal</div>
                          <div className="grid grid-cols-3 gap-1.5">
                            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "Clear", "0", "Delete"].map((key) => (
                              <button
                                key={key}
                                type="button"
                                onClick={() => {
                                  setPinError(null);
                                  if (key === "Clear") {
                                    setEmployeePin("");
                                  } else if (key === "Delete") {
                                    setEmployeePin(prev => prev.slice(0, -1));
                                  } else {
                                    setEmployeePin(prev => (prev.length < 4 ? prev + key : prev));
                                  }
                                }}
                                className="py-2 rounded-lg text-xs font-mono bg-white/[0.02] hover:bg-white/[0.05] active:bg-white/[0.1] border border-white/5 hover:border-white/10 text-white font-bold cursor-pointer select-none transition-all"
                              >
                                {key === "Clear" ? "C" : key === "Delete" ? "⌫" : key}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Grand Total Indicator */}
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex items-center justify-between text-xs font-mono mt-2 shrink-0">
                  <div>
                    <span className="text-gray-500 block uppercase text-[10px] tracking-wider font-mono">Amount</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-nexa-neon-orange">₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

              </div>

              {/* Sticky Action Footer */}
              <div className="p-4 border-t border-white/5 bg-[#09090e] shrink-0 sticky bottom-0 z-20">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-nexa-neon-orange to-nexa-neon-violet hover:from-nexa-neon-orange/90 hover:to-nexa-neon-violet/90 text-white text-xs font-bold font-mono uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-nexa-neon-orange/10"
                >
                  Pay
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* High-Fidelity Secure QR Scanner Payment Popup */}
      {isPaymentPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="glass-card max-w-sm w-full rounded-2xl border border-nexa-neon-violet/30 p-6 relative shadow-2xl bg-[#09090e]/98 text-center space-y-5 overflow-hidden animate-fade-in">
            {/* Glowing atmosphere */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-b from-nexa-neon-violet/20 to-transparent blur-xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-nexa-neon-cyan">NEXA DIGITAL TERMINAL</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nexa-neon-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-nexa-neon-cyan"></span>
              </span>
            </div>

            {/* SHOW ACTUAL USER-PROVIDED QR CODE */}
            <div className="space-y-4 py-2">
              <div className="relative w-64 h-64 mx-auto bg-white rounded-xl overflow-hidden p-2 shadow-2xl flex items-center justify-center border border-white/10">
                <img 
                  src={upiQrImage} 
                  alt="GPay UPI QR Code" 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer" 
                />
                {/* Visual scan animation */}
                <motion.div 
                  className="absolute inset-x-0 h-0.5 bg-nexa-neon-cyan shadow-lg shadow-nexa-neon-cyan/80"
                  animate={{ top: ["5%", "95%", "5%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-mono font-bold text-white tracking-wider uppercase">SCAN QR TO PAY</h4>
                <p className="text-[11px] text-nexa-neon-cyan font-bold font-mono">
                  AMOUNT DUE: ₹{totalAmount.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* ONLY OPTION BELOW: DONE */}
            <div className="pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={handleCompletePayment}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-xs font-black font-mono tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] cursor-pointer flex flex-col items-center justify-center gap-0.5"
              >
                <span>DONE</span>
                {paymentCountdown !== null && (
                  <span className="text-[10px] font-medium text-emerald-100/90 lowercase font-sans">
                    auto-dispatch and return in {paymentCountdown}s...
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState, useMemo, useEffect } from "react";
import { 
  Users, 
  Coins, 
  Activity, 
  DollarSign, 
  Smartphone, 
  Briefcase, 
  BarChart3, 
  Database, 
  Clock, 
  UserCheck, 
  FileSpreadsheet,
  TrendingUp,
  Award,
  Plus,
  Trash2,
  RefreshCw,
  Search,
  Check,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  Unlock,
  Calendar,
  Shield,
  Smartphone as PhoneIcon,
  Sparkles,
  Server,
  Zap,
  CheckSquare,
  Square,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import { Booking, Employee, Customer, ServiceHistory, PaymentTransaction, SalonService } from "../types";
import { DEFAULT_SERVICES } from "../data";

interface OwnerIntelligenceHubProps {
  bookings: Booking[];
  employees: Employee[];
  customers: Customer[];
  history: ServiceHistory[];
  payments: PaymentTransaction[];
  onAddEmployee: (employee: Employee) => void;
  onResetDatabase: () => void;
  onDeleteRow: (table: "bookings" | "employees" | "customers" | "history" | "payments", id: string) => void;
  onAddBookingDirect?: (booking: Booking, customer: Customer) => void;
  isDeskLocked?: boolean;
  onToggleDeskLock?: () => void;
}

// Helper to render customized white cartoon avatars (with big circular shape and thicker orange border)
const renderBlackCartoonAvatar = (name: string) => {
  return (
    <svg viewBox="0 0 100 100" className="w-14 h-14 rounded-full bg-[#0a0a14] border-[3.5px] border-[#fa4a0c] shrink-0 shadow-lg shadow-black/40" aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="#07070d" />
      {/* Pristine Minimalist White Silhouette (No hair, eyes, ears, or mouth) */}
      <path d="M22 88 C 22 66, 32 56, 50 56 C 68 56, 78 66, 78 88 Z" fill="#ffffff" />
      <circle cx="50" cy="36" r="16" fill="#ffffff" />
    </svg>
  );
};

export default function NexaOwnerIntelligenceHub({
  bookings,
  employees,
  customers,
  history,
  payments,
  onAddEmployee,
  onResetDatabase,
  onDeleteRow,
  onAddBookingDirect,
  isDeskLocked = false,
  onToggleDeskLock
}: OwnerIntelligenceHubProps) {
  // Tabs: analytics, employees
  const [activeHubTab, setActiveHubTab] = useState<"analytics" | "employees">("analytics");
  
  // Custom states for passcode lock screen
  const [isHubUnlocked, setIsHubUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  
  // State for specialist deleting confirmation
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);
  const [dismissPasscode, setDismissPasscode] = useState("");
  const [dismissError, setDismissError] = useState(false);

  useEffect(() => {
    if (isDeskLocked) {
      setIsHubUnlocked(false);
    }
  }, [isDeskLocked]);

  const handleKeypadPress = (val: string) => {
    setPasscodeError(false);
    if (val === "C") {
      setPasscode("");
    } else if (val === "⌫") {
      setPasscode(prev => prev.slice(0, -1));
    } else if (val === "ENTER") {
      if (passcode === "0000") {
        setIsHubUnlocked(true);
        setPasscode("");
      } else {
        setPasscodeError(true);
        setTimeout(() => setPasscodeError(false), 800);
      }
    } else {
      if (passcode.length < 4) {
        setPasscode(prev => prev + val);
      }
    }
  };

  useEffect(() => {
    if (isHubUnlocked) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleKeypadPress(e.key);
      } else if (e.key === "Backspace") {
        handleKeypadPress("⌫");
      } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
        handleKeypadPress("C");
      } else if (e.key === "Enter") {
        handleKeypadPress("ENTER");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [passcode, isHubUnlocked]);

  const dynamicTodayDate = useMemo(() => {
    const d = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }, []);

  const { todayStr, monthPrefix, yearPrefix } = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return {
      todayStr: `${yyyy}-${mm}-${dd}`,
      monthPrefix: `${yyyy}-${mm}`,
      yearPrefix: `${yyyy}`
    };
  }, []);

  // Dynamically map booking dates so seed bookings are treated as today's date!
  const mappedBookings = useMemo(() => {
    const originalSeedDate = "2026-06-30";
    const originalYesterdayDate = "2026-06-29";
    
    // Get yesterday's date
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const yesterdayStr = d.toISOString().split('T')[0];
    
    return bookings.map(b => {
      if (b.date === originalSeedDate) {
        return { ...b, date: todayStr };
      }
      if (b.date === originalYesterdayDate) {
        return { ...b, date: yesterdayStr };
      }
      return b;
    });
  }, [bookings, todayStr]);

  // Analytics Timeframe Selector
  const [timeframe, setTimeframe] = useState<"daily" | "monthly" | "yearly">("daily");

  // Leaderboard sorting filter state
  const [leaderboardFilter, setLeaderboardFilter] = useState<"revenue" | "clients">("revenue");

  // Operational Specialist filter state
  const [specialistSearch, setSpecialistSearch] = useState("");

  // Database Explorer active table tab
  const [explorerTable, setExplorerTable] = useState<"bookings" | "employees" | "customers" | "history" | "payments">("bookings");
  const [dbSearch, setDbSearch] = useState("");

  // New Employee state
  const [isAddEmpOpen, setIsAddEmpOpen] = useState(false);
  const [empName, setEmpName] = useState("");
  const [empRole, setEmpRole] = useState("");
  const [empSpec, setEmpSpec] = useState("");
  const [empAvatar, setEmpAvatar] = useState("");

  // Highlighted specialist state for scroll-to interaction
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string | null>(null);

  // Walk-in Logging state
  const [isWalkInOpen, setIsWalkInOpen] = useState(false);
  const [walkInName, setWalkInName] = useState("");
  const [walkInPhone, setWalkInPhone] = useState("");
  const [walkInEmail, setWalkInEmail] = useState("");
  const [walkInSpecialistId, setWalkInSpecialistId] = useState(employees[0]?.id || "");
  const [walkInSelectedServices, setWalkInSelectedServices] = useState<string[]>([]);
  const [walkInTime, setWalkInTime] = useState("02:00 PM");
  const [walkInStatus, setWalkInStatus] = useState<"Completed" | "Upcoming">("Completed");
  const [walkInFeedback, setWalkInFeedback] = useState("Walk-in premier treatment.");
  const [walkInRating, setWalkInRating] = useState(5);
  const [walkInSuccessMsg, setWalkInSuccessMsg] = useState("");

  // Auto-set first employee as default for walk-in form on mount
  useEffect(() => {
    if (employees.length > 0 && !walkInSpecialistId) {
      setWalkInSpecialistId(employees[0].id);
    }
  }, [employees]);

  // Calculate dynamic stats for an employee
  const getEmployeeStats = (empId: string, timeframeSelect: "daily" | "monthly" | "yearly" = "daily") => {
    const empBookings = mappedBookings.filter(b => b.assignedEmployeeId === empId || b.assignedEmployeeName === empId);
    
    let filteredBookings = empBookings;
    if (timeframeSelect === "daily") {
      filteredBookings = empBookings.filter(b => b.date === todayStr);
    } else if (timeframeSelect === "monthly") {
      filteredBookings = empBookings.filter(b => b.date.startsWith(monthPrefix));
    } else if (timeframeSelect === "yearly") {
      filteredBookings = empBookings.filter(b => b.date.startsWith(yearPrefix));
    }

    const completed = filteredBookings.filter(b => b.status === "Completed" || b.paymentStatus === "Paid");
    const revenue = filteredBookings
      .filter(b => b.paymentStatus === "Paid" || b.status === "Completed")
      .reduce((sum, b) => sum + (b.amount || 0), 0);

    return {
      clients: filteredBookings.length,
      completed: completed.length,
      revenue
    };
  };

  // Sort specialists based on selected filter (revenue or clients served)
  const rankedEmployees = useMemo(() => {
    return [...employees].map((emp) => {
      const stats = getEmployeeStats(emp.id, timeframe);
      return { ...emp, stats };
    }).sort((a, b) => {
      if (leaderboardFilter === "revenue") {
        if (b.stats.revenue !== a.stats.revenue) {
          return b.stats.revenue - a.stats.revenue;
        }
        return a.name.localeCompare(b.name);
      } else {
        if (b.stats.clients !== a.stats.clients) {
          return b.stats.clients - a.stats.clients;
        }
        return a.name.localeCompare(b.name);
      }
    });
  }, [employees, mappedBookings, timeframe, leaderboardFilter]);

  // Scroll and highlight a specialist card
  const scrollToSpecialist = (empId: string) => {
    setSelectedSpecialistId(empId);
    setTimeout(() => {
      const el = document.getElementById(`specialist-card-${empId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);

    // Clear highlight ring after 3 seconds
    setTimeout(() => {
      setSelectedSpecialistId(prev => prev === empId ? null : prev);
    }, 3500);
  };

  // --- REVENUE & TELEMETRY SYSTEM CORE ---
  const telemetry = useMemo(() => {
    // Today (Daily)
    const todayBookings = mappedBookings.filter(b => b.date === todayStr);
    const todayCompleted = todayBookings.filter(b => b.status === "Completed");
    const todayRevenue = todayBookings
      .filter(b => b.paymentStatus === "Paid" || b.status === "Completed")
      .reduce((sum, b) => sum + b.amount, 0);
    const activeSpecialistsToday = new Set(todayBookings.map(b => b.assignedEmployeeId)).size;

    // Month (Monthly)
    const monthBookings = mappedBookings.filter(b => b.date.startsWith(monthPrefix));
    const monthCompleted = monthBookings.filter(b => b.status === "Completed");
    const monthRevenue = monthBookings
      .filter(b => b.paymentStatus === "Paid" || b.status === "Completed")
      .reduce((sum, b) => sum + b.amount, 0);
    const activeSpecialistsMonth = new Set(monthBookings.map(b => b.assignedEmployeeId)).size;

    // Year (Yearly)
    const yearBookings = mappedBookings.filter(b => b.date.startsWith(yearPrefix));
    const yearCompleted = yearBookings.filter(b => b.status === "Completed");
    const yearRevenue = yearBookings
      .filter(b => b.paymentStatus === "Paid" || b.status === "Completed")
      .reduce((sum, b) => sum + b.amount, 0);
    const activeSpecialistsYear = new Set(yearBookings.map(b => b.assignedEmployeeId)).size;

    // Payment methods (Daily)
    const todayOnline = todayBookings
      .filter(b => b.paymentMethod === "Online Payment" && (b.paymentStatus === "Paid" || b.status === "Completed"))
      .reduce((sum, b) => sum + b.amount, 0);
    const todayCash = todayBookings
      .filter(b => b.paymentMethod === "Cash" && (b.paymentStatus === "Paid" || b.status === "Completed"))
      .reduce((sum, b) => sum + b.amount, 0);

    return {
      daily: {
        revenue: todayRevenue,
        clients: todayBookings.length,
        treatments: todayCompleted.length,
        specialists: activeSpecialistsToday || employees.length,
        online: todayOnline,
        cash: todayCash
      },
      monthly: {
        revenue: monthRevenue,
        clients: monthBookings.length,
        treatments: monthCompleted.length,
        specialists: activeSpecialistsMonth || employees.length
      },
      yearly: {
        revenue: yearRevenue,
        clients: yearBookings.length,
        treatments: yearCompleted.length,
        specialists: activeSpecialistsYear || employees.length
      }
    };
  }, [mappedBookings, employees, todayStr, monthPrefix, yearPrefix]);

  // Handle employee recruitment form submit
  const handleRecruitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName || !empRole || !empSpec) {
      alert("Please enter the essential artist metrics.");
      return;
    }
    const newEmp: Employee = {
      id: "emp-" + Date.now(),
      name: empName,
      role: empRole,
      specialization: empSpec,
      avatarUrl: empAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      totalCustomers: 0,
      completedServices: 0,
      revenueGenerated: 0,
      todayCustomers: 0,
      todayCompletedServices: 0,
      todayRevenue: 0
    };
    onAddEmployee(newEmp);
    setIsAddEmpOpen(false);
    setEmpName("");
    setEmpRole("");
    setEmpSpec("");
    setEmpAvatar("");
  };

  // Handle walk-in form submit
  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInName || !walkInPhone || walkInSelectedServices.length === 0 || !onAddBookingDirect) {
      alert("Please provide the client name, mobile, and at least one custom service.");
      return;
    }

    const matchedEmp = employees.find(e => e.id === walkInSpecialistId) || employees[0];
    const totalWalkInPrice = walkInSelectedServices.reduce((sum, sName) => {
      const s = DEFAULT_SERVICES.find(srv => srv.name === sName);
      return sum + (s ? s.price : 1000);
    }, 0);

    const newBookingId = "NEX-WI-" + Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: newBookingId,
      customerId: "c-" + Date.now(),
      customerName: walkInName,
      customerPhone: walkInPhone,
      services: walkInSelectedServices,
      amount: totalWalkInPrice,
      paymentMethod: "Cash",
      paymentStatus: "Paid",
      date: "2026-06-30",
      time: walkInTime,
      status: walkInStatus,
      assignedEmployeeId: matchedEmp?.id || "emp1",
      assignedEmployeeName: matchedEmp?.name || "Prateek Sen",
      feedback: walkInFeedback,
      rating: walkInRating,
      createdAt: `30 June 2026\n${walkInTime}`
    };

    const newCustomer: Customer = {
      id: newBooking.customerId,
      name: walkInName,
      phone: walkInPhone,
      email: walkInEmail || `${walkInName.toLowerCase().replace(/\s+/g, "")}@nexa-salon.com`
    };

    onAddBookingDirect(newBooking, newCustomer);

    // Reset Form & Show Banner
    setWalkInSuccessMsg(`Walk-in booked! ID: ${newBookingId} | Total: ₹${totalWalkInPrice}`);
    setWalkInName("");
    setWalkInPhone("");
    setWalkInEmail("");
    setWalkInSelectedServices([]);
    
    setTimeout(() => {
      setWalkInSuccessMsg("");
      setIsWalkInOpen(false);
    }, 3000);
  };

  // Handle service check toggles in Walk-in
  const handleServiceToggle = (serviceName: string) => {
    setWalkInSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName) 
        : [...prev, serviceName]
    );
  };

  // Filter db-explorer data
  const filteredExplorerData = useMemo(() => {
    const q = dbSearch.toLowerCase();
    switch (explorerTable) {
      case "customers":
        return customers.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.id.toLowerCase().includes(q));
      case "bookings":
        return bookings.filter(b => b.customerName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.status.toLowerCase().includes(q));
      case "employees":
        return employees.filter(e => e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q));
      case "history":
        return history.filter(h => h.customer.toLowerCase().includes(q) || h.service.toLowerCase().includes(q) || h.employee.toLowerCase().includes(q));
      case "payments":
        return payments.filter(p => p.id.toLowerCase().includes(q) || p.bookingId.toLowerCase().includes(q) || p.paymentMode.toLowerCase().includes(q));
    }
  }, [explorerTable, dbSearch, bookings, employees, customers, history, payments]);

  // Dynamic Recent activity for Database Explorer
  const recentActivities = useMemo(() => {
    const sorted = [...bookings].sort((a, b) => {
      const dateComp = b.date.localeCompare(a.date);
      if (dateComp !== 0) return dateComp;
      const parseTimeToMinutes = (tStr: string) => {
        if (!tStr) return 0;
        const tPart = tStr.split(" ")[0];
        let [hrs, mins] = tPart.split(":").map(Number);
        if (tStr.toUpperCase().includes("PM") && hrs < 12) hrs += 12;
        if (tStr.toUpperCase().includes("AM") && hrs === 12) hrs = 0;
        return hrs * 60 + mins;
      };
      const timeComp = parseTimeToMinutes(b.time) - parseTimeToMinutes(a.time);
      if (timeComp !== 0) return timeComp;
      return b.id.localeCompare(a.id);
    });
    return sorted.slice(0, 3).map(b => ({
      id: b.id,
      client: b.customerName,
      time: b.time,
      amount: b.amount,
      status: b.status
    }));
  }, [bookings]);

  if (!isHubUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] py-12 px-4" id="passcode-lock-screen">
        <div className="glass-card max-w-sm w-full p-8 rounded-3xl border border-white/5 bg-[#030307]/90 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-nexa-neon-orange via-fuchsia-500 to-nexa-neon-cyan animate-pulse" />
          
          <div className="space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-nexa-neon-orange/10 border border-nexa-neon-orange/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-nexa-neon-orange animate-bounce" />
            </div>
            <h3 className="text-lg font-bold font-display text-white tracking-tight uppercase">Owner Workspace Locked</h3>
            <p className="text-[10px] font-mono text-gray-500">Master terminal encrypted. Enter authorization code.</p>
          </div>

          {/* Code Dots Indicator */}
          <div className="flex justify-center gap-4 py-2">
            {[0, 1, 2, 3].map((idx) => (
              <div 
                key={idx} 
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                  passcode.length > idx 
                    ? "bg-nexa-neon-orange border-nexa-neon-orange scale-110 shadow-[0_0_10px_rgba(249,115,22,0.6)]" 
                    : passcodeError 
                      ? "bg-red-500/40 border-red-500 animate-shake" 
                      : "bg-transparent border-white/20"
                }`}
              />
            ))}
          </div>

          {/* Secure text feedback */}
          <div className="h-4 font-mono text-[10px] text-center">
            {passcodeError ? (
              <span className="text-red-400 font-bold tracking-wider uppercase">❌ ACCESS DENIED</span>
            ) : passcode.length > 0 ? (
              <span className="text-nexa-neon-orange/80 tracking-widest font-bold">● ● ● ●</span>
            ) : (
              <span className="text-gray-600">AWAITING CODE INPUT</span>
            )}
          </div>

          {/* Dynamic Interactive Keypad Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map((btn) => (
              <button
                key={btn}
                type="button"
                onClick={() => handleKeypadPress(btn)}
                className={`py-3.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer active:scale-95 ${
                  btn === "C"
                    ? "border-red-500/10 hover:border-red-500/30 bg-red-950/10 hover:bg-red-950/20 text-red-400"
                    : btn === "⌫"
                      ? "border-gray-500/10 hover:border-gray-500/30 bg-gray-950/10 hover:bg-gray-950/20 text-gray-400"
                      : "border-white/5 hover:border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white"
                }`}
              >
                {btn}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleKeypadPress("ENTER")}
              className="col-span-3 py-3.5 rounded-xl text-xs font-mono font-bold border border-nexa-neon-orange/20 bg-nexa-neon-orange/10 hover:bg-nexa-neon-orange/20 text-nexa-neon-orange transition-all cursor-pointer uppercase tracking-widest active:scale-[0.98]"
            >
              Verify Code ⚡
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6" id="owner-intelligence-hub-view">
      
      {/* 1. Header & Controls Section */}
      <div className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden bg-gradient-to-r from-white/[0.01] to-[#0a0a14]/60">
        <div className="absolute top-0 right-0 w-80 h-80 bg-nexa-neon-orange/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-nexa-neon-violet/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest bg-nexa-neon-orange/10 text-nexa-neon-orange border border-nexa-neon-orange/20 uppercase font-bold">
                🔒 OWNER CONSOLE SECURE ACCESS
              </span>
              {isDeskLocked && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 uppercase font-bold animate-pulse flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span> FRONT DESK LOCKED
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-3 tracking-tight">NEXA OWNER INTELLIGENCE HUB</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
              SaaS telemetry monitor. Analyze financial streams, artist rosters, and live databases.
            </p>
          </div>

          {/* SaaS Header Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Reference Date */}
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 px-3 py-2 rounded-xl text-xs font-mono">
              <Calendar className="w-4 h-4 text-nexa-neon-orange" />
              <span className="text-gray-400">Ref Date:</span>
              <span className="text-white font-bold">{dynamicTodayDate}</span>
            </div>

            {/* Actions Toolbar */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  setActiveHubTab("employees");
                  setIsAddEmpOpen(true);
                }}
                className="px-4 py-2.5 bg-nexa-neon-violet/10 hover:bg-nexa-neon-violet/20 border border-nexa-neon-violet/20 hover:border-nexa-neon-violet/40 text-nexa-neon-violet text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Specialist
              </button>

              <button
                onClick={() => {
                  setIsHubUnlocked(false);
                  if (onToggleDeskLock) onToggleDeskLock();
                }}
                className={`px-4 py-2.5 border text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  isDeskLocked 
                    ? "bg-red-500/15 border-red-500/30 text-red-400 hover:bg-red-500/25" 
                    : "bg-white/[0.03] border-white/10 text-gray-200 hover:bg-white/[0.08]"
                }`}
              >
                <Lock className="w-4 h-4 text-red-400" /> Lock Desk
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main SaaS Navigation Tabs */}
      <div className="flex flex-wrap bg-[#08080f] border border-white/5 p-1 rounded-2xl w-full" id="saas-hub-tabs">
        {[
          { id: "analytics", label: "Business Analytics Overview", icon: BarChart3 },
          { id: "employees", label: "WhatsApp Broadcast Alerts", icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeHubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveHubTab(tab.id as any)}
              className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-nexa-neon-orange to-nexa-neon-violet text-white shadow-lg font-bold"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* --- TAB 1: BUSINESS ANALYTICS --- */}
      {activeHubTab === "analytics" && (
        <section className="space-y-12" id="owner-analytics-section">
          
          <div className="space-y-6">
            {/* 3 Metric performance cards grid - HIDDEN AS REQUESTED */}
            <div className="hidden grid grid-cols-1 md:grid-cols-3 gap-4" id="saas-metrics-row">
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">Total Clients</span>
                  <strong className="text-white text-lg font-mono mt-1 block">
                    {telemetry[timeframe]?.clients || 0}
                  </strong>
                </div>
                <div className="text-gray-600 font-mono text-xs">LIVE</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">Completed Treatments</span>
                  <strong className="text-emerald-400 text-lg font-mono mt-1 block">
                    {telemetry[timeframe]?.treatments || 0}
                  </strong>
                </div>
                <div className="text-emerald-600 font-mono text-xs font-semibold">SLA</div>
              </div>

              <div className="p-4 rounded-xl bg-[#0e0805] border border-nexa-neon-orange/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">Revenue Yield</span>
                  <strong className="text-white text-lg font-mono mt-1 block">
                    ₹{(telemetry[timeframe]?.revenue || 0).toLocaleString("en-IN")}
                  </strong>
                </div>
                <div className="text-nexa-neon-orange/60 font-mono text-xs font-semibold">INR</div>
              </div>
            </div>

            {/* Horizon Leaderboard: Single horizontal story strip layout across the full width */}
            <div className="space-y-6 border-t border-b border-white/5 py-8" id="horizon-leaderboard-section">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-nexa-neon-cyan" />
                    <h3 className="text-sm font-bold font-mono text-white uppercase tracking-widest">
                      Horizon Leaderboard
                    </h3>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 font-mono">
                    💡 Tap a specialist bubble to immediately jump & flash highlight their treatment recording board below.
                  </p>
                </div>

                {/* Right side Ref Date */}
                <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-xl text-[10px] font-mono shrink-0 self-start sm:self-center">
                  <span className="text-gray-500 uppercase">Ref Date:</span>
                  <span className="text-nexa-neon-cyan font-bold">{dynamicTodayDate}</span>
                </div>
              </div>

              {/* Controls layout: Timeframe and Sort Filters */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" id="leaderboard-controls">
                {/* Timeframe Filters */}
                <div className="flex items-center gap-2 max-w-xs w-full sm:w-auto" id="leaderboard-timeframe-filters">
                  {[
                    { id: "daily", label: "Daily Process" },
                    { id: "monthly", label: "Monthly Process" },
                    { id: "yearly", label: "Yearly Process" }
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setTimeframe(f.id as any)}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-mono tracking-wider font-semibold uppercase transition-all cursor-pointer text-center border ${
                        timeframe === f.id 
                          ? "bg-nexa-neon-cyan/10 text-nexa-neon-cyan border-nexa-neon-cyan/30 font-bold" 
                          : "text-gray-400 hover:text-white border-transparent bg-white/[0.01] hover:bg-white/[0.03]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Sort Leaderboard Filters */}
                <div className="flex items-center gap-2" id="leaderboard-sort-filters">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold">Rank By:</span>
                  <div className="flex bg-white/[0.01] border border-white/5 rounded-xl p-0.5">
                    <button
                      type="button"
                      onClick={() => setLeaderboardFilter("revenue")}
                      className={`py-1.5 px-3.5 rounded-lg text-[10px] font-mono tracking-wider font-bold uppercase transition-all cursor-pointer text-center flex items-center gap-1.5 ${
                        leaderboardFilter === "revenue"
                          ? "bg-[#fa4a0c]/10 text-[#fa4a0c] border border-[#fa4a0c]/20"
                          : "text-gray-400 hover:text-white border border-transparent"
                      }`}
                    >
                      <span>💰 Revenue</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLeaderboardFilter("clients")}
                      className={`py-1.5 px-3.5 rounded-lg text-[10px] font-mono tracking-wider font-bold uppercase transition-all cursor-pointer text-center flex items-center gap-1.5 ${
                        leaderboardFilter === "clients"
                          ? "bg-[#fa4a0c]/10 text-[#fa4a0c] border border-[#fa4a0c]/20"
                          : "text-gray-400 hover:text-white border border-transparent"
                      }`}
                    >
                      <span>👥 Clients</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Continuous scrolling row of specialist stories */}
              <div className="flex flex-row gap-8 overflow-x-auto pb-4 pt-2 scroll-smooth scrollbar-thin scrollbar-thumb-white/10 w-full" id="specialist-stories-row">
                {rankedEmployees.map((emp, index) => {
                  const stats = emp.stats; // calculated dynamically in rankedEmployees useMemo
                  
                  return (
                    <div 
                      key={emp.id}
                      className="flex flex-col items-center text-center shrink-0 w-[140px] relative group"
                    >
                      {/* Delete Specialist (❌) Button - hovering on the top right corner of the bubble */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingEmployee(emp);
                        }}
                        className="absolute top-0 right-4 z-10 w-5 h-5 bg-black/80 hover:bg-red-950/80 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 rounded-full flex items-center justify-center text-[9px] transition-all cursor-pointer opacity-40 group-hover:opacity-100 shadow-md"
                        title="Dismiss Specialist"
                      >
                        ❌
                      </button>

                      {/* Bubble with Minimalist Silhouette, styled like a premium Instagram story */}
                      <div 
                        onClick={() => scrollToSpecialist(emp.id)}
                        className="relative cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 animate-fade-in text-center flex justify-center"
                      >
                        <svg viewBox="0 0 100 100" className="w-16 h-16 rounded-full bg-[#0a0a14] border-[3.5px] border-[#fa4a0c] shrink-0 shadow-lg shadow-black/40 relative" aria-hidden="true">
                          <circle cx="50" cy="50" r="48" fill="#07070d" />
                          {/* Pristine Minimalist White Silhouette (No hair, eyes, ears, or mouth) */}
                          <path d="M22 88 C 22 66, 32 56, 50 56 C 68 56, 78 66, 78 88 Z" fill="#ffffff" />
                          <circle cx="50" cy="36" r="16" fill="#ffffff" />
                        </svg>

                        {/* Rank tag hovering on the bottom right of the bubble */}
                        <div className="absolute -bottom-1 right-1 bg-gradient-to-r from-nexa-neon-cyan to-nexa-neon-violet text-white font-mono text-[9px] h-5 w-5 rounded-full flex items-center justify-center font-black border border-white/10 shadow-lg">
                          {index + 1}
                        </div>
                      </div>

                      {/* Info lines stacked below */}
                      <div className="mt-3.5 space-y-1 w-full">
                        <span className="text-[9px] font-mono text-nexa-neon-cyan uppercase tracking-widest block font-bold leading-none">
                          Rank #{index + 1}
                        </span>
                        
                        <h4 className="text-xs font-black text-white font-sans leading-tight tracking-tight hover:text-nexa-neon-cyan transition-colors cursor-pointer" onClick={() => scrollToSpecialist(emp.id)}>
                          {emp.name}
                        </h4>
                        
                        <p className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block truncate px-1">
                          {emp.role}
                        </p>

                        <div className="pt-1.5 border-t border-white/5 mt-1.5 text-[10px] font-mono">
                          <span className="text-white font-bold block">{stats.clients} Clients</span>
                          <span className="text-[9px] text-gray-500 block mt-0.5">
                            Yield: <span className="text-nexa-neon-orange font-bold">₹{stats.revenue}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Full-width bottom layout: Operational Specialist Columnar Board */}
            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6 bg-[#08080f]/80 w-full overflow-hidden" id="operational-specialist-board">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-nexa-neon-cyan" />
                    Operational Specialist Columnar Board
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-1 font-sans">
                    Live treatment list recorded securely under each expert's name at specified times.
                  </p>
                </div>
                {/* Search input */}
                <div className="relative min-w-[240px]">
                  <input
                    type="text"
                    placeholder="Search items, categories, clients..."
                    value={specialistSearch}
                    onChange={(e) => setSpecialistSearch(e.target.value)}
                    className="w-full bg-[#08080e] text-white text-xs pl-9 pr-4 py-2 rounded-xl border border-white/5 focus:outline-none focus:border-nexa-neon-orange font-mono"
                  />
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
                </div>
              </div>

              {/* Specialist cards responsive grid / row layout */}
              <div 
                className={`flex flex-row gap-6 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory w-full ${
                  employees.filter(emp => emp.name.toLowerCase().includes(specialistSearch.toLowerCase())).length <= 2 
                    ? "justify-center" 
                    : "justify-start"
                } scrollbar-thin scrollbar-thumb-white/10`}
              >
                {employees
                  .filter(emp => emp.name.toLowerCase().includes(specialistSearch.toLowerCase()))
                  .map((emp) => {
                    const stats = getEmployeeStats(emp.id, timeframe);
                    const isSelected = selectedSpecialistId === emp.id;
                    
                    // Filter bookings for this employee dynamically
                    const empBookings = mappedBookings.filter(b => b.assignedEmployeeId === emp.id || b.assignedEmployeeName === emp.name);
                    const dailyEmpBookings = empBookings
                      .filter(b => b.date === todayStr)
                      .sort((a, b) => {
                        // Sort by ID descending (newer bookings have higher ID)
                        const idComp = b.id.localeCompare(a.id);
                        if (idComp !== 0) return idComp;
                        
                        // Parse and sort by time descending
                        const parseTimeToMinutes = (tStr: string) => {
                          if (!tStr) return 0;
                          const tPart = tStr.split(" ")[0];
                          let [hrs, mins] = tPart.split(":").map(Number);
                          if (tStr.toUpperCase().includes("PM") && hrs < 12) hrs += 12;
                          if (tStr.toUpperCase().includes("AM") && hrs === 12) hrs = 0;
                          return hrs * 60 + mins;
                        };
                        return parseTimeToMinutes(b.time) - parseTimeToMinutes(a.time);
                      });

                    return (
                      <div 
                        key={emp.id}
                        id={`specialist-card-${emp.id}`}
                        className={`p-5 rounded-xl border transition-all duration-500 relative flex flex-col justify-between w-[285px] sm:w-[320px] shrink-0 snap-center min-h-[420px] ${
                          isSelected 
                            ? "border-nexa-neon-orange bg-nexa-neon-orange/[0.03] ring-2 ring-nexa-neon-orange/20 scale-[1.01] shadow-[0_0_20px_rgba(249,115,22,0.15)]" 
                            : "border-white/5 hover:border-white/10 bg-white/[0.01]"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-nexa-neon-orange to-nexa-neon-violet" />
                        )}

                        <div>
                          {/* Header: Name & Role */}
                          <div className="flex items-center gap-3">
                            {renderBlackCartoonAvatar(emp.name)}
                            <div>
                              <h4 className="text-sm font-bold text-white font-display tracking-tight leading-snug">{emp.name}</h4>
                              <span className="text-[9px] font-mono text-nexa-neon-orange uppercase tracking-wider block font-semibold">{emp.role}</span>
                            </div>
                          </div>

                          {/* Specialization */}
                          <p className="text-[10px] text-gray-500 mt-2.5 font-sans italic leading-relaxed line-clamp-1 border-t border-white/5 pt-1.5">
                            Spec: {emp.specialization}
                          </p>

                          {/* Live clinical treatments list */}
                          <div className="space-y-1.5 my-4 overflow-y-auto max-h-[140px] pr-1 scrollbar-thin scrollbar-thumb-white/5">
                            {dailyEmpBookings.length > 0 ? (
                              dailyEmpBookings.map((b) => (
                                <div key={b.id} className="p-2 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between text-[10px] font-mono">
                                  <div className="truncate max-w-[130px]">
                                    <span className="text-white block font-sans font-medium truncate">{b.customerName}</span>
                                    <span className="text-gray-500 text-[8px] block truncate">{b.services.join(", ")}</span>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="text-nexa-neon-orange font-bold block">₹{b.amount}</span>
                                    <span className="text-[8px] text-gray-500 block">{b.time}</span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="flex flex-col items-center justify-center py-4 bg-white/[0.01] rounded-lg border border-dashed border-white/5 text-center my-2 h-[80px]">
                                <span className="text-[10px] font-mono font-bold text-gray-400 block uppercase">No Active Records</span>
                                <span className="text-[8px] font-mono text-gray-600 uppercase mt-0.5">No active clinical logs.</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Footer: Stats */}
                        <div>
                          {/* Stats Block */}
                          <div className="grid grid-cols-2 gap-3 bg-black/40 p-2.5 rounded-xl border border-white/5 text-center text-[10px] font-mono">
                            <div>
                              <span className="text-[8px] text-gray-500 block uppercase font-bold">Attempted</span>
                              <strong className="text-white text-xs block mt-0.5 font-bold">{stats.clients}</strong>
                            </div>
                            <div>
                              <span className="text-[8px] text-gray-500 block uppercase font-bold">Earned</span>
                              <strong className="text-nexa-neon-orange text-xs block mt-0.5 font-bold">₹{stats.revenue}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

        </section>
      )}

      {/* --- TAB 2: WHATSAPP BROADCAST ALERTS --- */}
      {activeHubTab === "employees" && (
        <section className="space-y-6 animate-fade-in" id="owner-whatsapp-gateway-section">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                WhatsApp Live Broadcast Gateway
              </h3>
              <p className="text-xs text-gray-500 font-sans mt-0.5">Real-time stream of client treatment bookings and direct WhatsApp signals routed instantly to the owner.</p>
            </div>
            
            {/* Live Gateway Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded-xl shrink-0 self-start sm:self-center">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Gateway Connected (Active)
            </div>
          </div>

          {/* Configuration Widget & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Phone Number Configuration */}
            <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4 col-span-1 lg:col-span-2">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block font-bold">📡 TARGET DISPATCH DESTINATION</span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-2.5 text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    +91
                  </div>
                  <input
                    type="tel"
                    placeholder="8209925051"
                    defaultValue="8209925051"
                    className="w-full bg-[#08080f] text-white text-xs pl-16 pr-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-emerald-500/40 font-mono font-bold"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => alert("Primary dispatch target number locked successfully. All automated triggers will route here.")}
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono uppercase tracking-widest font-bold rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.15)] flex items-center justify-center gap-1.5 shrink-0"
                >
                  <CheckCircle2 className="w-4 h-4" /> Save Target
                </button>
              </div>
              <p className="text-[10px] text-gray-500 font-sans italic">
                💡 Custom bookings, direct treatments, and walk-in flows are routed directly to this secure line with one-tap WhatsApp integration.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block font-bold">STREAM TELEMETRY</span>
                <div className="text-3xl font-bold text-white mt-2 font-mono">
                  {bookings.length} <span className="text-xs text-gray-400 font-normal">dispatched</span>
                </div>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded-lg mt-3 flex items-center justify-between">
                <span>Loss Rate: 0.00%</span>
                <span>Latency: 12ms</span>
              </div>
            </div>
          </div>

          {/* Real-time Decrypted Signal Cards arranged in a 3-column grid */}
          <div className="space-y-6 pt-4">
            <h5 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold text-center flex items-center justify-center gap-2 border-b border-white/5 pb-3">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              📜 Live Decrypted Booking Signal Stream
            </h5>

            {bookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="whatsapp-alerts-grid">
                {[...bookings]
                  .sort((a, b) => {
                    // Primary sort: Date descending
                    const dateComp = b.date.localeCompare(a.date);
                    if (dateComp !== 0) return dateComp;
                    
                    // Secondary sort: parse and sort by time descending
                    const parseTimeToMinutes = (tStr: string) => {
                      if (!tStr) return 0;
                      const tPart = tStr.split(" ")[0];
                      let [hrs, mins] = tPart.split(":").map(Number);
                      if (tStr.toUpperCase().includes("PM") && hrs < 12) hrs += 12;
                      if (tStr.toUpperCase().includes("AM") && hrs === 12) hrs = 0;
                      return hrs * 60 + mins;
                    };
                    const timeComp = parseTimeToMinutes(b.time) - parseTimeToMinutes(a.time);
                    if (timeComp !== 0) return timeComp;
                    
                    // Tertiary sort: ID descending
                    return b.id.localeCompare(a.id);
                  })
                  .slice(0, 12)
                  .map((b) => (
                  <div key={b.id} className="glass-card p-5 rounded-2xl border border-emerald-500/15 bg-[#040605]/80 space-y-4 animate-fade-in flex flex-col justify-between shadow-lg shadow-emerald-950/10 hover:border-emerald-500/30 transition-all duration-300">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-emerald-500/10 pb-2">
                        <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          SIGNAL VERIFIED
                        </span>
                        <span className="text-[9px] font-mono text-gray-500">{b.date} @ {b.time}</span>
                      </div>

                      <div className="text-[11px] font-mono text-gray-300 space-y-1 bg-[#050a07]/60 p-3.5 rounded-xl border border-emerald-900/10">
                        <div className="text-emerald-400 font-bold border-b border-white/[0.03] pb-1 mb-1 font-sans text-xs flex items-center justify-between">
                          <span>NEXA HAIR STUDIO</span>
                          <span className="text-[9px] font-mono text-gray-500 font-normal">ID: {b.id}</span>
                        </div>
                        <div><span className="text-gray-500">Customer:</span> <strong className="text-white">{b.customerName}</strong></div>
                        <div><span className="text-gray-500">Specialist:</span> <strong className="text-nexa-neon-cyan">{b.assignedEmployeeName}</strong></div>
                        <div><span className="text-gray-500">Amount:</span> <strong className="text-nexa-neon-orange">₹{b.amount}</strong></div>
                        <div><span className="text-gray-500">Method:</span> <strong className="text-white">{b.paymentMethod === "Online Payment" ? "Online" : "Cash"}</strong></div>
                        <div><span className="text-gray-500">Status:</span> <strong className="text-emerald-400">{b.paymentStatus || (b.status === "Completed" ? "Paid" : "Pending")}</strong></div>
                        
                        <div className="pt-1.5 mt-1.5 border-t border-white/[0.03]">
                          <span className="text-gray-500 block text-[9px]">SELECTED TREATMENTS:</span>
                          <div className="space-y-0.5 mt-1 text-[10px] text-emerald-200">
                            {b.services.map((s, idx) => (
                              <div key={idx} className="truncate">• {s}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 text-[9px] font-mono text-gray-500 border-t border-white/5">
                      <span>SECURE STREAM</span>
                      <span className="text-emerald-400/80 font-bold uppercase">Synced Cloud</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500 glass-card rounded-2xl border border-white/5">
                Zero booking notification streams recorded.
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- TAB 3: LIVE DATABASE EXPLORER --- */}
      {false && (
        <section className="space-y-6" id="owner-db-explorer-section">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h3 className="text-lg font-bold font-display text-white">Database Explorer</h3>
              <p className="text-xs text-gray-500 font-sans">Query and prune live Atlas schemas from secure collections in real time.</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search database indices..."
                value={dbSearch}
                onChange={(e) => setDbSearch(e.target.value)}
                className="w-full bg-[#08080e] text-white text-xs pl-9 pr-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-nexa-neon-orange"
              />
              <Search className="absolute left-3 top-3.5 w-3.5 h-3.5 text-gray-500" />
            </div>
          </div>

          {/* 6. Professional Database Monitoring Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="database-monitoring-board">
            
            <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                <Server className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-gray-500 block uppercase">Server Status</span>
                <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Connected
                </div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-nexa-neon-orange/10 flex items-center justify-center text-nexa-neon-orange border border-nexa-neon-orange/20 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-gray-500 block uppercase">Total Schema Records</span>
                <div className="text-sm font-bold text-white mt-0.5">
                  {bookings.length + employees.length + customers.length + payments.length + history.length} Documents
                </div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-nexa-neon-cyan/10 flex items-center justify-center text-nexa-neon-cyan border border-nexa-neon-cyan/20 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-gray-500 block uppercase">Connection Latency</span>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">
                  24ms (Excellent)
                </div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-nexa-neon-violet/10 flex items-center justify-center text-nexa-neon-violet border border-nexa-neon-violet/20 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-gray-500 block uppercase">Collection Health</span>
                <div className="text-sm font-bold text-white mt-0.5">
                  100% Operational
                </div>
              </div>
            </div>

          </div>

          {/* Recent booking activity monitor */}
          <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-3">
            <h5 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">⚡ Recent Database Activity</h5>
            <div className="divide-y divide-white/5">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-center justify-between py-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-nexa-neon-orange font-bold">{act.id}</span>
                    <span className="text-gray-300">New Booking for <strong className="text-white font-sans">{act.client}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <span className="text-gray-500 font-mono">{act.time}</span>
                    <span className="text-white font-mono font-bold">₹{act.amount}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono uppercase ${
                      act.status === "Completed" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {act.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table Tab Selector */}
          <div className="flex flex-wrap gap-1 border-b border-white/5 pb-2">
            {[
              { id: "customers", name: "CUSTOMERS TABLE", count: customers.length },
              { id: "bookings", name: "BOOKINGS TABLE", count: bookings.length },
              { id: "employees", name: "EMPLOYEE TABLE", count: employees.length },
              { id: "history", name: "SERVICE HISTORY TABLE", count: history.length },
              { id: "payments", name: "PAYMENT TABLE", count: payments.length }
            ].map((tbl) => (
              <button
                key={tbl.id}
                onClick={() => {
                  setExplorerTable(tbl.id as any);
                  setDbSearch("");
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono tracking-wider transition-all border cursor-pointer ${
                  explorerTable === tbl.id
                    ? "bg-[#10101b] text-nexa-neon-orange border-nexa-neon-orange/20 font-bold"
                    : "bg-white/[0.01] text-gray-400 border-transparent hover:text-white"
                }`}
              >
                {tbl.name} <span className="text-[9px] bg-white/5 px-1 py-0.5 rounded text-gray-300 ml-1">{tbl.count}</span>
              </button>
            ))}
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto w-full glass-card rounded-2xl border border-white/5">
            <table className="w-full text-left border-collapse text-xs">
              
              {/* --- CUSTOMERS TABLE HEADER --- */}
              {explorerTable === "customers" && (
                <>
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-mono text-[10px] uppercase tracking-wider">
                      <th className="p-4">Customer ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Phone Coordinates</th>
                      <th className="p-4">Email</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExplorerData.map((row: any) => (
                      <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-all">
                        <td className="p-4 font-mono text-gray-400">{row.id}</td>
                        <td className="p-4 text-white font-bold font-sans">{row.name}</td>
                        <td className="p-4 text-gray-300 font-mono">{row.phone}</td>
                        <td className="p-4 text-gray-400">{row.email}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => onDeleteRow("customers", row.id)} className="text-gray-500 hover:text-red-400 cursor-pointer">
                            <Trash2 className="w-4 h-4 ml-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {/* --- BOOKINGS TABLE HEADER --- */}
              {explorerTable === "bookings" && (
                <>
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-mono text-[10px] uppercase tracking-wider">
                      <th className="p-4">Booking ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Selected Treatments</th>
                      <th className="p-4">Settled Amount</th>
                      <th className="p-4">Payment Method</th>
                      <th className="p-4">Chronos Space</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExplorerData.map((row: any) => (
                      <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-all">
                        <td className="p-4 font-mono text-nexa-neon-orange font-bold">{row.id}</td>
                        <td className="p-4">
                          <div className="font-bold text-white">{row.customerName}</div>
                          <div className="text-[10px] text-gray-500 font-mono">{row.customerPhone}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {row.services.map((s: string, i: number) => (
                              <span key={i} className="bg-white/5 px-1.5 py-0.5 rounded text-[10px] text-gray-300">{s}</span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 font-mono text-white font-bold">₹{row.amount}</td>
                        <td className="p-4 font-mono text-gray-300">{row.paymentMethod}</td>
                        <td className="p-4 font-mono">
                          <div className="text-gray-300">{row.date} @ {row.time}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded font-mono text-[9px] ${
                            row.status === "Completed" ? "bg-green-500/15 text-green-400" :
                            row.status === "Cancelled" ? "bg-red-500/15 text-red-400" :
                            "bg-amber-500/15 text-amber-400"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => onDeleteRow("bookings", row.id)} className="text-gray-500 hover:text-red-400 cursor-pointer">
                            <Trash2 className="w-4 h-4 ml-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {/* --- EMPLOYEES TABLE HEADER --- */}
              {explorerTable === "employees" && (
                <>
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-mono text-[10px] uppercase tracking-wider">
                      <th className="p-4">Employee ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Role Title</th>
                      <th className="p-4">Specialization Matrix</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExplorerData.map((row: any) => (
                      <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-all">
                        <td className="p-4 font-mono text-gray-400">{row.id}</td>
                        <td className="p-4 text-white font-bold">{row.name}</td>
                        <td className="p-4 text-nexa-neon-orange font-mono">{row.role}</td>
                        <td className="p-4 text-gray-400">{row.specialization}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => onDeleteRow("employees", row.id)} className="text-gray-500 hover:text-red-400 cursor-pointer">
                            <Trash2 className="w-4 h-4 ml-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {/* --- HISTORY TABLE HEADER --- */}
              {explorerTable === "history" && (
                <>
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-mono text-[10px] uppercase tracking-wider">
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Service Performed</th>
                      <th className="p-4">Employee Name</th>
                      <th className="p-4">Timestamp Date</th>
                      <th className="p-4">Settled Amount</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExplorerData.map((row: any) => (
                      <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-all">
                        <td className="p-4 text-white font-bold">{row.customer}</td>
                        <td className="p-4 text-gray-300">{row.service}</td>
                        <td className="p-4 text-nexa-neon-violet font-semibold">{row.employee}</td>
                        <td className="p-4 font-mono text-gray-400">{row.date}</td>
                        <td className="p-4 font-mono text-white font-bold">₹{row.amount}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => onDeleteRow("history", row.id)} className="text-gray-500 hover:text-red-400 cursor-pointer">
                            <Trash2 className="w-4 h-4 ml-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {/* --- PAYMENT TABLE HEADER --- */}
              {explorerTable === "payments" && (
                <>
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-mono text-[10px] uppercase tracking-wider">
                      <th className="p-4">Transaction ID</th>
                      <th className="p-4">Booking Link</th>
                      <th className="p-4">Payment Mode</th>
                      <th className="p-4">Settlement Status</th>
                      <th className="p-4">Amount Collected</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExplorerData.map((row: any) => (
                      <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-all">
                        <td className="p-4 font-mono text-gray-400">{row.id}</td>
                        <td className="p-4 font-mono text-nexa-neon-cyan font-semibold">{row.bookingId}</td>
                        <td className="p-4 font-mono text-gray-300">{row.paymentMode}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded font-mono text-[9px] ${
                            row.status === "Paid" ? "bg-green-500/15 text-green-400" : "bg-amber-500/15 text-amber-400"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-white font-bold">₹{row.amount}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => onDeleteRow("payments", row.id)} className="text-gray-500 hover:text-red-400 cursor-pointer">
                            <Trash2 className="w-4 h-4 ml-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

            </table>

            {filteredExplorerData.length === 0 && (
              <div className="py-12 text-center text-gray-500 font-sans">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                Zero indices match query "{dbSearch}"
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- TAB 4: WHATSAPP AUDIT TRAIL --- */}
      {false && (
        <section className="space-y-6" id="owner-whatsapp-logs-section">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <h3 className="text-lg font-bold font-display text-white">WhatsApp Notification Center</h3>
              <p className="text-xs text-gray-500 font-sans mt-0.5">Real-time telemetry of message signals routed automatically via secure channel gateway.</p>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded-lg">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              WhatsApp Alerts Connected
            </div>
          </div>

          {/* 8. WhatsApp Alert Cards Layout (3 cards in one row on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="whatsapp-alerts-grid">
            
            {/* Alert Card 1: New Booking */}
            <div className="glass-card p-5 rounded-2xl border border-nexa-neon-orange/20 bg-gradient-to-br from-nexa-neon-orange/[0.02] to-transparent relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono tracking-wider bg-nexa-neon-orange/15 text-nexa-neon-orange border border-nexa-neon-orange/25 uppercase font-bold">
                    Booking Signal
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">12:43 PM</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-3 font-display">New Booking Alert</h4>
                <p className="text-xs text-gray-400 mt-1.5 leading-normal">
                  Customer booking received. Assigned to certified specialist.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-4 text-[10px] font-mono">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                </span>
                <span className="text-gray-500">Secure Stream</span>
              </div>
            </div>

            {/* Alert Card 2: Payment */}
            <div className="glass-card p-5 rounded-2xl border border-nexa-neon-cyan/20 bg-gradient-to-br from-nexa-neon-cyan/[0.02] to-transparent relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono tracking-wider bg-nexa-neon-cyan/15 text-nexa-neon-cyan border border-nexa-neon-cyan/25 uppercase font-bold">
                    Payment Gateway
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">12:45 PM</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-3 font-display">Payment Alert</h4>
                <p className="text-xs text-gray-400 mt-1.5 leading-normal">
                  Invoice transaction verified. Funds deposited to secure vault.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-4 text-[10px] font-mono">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                </span>
                <span className="text-gray-500">Vault Secure</span>
              </div>
            </div>

            {/* Alert Card 3: Treatment Complete */}
            <div className="glass-card p-5 rounded-2xl border border-nexa-neon-violet/20 bg-gradient-to-br from-nexa-neon-violet/[0.02] to-transparent relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono tracking-wider bg-nexa-neon-violet/15 text-nexa-neon-violet border border-nexa-neon-violet/25 uppercase font-bold">
                    Work Progress
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">01:00 PM</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-3 font-display">Treatment Complete</h4>
                <p className="text-xs text-gray-400 mt-1.5 leading-normal">
                  Prestige service completed. Satisfaction metrics dispatched.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-4 text-[10px] font-mono">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                </span>
                <span className="text-gray-500">Auto SLA Ok</span>
              </div>
            </div>

          </div>

          {/* Full audit trail stream list */}
          <div className="space-y-4 max-w-2xl mx-auto pt-4">
            <h5 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold text-center">📜 Live Audited Notification Stream</h5>
            
            {bookings.length > 0 ? (
              [...bookings].slice(0, 8).map((b) => (
                <div key={b.id} className="glass-card p-5 rounded-2xl border border-emerald-500/15 bg-[#040605]/80 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      ENCRYPTED SIGNAL VERIFIED
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">{b.date} @ {b.time}</span>
                  </div>

                  <pre className="font-mono text-xs text-emerald-100/90 whitespace-pre-wrap leading-relaxed bg-[#050a07] p-4 rounded-xl border border-white/5">
                    {(() => {
                      const formattedServices = b.services.map(s => `• ${s}`).join("\n");
                      const paymentMethodLabel = b.paymentMethod === "Online Payment" ? "Online" : "Cash";
                      const paymentStatusLabel = b.paymentStatus || (b.status === "Completed" ? "Paid" : "Pending");
                      const bookingCreatedStr = b.createdAt || `${b.date}\n${b.time}`;
                      return `📢 NEXA HAIR STUDIO\n\n✅ New Booking Received\n\nBooking ID:\n${b.id}\n\nCustomer:\n${b.customerName}\n\nSelected Services:\n${formattedServices}\n\nAssigned Specialist:\n${b.assignedEmployeeName}\n\nPayment Method:\n${paymentMethodLabel}\n\nPayment Status:\n${paymentStatusLabel}\n\nTotal Amount:\n₹${b.amount}\n\nStatus:\nConfirmed`;
                    })()}
                  </pre>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-gray-500 glass-card rounded-2xl border border-white/5">
                Zero notification signals. Dispatch premium checkout entries in the Experience Hub to record live flows.
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- MODAL: RECRUIT SPECIALIST --- */}
      {isAddEmpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-card max-w-sm w-full rounded-2xl border border-white/10 p-6 bg-[#0a0a0f] relative">
            <button 
              onClick={() => setIsAddEmpOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-display text-white mb-2">Recruit Specialist</h3>
            <p className="text-xs text-gray-500 mb-4">Introduce a certified avant-garde artist to the local roster list.</p>
            
            <form onSubmit={handleRecruitSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Name Coordinates</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prateek Sen"
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  className="w-full bg-[#12121c] text-white text-xs px-3 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-nexa-neon-orange"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Girls Hair Specialist"
                  value={empRole}
                  onChange={(e) => setEmpRole(e.target.value)}
                  className="w-full bg-[#12121c] text-white text-xs px-3 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-nexa-neon-orange"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Artist Specialization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prism Glossing & Sculpture cuts"
                  value={empSpec}
                  onChange={(e) => setEmpSpec(e.target.value)}
                  className="w-full bg-[#12121c] text-white text-xs px-3 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-nexa-neon-orange"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Avatar Unsplash URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={empAvatar}
                  onChange={(e) => setEmpAvatar(e.target.value)}
                  className="w-full bg-[#12121c] text-white text-xs px-3 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-nexa-neon-orange"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-nexa-neon-orange to-nexa-neon-violet text-white text-xs font-mono font-bold tracking-widest uppercase rounded-lg transition-all cursor-pointer"
              >
                Recruit to Roster
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: LOG CASH WALK-IN --- */}
      {isWalkInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-card max-w-xl w-full rounded-2xl border border-white/10 p-6 bg-[#07070c] relative overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setIsWalkInOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-nexa-neon-orange animate-ping" />
              <h3 className="text-xl font-bold font-display text-white">Log Cash Walk-in Session</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">Instantly record and synchronize a physical cash customer session directly to MongoDB Atlas.</p>

            {walkInSuccessMsg ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono text-center space-y-2 py-8">
                <Check className="w-8 h-8 mx-auto text-emerald-400 animate-bounce" />
                <div className="font-bold text-sm">TRANSACTION SECURED</div>
                <p>{walkInSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleWalkInSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">Customer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kunal Sen"
                      value={walkInName}
                      onChange={(e) => setWalkInName(e.target.value)}
                      className="w-full bg-[#12121c] text-white text-xs px-3 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-nexa-neon-orange"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9812345678"
                      value={walkInPhone}
                      onChange={(e) => setWalkInPhone(e.target.value)}
                      className="w-full bg-[#12121c] text-white text-xs px-3 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-nexa-neon-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">Email Coordinates (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. user@nexa.com"
                      value={walkInEmail}
                      onChange={(e) => setWalkInEmail(e.target.value)}
                      className="w-full bg-[#12121c] text-white text-xs px-3 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-nexa-neon-orange"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">Assigned Specialist Artist *</label>
                    <select
                      value={walkInSpecialistId}
                      onChange={(e) => setWalkInSpecialistId(e.target.value)}
                      className="w-full bg-[#12121c] text-white text-xs px-3 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-nexa-neon-orange font-mono"
                    >
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Services multi-select checklists */}
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-2">Select Services *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 bg-[#0c0c14] border border-white/5 rounded-xl scrollbar-thin">
                    {DEFAULT_SERVICES.map((srv) => {
                      const isChecked = walkInSelectedServices.includes(srv.name);
                      return (
                        <div 
                          key={srv.id} 
                          onClick={() => handleServiceToggle(srv.name)}
                          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all border ${
                            isChecked 
                              ? "bg-nexa-neon-orange/10 border-nexa-neon-orange/20 text-white" 
                              : "border-transparent text-gray-400 hover:bg-white/[0.02]"
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-nexa-neon-orange shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 shrink-0" />
                          )}
                          <div className="text-[11px] leading-tight flex-1">
                            <span className="font-bold font-sans block">{srv.name}</span>
                            <span className="font-mono text-[9px] text-gray-500">₹{srv.price} · {srv.duration} mins</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">Chronos Time Slot</label>
                    <input
                      type="text"
                      placeholder="e.g. 02:00 PM"
                      value={walkInTime}
                      onChange={(e) => setWalkInTime(e.target.value)}
                      className="w-full bg-[#12121c] text-white text-xs px-3 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-nexa-neon-orange"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">Default Service Status</label>
                    <select
                      value={walkInStatus}
                      onChange={(e) => setWalkInStatus(e.target.value as any)}
                      className="w-full bg-[#12121c] text-white text-xs px-3 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-nexa-neon-orange font-mono"
                    >
                      <option value="Completed">Completed (Immediate Settlement)</option>
                      <option value="Upcoming">Upcoming (Active Slot Queue)</option>
                    </select>
                  </div>
                </div>

                {/* Subtotal preview block */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">Total Settlement Subtotal:</span>
                  <span className="text-lg font-bold text-nexa-neon-orange">
                    ₹{walkInSelectedServices.reduce((sum, sName) => {
                      const s = DEFAULT_SERVICES.find(srv => srv.name === sName);
                      return sum + (s ? s.price : 0);
                    }, 0).toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-nexa-neon-orange to-nexa-neon-violet text-white text-xs font-mono font-bold tracking-widest uppercase rounded-lg transition-all cursor-pointer"
                >
                  Confirm Walk-in Allocation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- CUSTOM SPECIALIST DISMISS CONFIRMATION POPUP --- */}
      {deletingEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" id="delete-specialist-modal">
          <div className="glass-card max-w-sm w-full p-6 rounded-3xl border border-white/5 bg-[#030307]/95 shadow-2xl relative space-y-5">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500 animate-pulse" />
            
            <div className="space-y-2 text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />
              </div>
              <h3 className="text-base font-bold font-display text-white tracking-tight uppercase">Confirm Dismissal</h3>
              <p className="text-[11px] font-mono text-gray-400">
                Are you absolutely sure you want to dismiss <span className="text-red-400 font-bold">{deletingEmployee.name}</span>?
              </p>
            </div>

            <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 text-center text-[10px] font-mono text-gray-500 space-y-1">
              <div>Role: <span className="text-white font-medium">{deletingEmployee.role}</span></div>
              <div>Spec: <span className="text-white font-medium">{deletingEmployee.specialization}</span></div>
              <div className="pt-1.5 border-t border-white/5 mt-1.5 text-red-400/80 uppercase tracking-wider font-bold">
                ⚠️ All active slots & historical logs for this expert will be permanently archived.
              </div>
            </div>

            {/* Passcode Authorization Field */}
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block text-center">
                Enter Passcode to Authorize Delete:
              </label>
              <input
                type="password"
                maxLength={4}
                placeholder="••••"
                value={dismissPasscode}
                onChange={(e) => {
                  setDismissError(false);
                  setDismissPasscode(e.target.value.replace(/\D/g, ""));
                }}
                className="w-full bg-[#08080f] border border-white/10 hover:border-white/20 rounded-xl py-2 px-3 text-center text-white tracking-widest font-mono text-sm focus:outline-none focus:border-red-500/50"
              />
              {dismissError && (
                <span className="text-[9px] font-mono text-red-500 font-bold block text-center animate-pulse">
                  ❌ INCORRECT PASSCODE. ACCESS DENIED!
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setDeletingEmployee(null);
                  setDismissPasscode("");
                  setDismissError(false);
                }}
                className="py-2.5 rounded-xl text-xs font-mono border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-gray-400 hover:text-white transition-all cursor-pointer font-bold"
              >
                No, Keep
              </button>
              <button
                type="button"
                onClick={() => {
                  if (dismissPasscode === "0000") {
                    onDeleteRow("employees", deletingEmployee.id);
                    setDeletingEmployee(null);
                    setDismissPasscode("");
                    setDismissError(false);
                  } else {
                    setDismissError(true);
                  }
                }}
                className="py-2.5 rounded-xl text-xs font-mono border border-red-500/20 bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:border-red-500/40 transition-all cursor-pointer font-bold"
              >
                Yes, Dismiss ❌
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

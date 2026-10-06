import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  History, 
  FileText, 
  Compass, 
  Star, 
  Settings, 
  RefreshCw, 
  Check, 
  X,
  Plus,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { Booking, Employee, Customer, ServiceHistory, PaymentTransaction } from "../types";

interface ClientCommandProps {
  bookings: Booking[];
  history: ServiceHistory[];
  employees: Employee[];
  onUpdateBookingStatus: (bookingId: string, status: "Upcoming" | "Completed" | "Cancelled", feedback?: string, rating?: number, finalAmount?: number, assignedEmpId?: string) => void;
  onRescheduleBooking: (bookingId: string, date: string, time: string) => void;
}

export default function NexaClientCommand({ 
  bookings, 
  history, 
  employees, 
  onUpdateBookingStatus, 
  onRescheduleBooking 
}: ClientCommandProps) {
  // Local state
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");
  const [selectedBookingForInvoice, setSelectedBookingForInvoice] = useState<Booking | null>(null);
  
  // Reschedule state
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // Complete booking state
  const [completingBooking, setCompletingBooking] = useState<Booking | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [completionEmpId, setCompletionEmpId] = useState("");
  const [completionAmount, setCompletionAmount] = useState<number>(0);

  // Filter bookings to show ONLY today's active bookings
  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingBookings = bookings
    .filter(b => b.status === "Upcoming" && b.date === todayStr)
    .sort((a, b) => {
      // Primary sort: ID descending (since higher ID means newer booking)
      const idComp = b.id.localeCompare(a.id);
      if (idComp !== 0) return idComp;
      
      // Secondary sort: parse and sort by time descending
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

  // Sort history reverse-chronologically (most recent first)
  const sortedHistory = [...history].sort((a, b) => {
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date);
    }
    const timeA = a.time || "";
    const timeB = b.time || "";
    if (timeA !== timeB) {
      return timeB.localeCompare(timeA);
    }
    return (b.id || "").localeCompare(a.id || "");
  });
  
  // Handlers
  const handleCancelClick = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this luxury appointment slot? This will release the artist resource.")) {
      onUpdateBookingStatus(bookingId, "Cancelled");
    }
  };

  const startReschedule = (booking: Booking) => {
    setRescheduleBookingId(booking.id);
    setNewDate(booking.date);
    setNewTime(booking.time);
  };

  const submitReschedule = () => {
    if (!newDate || !newTime) {
      alert("Please specify valid date and time parameters.");
      return;
    }
    onRescheduleBooking(rescheduleBookingId!, newDate, newTime);
    setRescheduleBookingId(null);
  };

  const startCompletion = (booking: Booking) => {
    setCompletingBooking(booking);
    setCompletionEmpId(booking.assignedEmployeeId);
    setCompletionAmount(booking.amount);
    setFeedbackText("");
    setFeedbackRating(5);
  };

  const submitCompletion = () => {
    if (!completionEmpId) {
      alert("Please confirm the professional stylist who executed this service.");
      return;
    }
    onUpdateBookingStatus(
      completingBooking!.id,
      "Completed",
      feedbackText,
      feedbackRating,
      Number(completionAmount),
      completionEmpId
    );
    setCompletingBooking(null);
  };

  return (
    <div className="space-y-8 py-6" id="nexa-client-command-container">
      
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="px-2.5 py-1 rounded text-[10px] font-mono tracking-wider bg-nexa-neon-orange/15 text-nexa-neon-orange border border-nexa-neon-orange/20 uppercase inline-block animate-blur-in-slow">
            Client Terminal v2.4
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mt-3 animate-blur-in-slow">Prestige Client Command</h2>
          <p className="text-gray-400 text-sm mt-1 animate-blur-in-delayed">Review active time-slots, summon digital invoices, and register treatment achievements.</p>
        </div>

        {/* Custom Tab Toggles */}
        <div className="flex bg-white/[0.02] border border-white/5 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wide transition-all ${
              activeTab === "upcoming"
                ? "bg-gradient-to-r from-nexa-neon-orange to-nexa-neon-violet text-white shadow-md shadow-nexa-neon-orange/10"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🛰️ Scheduled Slots ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wide transition-all ${
              activeTab === "history"
                ? "bg-gradient-to-r from-nexa-neon-orange to-nexa-neon-violet text-white shadow-md shadow-nexa-neon-orange/10"
                : "text-gray-400 hover:text-white"
            }`}
          >
            📜 Session History ({history.length})
          </button>
        </div>
      </div>

      {activeTab === "upcoming" ? (
        <section className="space-y-6" id="client-upcoming-appointments-section">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-display text-white">Your Upcoming Treatments</h3>
            <span className="text-xs font-mono text-gray-500">Live Server Connected</span>
          </div>

          {upcomingBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="client-command-grid">
              {upcomingBookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="glass-card p-4 rounded-xl border border-white/5 relative overflow-hidden flex flex-col justify-between"
                  id={`booking-card-${booking.id}`}
                >
                  {/* Status Indicator */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    ACTIVE SLOT
                  </div>

                  {/* Booking Identity */}
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="text-[9px] font-mono text-gray-500 block uppercase">ID REFERENCE</span>
                      <span className="font-mono text-xs text-nexa-neon-orange font-bold">{booking.id}</span>
                    </div>

                    <div>
                      <h4 className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Client Name</h4>
                      <div className="text-sm font-bold text-white mt-0.5">{booking.customerName}</div>
                    </div>

                    <div>
                      <h4 className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Mobile Number</h4>
                      <div className="text-xs text-gray-300 font-mono mt-0.5">{booking.customerPhone}</div>
                    </div>

                    <div>
                      <h4 className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Requested Services</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {booking.services.map((srv, index) => (
                          <span key={index} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-[9px] text-white font-mono">
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <h5 className="text-[9px] font-mono text-gray-500 uppercase">Assigned Stylist</h5>
                        <div className="text-xs font-bold text-gray-200 mt-0.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-nexa-neon-violet"></span>
                          {booking.assignedEmployeeName}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-[9px] font-mono text-gray-500 uppercase font-bold">Chronos Slot</h5>
                        <div className="text-[10px] font-mono text-gray-200 mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-nexa-neon-orange shrink-0" />
                          <span>{booking.date} @ {booking.time}</span>
                        </div>
                      </div>
                    </div>

                    {booking.createdAt && (
                      <div className="pt-1.5 border-t border-white/5">
                        <span className="text-[8px] font-mono text-gray-500 block uppercase">Booking Created</span>
                        <div className="text-[9.5px] text-gray-400 font-mono mt-0.5 leading-tight">{booking.createdAt}</div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-white/5">
                      <div>
                        <h5 className="text-[9px] font-mono text-gray-500 uppercase">Payment Method</h5>
                        <div className="text-[11px] text-gray-300 font-mono flex items-center gap-1 mt-0.5">
                          <CreditCard className="w-3 h-3.5 text-nexa-neon-cyan shrink-0" />
                          {booking.paymentMethod}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-[9px] font-mono text-gray-500 uppercase">Settlement Index</h5>
                        <span className={`inline-block text-[9px] font-mono px-1.5 py-0.5 rounded mt-0.5 ${
                          booking.paymentStatus === "Paid" 
                            ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {booking.paymentStatus === "Paid" ? "CONFIRMED PAID" : "PENDING CASH"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center glass-card rounded-2xl border border-white/5 max-w-xl mx-auto">
              <Compass className="w-16 h-16 text-gray-600 mx-auto animate-spin-slow" />
              <h3 className="text-xl font-bold font-display text-white mt-4">Zero Active Assignments</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mt-2 font-sans">
                You currently have no upcoming services reserved in our ledger. Travel back to the Experience Hub to book premium sessions.
              </p>
            </div>
          )}
        </section>
      ) : (
        /* Client History List */
        <section className="space-y-6" id="client-service-history-section">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-display text-white">Archival Complete Logs</h3>
            <span className="text-xs font-mono text-gray-500">Historical Ledger</span>
          </div>

          {sortedHistory.length > 0 ? (
            <div className="space-y-4">
              {sortedHistory.map((hist) => (
                <div 
                  key={hist.id} 
                  className="glass-card p-3.5 sm:p-4 rounded-xl border-l-4 border-l-[#fa4a0c] border-y border-r border-white/5 bg-[#0b0b14]/50 flex flex-col gap-3 relative overflow-hidden"
                >
                  {/* Top Header: Treatment & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2.5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono tracking-wider font-bold ${
                        hist.status === "Cancelled" 
                          ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}>
                        {hist.status === "Cancelled" ? "CANCELLED SERVICE" : "COMPLETED SERVICE"}
                      </span>
                      <h4 className="text-sm font-bold text-white font-display">{hist.service}</h4>
                    </div>
                  </div>

                  {/* Main Details Grid - Exact structure matching screenshot */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5 py-1 items-center">
                    {/* Column 1: Customer Name */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0">
                        <User className="w-3.5 h-3.5 text-nexa-neon-orange" />
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-gray-500 block uppercase tracking-wider">Client</span>
                        <span className="text-xs font-bold text-white font-display capitalize block truncate max-w-[150px]" title={hist.customer}>
                          {hist.customer}
                        </span>
                      </div>
                    </div>

                    {/* Column 2: Booking Date */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-nexa-neon-cyan" />
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-gray-500 block uppercase tracking-wider">Date</span>
                        <span className="text-xs font-bold font-mono text-white block">
                          {hist.date}
                        </span>
                      </div>
                    </div>

                    {/* Column 3: Booking Time */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-gray-500 block uppercase tracking-wider">Time</span>
                        <span className="text-xs font-bold font-mono text-white block">
                          {hist.time || "12:00 PM"}
                        </span>
                      </div>
                    </div>

                    {/* Column 4: Service Provider */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-gray-500 block uppercase tracking-wider">Specialist</span>
                        <span className="text-xs font-bold text-white font-display block truncate max-w-[150px]" title={hist.employee}>
                          {hist.employee}
                        </span>
                      </div>
                    </div>

                    {/* Column 5: Payment Method */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0">
                        <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-gray-500 block uppercase tracking-wider">Payment</span>
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase mt-0.5 ${
                          hist.paymentMethod && hist.paymentMethod.toLowerCase().includes("cash")
                            ? "border border-yellow-500/20 bg-yellow-500/5 text-yellow-500"
                            : "border border-emerald-500/20 bg-emerald-500/5 text-emerald-500"
                        }`}>
                          {hist.paymentMethod || "CASH"}
                        </span>
                      </div>
                    </div>

                    {/* Column 6: Total Paid */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#12121a] border border-white/5 flex items-center justify-center shrink-0">
                        <span className="text-[#fa4a0c] font-bold text-xs font-mono">₹</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-gray-500 block uppercase tracking-wider">Total Paid</span>
                        <span className="text-xs font-bold font-mono text-[#fa4a0c] block">
                          ₹{hist.amount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>


                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center glass-card rounded-2xl border border-white/5 max-w-md mx-auto">
              <History className="w-12 h-12 text-gray-600 mx-auto" />
              <h3 className="text-lg font-bold font-display text-white mt-4">No Session History Available</h3>
              <p className="text-sm text-gray-400 mt-2 font-sans">No completed service records were discovered in the database.</p>
            </div>
          )}
        </section>
      )}

      {/* Invoice Modal Overlay */}
      {selectedBookingForInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-card max-w-md w-full rounded-2xl border border-nexa-neon-cyan/20 overflow-hidden shadow-2xl p-6 bg-[#09090f] relative">
            
            <button 
              onClick={() => setSelectedBookingForInvoice(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Invoice Design */}
            <div className="space-y-6">
              {/* Logo / Title */}
              <div className="text-center pb-4 border-b border-white/10">
                <span className="font-display font-bold text-xl tracking-widest text-gradient">NEXA HAIR STUDIO</span>
                <div className="text-[9px] font-mono text-gray-500 mt-1 uppercase tracking-wider">PREMIUM MOLECULAR BEAUTY CONTEXT</div>
                <div className="text-[10px] font-mono text-gray-400 mt-3 bg-white/[0.04] py-1 px-3 inline-block rounded-md border border-white/5">
                  INVOICE: #INV-{selectedBookingForInvoice.id.split("-")[1] || "9082"}
                </div>
              </div>

              {/* Client & Booking details */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans text-gray-400">
                <div>
                  <div className="font-mono text-[9px] text-gray-500 uppercase">BILLED TO</div>
                  <strong className="text-white text-sm block mt-1">{selectedBookingForInvoice.customerName}</strong>
                  <div>{selectedBookingForInvoice.customerPhone}</div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-[9px] text-gray-500 uppercase">TIMESTAMPS</div>
                  <div className="text-white font-mono block mt-1">{selectedBookingForInvoice.date}</div>
                  <div className="font-mono">{selectedBookingForInvoice.time}</div>
                </div>
              </div>

              {/* Itemized Services Table */}
              <div className="space-y-2">
                <div className="font-mono text-[9px] text-gray-500 uppercase border-b border-white/5 pb-1">TREATMENT SPECIFICATIONS</div>
                
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {selectedBookingForInvoice.services.map((srv, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs py-1">
                      <span className="text-gray-300 font-sans">{srv}</span>
                      <span className="text-white font-mono">₹{(selectedBookingForInvoice.amount / selectedBookingForInvoice.services.length).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settlement stats */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Tax Index (IGST 18% Incl.)</span>
                  <span>₹{(selectedBookingForInvoice.amount * 0.18).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Carbon-Offset Green Fee</span>
                  <span className="text-emerald-400">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/5">
                  <span className="text-gradient">GRAND TOTAL DUE</span>
                  <span className="text-nexa-neon-orange">₹{selectedBookingForInvoice.amount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Payment Mode Status Bar */}
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg flex items-center justify-between text-xs">
                <span className="text-gray-400 font-mono">Payment Protocol</span>
                <span className={`font-mono px-2 py-0.5 rounded text-[10px] ${
                  selectedBookingForInvoice.paymentStatus === "Paid" 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}>
                  {selectedBookingForInvoice.paymentStatus === "Paid" ? "CONFIRMED PAID" : "PENDING CASH ON ENTRY"}
                </span>
              </div>

              {/* Footer */}
              <div className="text-center pt-2 text-[10px] text-gray-500 font-sans leading-relaxed">
                Thank you for choosing Nexa Elite. <br/>
                All assets sterilized under ISO-9001 quantum norms.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-card max-w-sm w-full rounded-2xl border border-nexa-neon-violet/30 p-6 bg-[#0d0d12] relative">
            <h3 className="text-lg font-bold font-display text-white mb-4">Reschedule Treatment Slot</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">New Date Coordinates</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-[#14141f] text-white text-xs px-3 py-2.5 rounded-lg border border-white/10"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">New Time Coordinates</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-[#14141f] text-white text-xs px-3 py-2.5 rounded-lg border border-white/10"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setRescheduleBookingId(null)}
                  className="flex-1 py-2.5 bg-neutral-800 text-gray-400 hover:text-white text-xs font-mono uppercase rounded-lg border border-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReschedule}
                  className="flex-1 py-2.5 bg-gradient-to-r from-nexa-neon-orange to-nexa-neon-violet text-white text-xs font-mono uppercase rounded-lg font-bold shadow-lg shadow-nexa-neon-orange/10"
                >
                  Confirm Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complete Service Protocol Wizard Modal */}
      {completingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-card max-w-md w-full rounded-2xl border border-emerald-500/30 p-6 bg-[#0a0f0d] relative space-y-4">
            
            <button 
              onClick={() => setCompletingBooking(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                Active Protocol Completion
              </span>
              <h3 className="text-xl font-bold font-display text-white mt-2">Prestige Completion Protocol</h3>
              <p className="text-xs text-gray-500">Record feedback and award structural credits to the performing stylist.</p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Selected Service info */}
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg text-xs">
                <span className="text-gray-500 block font-mono text-[9px] uppercase">Services Rendered</span>
                <div className="text-white font-bold font-sans mt-0.5">{completingBooking.services.join(", ")}</div>
              </div>

              {/* Adjust Final Amount */}
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Final Amount Settled (₹)</label>
                <input
                  type="number"
                  value={completionAmount}
                  onChange={(e) => setCompletionAmount(Number(e.target.value))}
                  className="w-full bg-[#14141f] text-white text-xs px-3 py-2.5 rounded-lg border border-white/10 font-mono"
                />
              </div>

              {/* Confirm Performing Specialist */}
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Confirm Performing Employee</label>
                <select
                  value={completionEmpId}
                  onChange={(e) => setCompletionEmpId(e.target.value)}
                  className="w-full bg-[#14141f] text-white text-xs px-3 py-2.5 rounded-lg border border-white/10 font-sans"
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Choice */}
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1.5">Customer Prestige Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackRating(star)}
                      className="p-1 rounded hover:bg-white/5 transition-all"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          star <= feedbackRating 
                            ? "fill-nexa-amber text-nexa-amber" 
                            : "text-gray-600"
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Comment */}
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Client Feedback Comment</label>
                <textarea
                  rows={2}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Record verbal feedback notes..."
                  className="w-full bg-[#14141f] text-white text-xs p-3 rounded-lg border border-white/10 font-sans resize-none"
                />
              </div>

              <button
                onClick={submitCompletion}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> Finalize Settlement & Record
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

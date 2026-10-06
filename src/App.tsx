/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Sparkles, 
  User, 
  Sliders, 
  Terminal, 
  ShieldAlert,
  Menu,
  X,
  Clock
} from "lucide-react";
import LiveBackground from "./components/LiveBackground";
import NexaExperienceHub from "./components/NexaExperienceHub";
import NexaClientCommand from "./components/NexaClientCommand";
import NexaOwnerIntelligenceHub from "./components/NexaOwnerIntelligenceHub";
import { NexaDBProvider, useNexaDB } from "./context/NexaDBContext";
import { DEFAULT_SERVICES } from "./data";

function AppContent() {
  // Page Navigation State: experience-hub, client-command, owner-hub
  const [activePage, setActivePage] = useState<"experience-hub" | "client-command" | "owner-hub">("experience-hub");
  
  // Mobile navigation drawer toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Remote Desk Lock State
  const [isDeskLocked, setIsDeskLocked] = useState(() => localStorage.getItem("nexa_desk_locked") === "true");

  const toggleDeskLock = () => {
    const nextState = !isDeskLocked;
    setIsDeskLocked(nextState);
    localStorage.setItem("nexa_desk_locked", nextState ? "true" : "false");
  };

  // Consume our synchronized local-storage backed database context
  const {
    customers,
    bookings,
    employees,
    serviceHistory,
    payments,
    addBookingDirect,
    addEmployee,
    clearDatabase,
    deleteRow,
    completeBooking,
    rescheduleBooking,
    cancelBooking
  } = useNexaDB();

  return (
    <div className="min-h-screen text-white relative font-sans selection:bg-nexa-neon-orange selection:text-white" id="nexa-app-root">
      
      {/* Cinematic Background Layer */}
      <LiveBackground />

      {/* Luxury Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-[#050505]/40 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12" id="nexa-main-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Accent */}
          <div className="flex flex-col select-none">
            <span className="font-display font-black tracking-[0.25em] text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#fa4a0c] via-[#ffaa66] to-[#fa4a0c] bg-[length:200%_auto] animate-metallic-shine drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)] drop-shadow-[0_4px_8px_rgba(249,87,22,0.6)] uppercase block leading-none">
              NEXA
            </span>
            <span className="text-[9px] font-mono tracking-[0.4em] text-white/80 uppercase block mt-1.5 font-bold">
              HAIR STUDIO
            </span>
          </div>

          {/* Desktop Navigation / Page Selector */}
          <nav className="hidden lg:flex items-center gap-1 bg-transparent" id="desktop-role-selector">
            <button
              onClick={() => setActivePage("experience-hub")}
              className={`px-5 py-2.5 rounded-lg text-xs font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-[400ms] ease-in-out cursor-pointer ${
                activePage === "experience-hub"
                  ? "text-white bg-[#f95716]/15 shadow-[0_0_15px_rgba(249,87,22,0.12)]"
                  : "text-white/70 hover:text-white bg-transparent hover:bg-[#f95716]/15 hover:shadow-[0_0_15px_rgba(249,87,22,0.12)]"
              }`}
            >
              Experience Hub
            </button>
            <button
              onClick={() => setActivePage("client-command")}
              className={`px-5 py-2.5 rounded-lg text-xs font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-[400ms] ease-in-out cursor-pointer ${
                activePage === "client-command"
                  ? "text-white bg-[#f95716]/15 shadow-[0_0_15px_rgba(249,87,22,0.12)]"
                  : "text-white/70 hover:text-white bg-transparent hover:bg-[#f95716]/15 hover:shadow-[0_0_15px_rgba(249,87,22,0.12)]"
              }`}
            >
              Client Command
            </button>
            <button
              onClick={() => setActivePage("owner-hub")}
              className={`px-5 py-2.5 rounded-lg text-xs font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-[400ms] ease-in-out cursor-pointer ${
                activePage === "owner-hub"
                  ? "text-white bg-[#f95716]/15 shadow-[0_0_15px_rgba(249,87,22,0.12)]"
                  : "text-white/70 hover:text-white bg-transparent hover:bg-[#f95716]/15 hover:shadow-[0_0_15px_rgba(249,87,22,0.12)]"
              }`}
            >
              Owner Intelligence
            </button>
          </nav>

          <div className="hidden md:block" />

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/[0.02] border border-white/5 text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col justify-center items-center p-6 lg:hidden">
          <div className="space-y-6 text-center w-full max-w-xs">
            <div className="border-b border-white/10 pb-4 mb-6 text-center select-none">
              <span className="font-display font-black tracking-[0.2em] text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#fa4a0c] via-[#ffaa66] to-[#fa4a0c] bg-[length:200%_auto] animate-metallic-shine drop-shadow-[0_2px_4px_rgba(249,87,22,0.5)] block uppercase leading-none">
                NEXA
              </span>
              <span className="text-[9px] font-mono tracking-[0.35em] text-white/75 uppercase block mt-1.5 font-bold">
                HAIR STUDIO
              </span>
            </div>

            <button
              onClick={() => { setActivePage("experience-hub"); setIsMobileMenuOpen(false); }}
              className={`w-full py-3.5 rounded-xl text-xs font-sans font-bold uppercase tracking-[0.2em] transition-all duration-[400ms] ease-in-out ${
                activePage === "experience-hub"
                  ? "text-white bg-[#f95716]/15 border border-[#f95716]/30 shadow-[0_0_15px_rgba(249,87,22,0.12)]"
                  : "text-white/60 hover:text-white bg-transparent hover:bg-[#f95716]/10"
              }`}
            >
              Experience Hub
            </button>

            <button
              onClick={() => { setActivePage("client-command"); setIsMobileMenuOpen(false); }}
              className={`w-full py-3.5 rounded-xl text-xs font-sans font-bold uppercase tracking-[0.2em] transition-all duration-[400ms] ease-in-out ${
                activePage === "client-command"
                  ? "text-white bg-[#f95716]/15 border border-[#f95716]/30 shadow-[0_0_15px_rgba(249,87,22,0.12)]"
                  : "text-white/60 hover:text-white bg-transparent hover:bg-[#f95716]/10"
              }`}
            >
              Client Command
            </button>

            <button
              onClick={() => { setActivePage("owner-hub"); setIsMobileMenuOpen(false); }}
              className={`w-full py-3.5 rounded-xl text-xs font-sans font-bold uppercase tracking-[0.2em] transition-all duration-[400ms] ease-in-out ${
                activePage === "owner-hub"
                  ? "text-white bg-[#f95716]/15 border border-[#f95716]/30 shadow-[0_0_15px_rgba(249,87,22,0.12)]"
                  : "text-white/60 hover:text-white bg-transparent hover:bg-[#f95716]/10"
              }`}
            >
              Owner Intelligence
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-6 text-xs font-mono text-gray-500 hover:text-white"
            >
              Dismiss Navigation Menu
            </button>
          </div>
        </div>
      )}

      {/* Main Page Stage Router */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pb-24 relative z-10" id="nexa-stage-router">
        
        <>
          {/* PAGE 1: EXPERIENCE HUB */}
          {activePage === "experience-hub" && (
            <NexaExperienceHub 
              services={DEFAULT_SERVICES}
              employees={employees}
              onNewBooking={addBookingDirect}
            />
          )}

          {/* PAGE 2: CLIENT COMMAND */}
          {activePage === "client-command" && (
            <NexaClientCommand 
              bookings={bookings}
              history={serviceHistory}
              employees={employees}
              onUpdateBookingStatus={(bookingId, status, feedback, rating, finalAmount, assignedEmpId) => {
                if (status === "Completed") {
                  completeBooking(bookingId, feedback, rating, finalAmount, assignedEmpId);
                } else if (status === "Cancelled") {
                  cancelBooking(bookingId);
                }
              }}
              onRescheduleBooking={rescheduleBooking}
            />
          )}
        </>

        {/* PAGE 3: OWNER INTELLIGENCE HUB */}
        {activePage === "owner-hub" && (
          <NexaOwnerIntelligenceHub 
            bookings={bookings}
            employees={employees}
            customers={customers}
            history={serviceHistory}
            payments={payments}
            onAddEmployee={addEmployee}
            onResetDatabase={clearDatabase}
            onDeleteRow={deleteRow}
            onAddBookingDirect={addBookingDirect}
            isDeskLocked={isDeskLocked}
            onToggleDeskLock={toggleDeskLock}
          />
        )}

      </main>

      {/* Micro Status Ribbon Footer */}
      <footer className="w-full border-t border-white/5 bg-[#050505]/60 backdrop-blur-md py-6 px-12 text-center text-xs font-mono text-gray-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© 2026 Nexa Hair Studio SaaS Enterprise. All privileges reserved.</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Security Protocol ISO-27001</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">SLA Core Index 99.99%</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <NexaDBProvider>
      <AppContent />
    </NexaDBProvider>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Customer, 
  Booking, 
  Employee, 
  ServiceHistory, 
  PaymentTransaction, 
  SalonService, 
  NotificationLog 
} from '../types';
import { 
  DEFAULT_CUSTOMERS, 
  DEFAULT_BOOKINGS, 
  DEFAULT_EMPLOYEES, 
  DEFAULT_HISTORY, 
  DEFAULT_PAYMENTS,
  getStoredData,
  saveStoredData
} from '../data';

interface NexaDBContextType {
  customers: Customer[];
  bookings: Booking[];
  employees: Employee[];
  serviceHistory: ServiceHistory[];
  payments: PaymentTransaction[];
  notifications: NotificationLog[];
  createBooking: (bookingData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    services: SalonService[];
    paymentMethod: "Cash" | "Online Payment";
    date: string;
    time: string;
    employeeId: string;
  }) => Booking[];
  addBookingDirect: (booking: Booking, customer: Customer) => void;
  completeBooking: (
    bookingId: string,
    feedback?: string,
    rating?: number,
    finalAmount?: number,
    assignedEmpId?: string
  ) => void;
  rescheduleBooking: (bookingId: string, date: string, time: string) => void;
  cancelBooking: (bookingId: string) => void;
  clearDatabase: () => void;
  addEmployee: (employee: Employee) => void;
  deleteRow: (table: "bookings" | "employees" | "customers" | "history" | "payments", id: string) => void;
}

const NexaDBContext = createContext<NexaDBContextType | undefined>(undefined);

export const NexaDBProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [serviceHistory, setServiceHistory] = useState<ServiceHistory[]>([]);
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
        
        // Populate serviceHistory dynamically from all MongoDB records
        const mappedHistory: ServiceHistory[] = data.map((b: any) => ({
          id: b.id || b.bookingId,
          customer: b.customerName,
          service: Array.isArray(b.services) ? b.services.join(", ") : b.services,
          employee: b.assignedEmployeeName || b.assignedSpecialist || "Prateek Sen",
          date: b.date || b.bookingDate,
          time: b.time || b.bookingTime,
          paymentMethod: b.paymentMethod || "Cash",
          amount: b.amount || b.totalAmount,
          feedback: b.feedback || (b.status === "Cancelled" ? "Cancelled Slot" : b.status === "Upcoming" ? "Upcoming Appointment booked successfully." : "Prestige treatment completed."),
          rating: b.rating || 5,
          status: b.status
        }));
        setServiceHistory(mappedHistory);
      }
    } catch (err) {
      console.error("Failed to load bookings from MongoDB API:", err);
    }
  };

  // Initialize and load from local storage + fetch from MongoDB
  useEffect(() => {
    let loadedCustomers = getStoredData("customers", DEFAULT_CUSTOMERS);
    let loadedBookings = getStoredData("bookings", DEFAULT_BOOKINGS);
    let loadedPayments = getStoredData("payments", DEFAULT_PAYMENTS);

    setCustomers(loadedCustomers);
    setBookings(loadedBookings);
    setEmployees(getStoredData("employees", DEFAULT_EMPLOYEES));
    setServiceHistory([]);
    setPayments(loadedPayments);
    setNotifications(getStoredData("notifications", [
      {
        id: "notif-1",
        timestamp: new Date().toISOString(),
        type: "WhatsApp",
        recipient: "8209925051",
        message: `NEXA HAIR STUDIO\n\nNew Booking Received\n\nCustomer:\nAnanya Kapoor\n\nService:\nLuxe Balayage & Prism Glossing\n\nPayment:\nOnline Payment\n\nAmount:\n₹9000\n\nAppointment:\n2026-06-29 & 11:30\n\nAssigned Employee:\nPriya Nair`,
        status: "Sent"
      }
    ]));

    // Fetch initial bookings from MongoDB on mount
    fetchBookings();
  }, []);

  // Sync to local storage on changes
  useEffect(() => {
    if (customers.length > 0) saveStoredData("customers", customers);
  }, [customers]);

  useEffect(() => {
    if (bookings.length > 0) saveStoredData("bookings", bookings);
  }, [bookings]);

  useEffect(() => {
    if (employees.length > 0) saveStoredData("employees", employees);
  }, [employees]);

  useEffect(() => {
    if (serviceHistory.length > 0) saveStoredData("history", serviceHistory);
  }, [serviceHistory]);

  useEffect(() => {
    if (payments.length > 0) saveStoredData("payments", payments);
  }, [payments]);

  useEffect(() => {
    if (notifications.length > 0) saveStoredData("notifications", notifications);
  }, [notifications]);

  // Create booking action
  const createBooking = (bookingData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    services: SalonService[];
    paymentMethod: "Cash" | "Online Payment";
    date: string;
    time: string;
    employeeId: string;
  }) => {
    // 1. Customer Upsert
    let existingCustomer = customers.find(c => c.phone === bookingData.customerPhone);
    let customerId = existingCustomer?.id || `c-${Date.now()}`;
    if (!existingCustomer) {
      const newCust: Customer = {
        id: customerId,
        name: bookingData.customerName,
        phone: bookingData.customerPhone,
        email: bookingData.customerEmail || `${bookingData.customerName.toLowerCase().replace(/\s+/g, '')}@example.com`
      };
      setCustomers(prev => [...prev, newCust]);
    }

    // Find assigned employee
    const staff = employees.find(e => e.id === bookingData.employeeId) || employees[0] || { id: "emp1", name: "Prateek Sen" };

    // Calculate sum price
    const sumAmount = bookingData.services.reduce((sum, s) => sum + s.price, 0);

    // 2. Create Booking
    const bookingId = `NEX-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking: Booking = {
      id: bookingId,
      customerId,
      customerName: bookingData.customerName,
      customerPhone: bookingData.customerPhone,
      services: bookingData.services.map(s => s.name),
      amount: sumAmount,
      paymentMethod: bookingData.paymentMethod,
      paymentStatus: bookingData.paymentMethod === "Online Payment" ? "Paid" : "Pending",
      date: bookingData.date,
      time: bookingData.time,
      status: "Upcoming",
      assignedEmployeeId: staff.id,
      assignedEmployeeName: staff.name
    };

    // 3. Create Transaction
    const txnId = `TXN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`;
    const newTxn: PaymentTransaction = {
      id: txnId,
      paymentMode: bookingData.paymentMethod,
      status: bookingData.paymentMethod === "Online Payment" ? "Paid" : "Pending",
      amount: sumAmount,
      bookingId: bookingId,
      date: bookingData.date
    };

    // 4. Generate simulated WhatsApp Notification (matches prompt exactly)
    const formattedMsg = `NEXA HAIR STUDIO\n\nNew Booking Received\n\nCustomer:\n${bookingData.customerName}\n\nService:\n${bookingData.services.map(s => s.name).join(", ")}\n\nPayment:\n${bookingData.paymentMethod}\n\nAmount:\n₹${sumAmount}\n\nAppointment:\n${bookingData.date} & ${bookingData.time}\n\nAssigned Employee:\n${staff.name}`;
    
    const newNotif: NotificationLog = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: "WhatsApp",
      recipient: "8209925051",
      message: formattedMsg,
      status: "Sent"
    };

    // Update local state first for instant responsiveness
    setBookings(prev => [newBooking, ...prev]);
    setPayments(prev => [newTxn, ...prev]);
    setNotifications(prev => [newNotif, ...prev]);

    // Send POST to MongoDB backend API
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking)
    })
    .then(() => fetchBookings())
    .catch(err => console.error("Error creating booking on MongoDB:", err));

    return [newBooking];
  };

  // Complete booking and post feedback
  const completeBooking = (
    bookingId: string,
    feedback?: string,
    rating?: number,
    finalAmount?: number,
    assignedEmpId?: string
  ) => {
    // Send PUT request to MongoDB backend
    fetch(`/api/bookings/${bookingId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "Completed",
        paymentStatus: "Paid",
        feedback: feedback || "Service finished wonderfully.",
        rating: rating || 5,
        amount: finalAmount
      })
    })
    .then(() => fetchBookings())
    .catch(err => console.error("Error updating booking status on MongoDB:", err));

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        if (b.status !== "Completed") {
          const actualAmount = finalAmount !== undefined ? finalAmount : b.amount;
          const targetEmpId = assignedEmpId || b.assignedEmployeeId;
          const targetEmp = employees.find(e => e.id === targetEmpId) || { id: targetEmpId, name: b.assignedEmployeeName };

          // 1. Create history item
          const historyId = `h-${Date.now()}`;
          const newHist: ServiceHistory = {
            id: historyId,
            customer: b.customerName,
            service: b.services.join(", "),
            employee: targetEmp.name,
            date: new Date().toISOString().split('T')[0],
            amount: actualAmount,
            feedback: feedback || "Service finished wonderfully.",
            rating: rating || 5
          };
          setServiceHistory(sh => [newHist, ...sh]);

          // 2. Update employee metrics
          setEmployees(empList => empList.map(e => {
            if (e.id === targetEmpId) {
              return {
                ...e,
                totalCustomers: e.totalCustomers + 1,
                completedServices: e.completedServices + b.services.length,
                revenueGenerated: e.revenueGenerated + actualAmount,
                todayCustomers: e.todayCustomers + 1,
                todayCompletedServices: e.todayCompletedServices + b.services.length,
                todayRevenue: e.todayRevenue + actualAmount
              };
            }
            return e;
          }));

          // 3. Complete associated transaction
          setPayments(payList => payList.map(p => {
            if (p.bookingId === bookingId) {
              return { ...p, status: "Paid", amount: actualAmount };
            }
            return p;
          }));
        }

        const finalEmp = employees.find(e => e.id === (assignedEmpId || b.assignedEmployeeId)) || { name: b.assignedEmployeeName };

        return {
          ...b,
          status: "Completed" as const,
          paymentStatus: "Paid" as const,
          amount: finalAmount !== undefined ? finalAmount : b.amount,
          assignedEmployeeId: assignedEmpId || b.assignedEmployeeId,
          assignedEmployeeName: finalEmp.name,
          feedback,
          rating
        };
      }
      return b;
    }));
  };

  // Reschedule Booking
  const rescheduleBooking = (bookingId: string, date: string, time: string) => {
    // Send PUT request to MongoDB backend
    fetch(`/api/bookings/${bookingId}/reschedule`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, time })
    })
    .then(() => fetchBookings())
    .catch(err => console.error("Error rescheduling booking on MongoDB:", err));

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          date,
          time
        };
      }
      return b;
    }));
  };

  // Cancel Booking
  const cancelBooking = (bookingId: string) => {
    // Send PUT request to MongoDB backend
    fetch(`/api/bookings/${bookingId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Cancelled", paymentStatus: "Failed" })
    })
    .then(() => fetchBookings())
    .catch(err => console.error("Error cancelling booking on MongoDB:", err));

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: "Cancelled"
        };
      }
      return b;
    }));

    // Update transaction
    setPayments(prev => prev.map(p => {
      if (p.bookingId === bookingId) {
        return { ...p, status: "Failed" };
      }
      return p;
    }));
  };

  // Add specialist employee
  const addEmployee = (emp: Employee) => {
    setEmployees(prev => [...prev, emp]);
  };

  // Delete row from explorer
  const deleteRow = (table: "bookings" | "employees" | "customers" | "history" | "payments", id: string) => {
    if (table === "bookings") {
      fetch(`/api/bookings/${id}`, {
        method: "DELETE"
      })
      .then(() => fetchBookings())
      .catch(err => console.error("Error deleting booking on MongoDB:", err));
    }

    switch (table) {
      case "bookings":
        setBookings(prev => prev.filter(x => x.id !== id));
        break;
      case "employees":
        setEmployees(prev => prev.filter(x => x.id !== id));
        break;
      case "customers":
        setCustomers(prev => prev.filter(x => x.id !== id));
        break;
      case "history":
        setServiceHistory(prev => prev.filter(x => x.id !== id));
        break;
      case "payments":
        setPayments(prev => prev.filter(x => x.id !== id));
        break;
    }
  };

  // Hard Reset Database
  const clearDatabase = () => {
    localStorage.removeItem("nexa_customers");
    localStorage.removeItem("nexa_bookings");
    localStorage.removeItem("nexa_employees");
    localStorage.removeItem("nexa_history");
    localStorage.removeItem("nexa_payments");
    localStorage.removeItem("nexa_notifications");

    setCustomers(DEFAULT_CUSTOMERS);
    setBookings(DEFAULT_BOOKINGS);
    setEmployees(DEFAULT_EMPLOYEES);
    setServiceHistory(DEFAULT_HISTORY);
    setPayments(DEFAULT_PAYMENTS);
    setNotifications([
      {
        id: "notif-1",
        timestamp: new Date().toISOString(),
        type: "WhatsApp",
        recipient: "8209925051",
        message: `NEXA HAIR STUDIO\n\nNew Booking Received\n\nCustomer:\nAnanya Kapoor\n\nService:\nLuxe Balayage & Prism Glossing\n\nPayment:\nOnline Payment\n\nAmount:\n₹9000\n\nAppointment:\n2026-06-29 & 11:30\n\nAssigned Employee:\nPriya Nair`,
        status: "Sent"
      }
    ]);
  };

  const addBookingDirect = (booking: Booking, customer: Customer) => {
    // 1. Customer Upsert
    if (!customers.some(c => c.id === customer.id)) {
      setCustomers(prev => [...prev, customer]);
    }
    // 2. Add Booking local state
    setBookings(prev => [booking, ...prev]);

    // 3. Create a payment transaction for this booking
    const txnId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTxn: PaymentTransaction = {
      id: txnId,
      paymentMode: booking.paymentMethod,
      status: booking.paymentStatus,
      amount: booking.amount,
      bookingId: booking.id,
      date: booking.date
    };
    setPayments(prev => [newTxn, ...prev]);

    // 4. Update employee metrics
    setEmployees(prev => prev.map(e => {
      if (e.id === booking.assignedEmployeeId) {
        return {
          ...e,
          todayCustomers: e.todayCustomers + 1,
          todayRevenue: e.todayRevenue + booking.amount
        };
      }
      return e;
    }));

    // 5. Create Notification Log
    const formattedMsg = `NEXA HAIR STUDIO\n\nNew Booking Received\n\nCustomer:\n${booking.customerName}\n\nService:\n${booking.services.join(", ")}\n\nPayment:\n${booking.paymentMethod}\n\nAmount:\n₹${booking.amount}\n\nAppointment:\n${booking.date} @ ${booking.time}\n\nAssigned Employee:\n${booking.assignedEmployeeName}`;
    const newNotif: NotificationLog = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: "WhatsApp",
      recipient: "8209925051",
      message: formattedMsg,
      status: "Sent"
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Save directly to MongoDB Database via API
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    })
    .then(() => fetchBookings())
    .catch(err => console.error("Error inserting direct booking into MongoDB:", err));
  };

  return (
    <NexaDBContext.Provider value={{
      customers,
      bookings,
      employees,
      serviceHistory,
      payments,
      notifications,
      createBooking,
      addBookingDirect,
      completeBooking,
      rescheduleBooking,
      cancelBooking,
      clearDatabase,
      addEmployee,
      deleteRow
    }}>
      {children}
    </NexaDBContext.Provider>
  );
};

export const useNexaDB = () => {
  const context = useContext(NexaDBContext);
  if (context === undefined) {
    throw new Error('useNexaDB must be used within a NexaDBProvider');
  }
  return context;
};

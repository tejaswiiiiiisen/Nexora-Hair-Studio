/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Booking {
  id: string; // e.g. NEX-2045-01
  customerId: string;
  customerName: string;
  customerPhone: string;
  services: string[]; // List of selected service names
  amount: number;
  paymentMethod: "Cash" | "Online Payment";
  paymentStatus: "Pending" | "Paid" | "Failed";
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: "Upcoming" | "Completed" | "Cancelled";
  assignedEmployeeId: string;
  assignedEmployeeName: string;
  feedback?: string;
  rating?: number;
  createdAt?: string; // e.g. "29 June 2026\n10:42:31 PM"
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  specialization: string;
  avatarUrl: string;
  totalCustomers: number;
  completedServices: number;
  revenueGenerated: number;
  todayCustomers: number;
  todayCompletedServices: number;
  todayRevenue: number;
}

export interface ServiceHistory {
  id: string;
  customer: string; // Customer Name
  service: string; // Service Name
  employee: string; // Employee Name
  date: string; // YYYY-MM-DD
  amount: number;
  feedback?: string;
  rating?: number;
  time?: string;
  paymentMethod?: string;
  status?: string;
}

export interface PaymentTransaction {
  id: string;
  paymentMode: "Cash" | "Online Payment";
  status: "Pending" | "Paid" | "Failed";
  amount: number;
  bookingId: string;
  date: string;
}

export interface SalonService {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number; // in minutes
  iconName: string;
  rating: number;
}

// Bridging alias types for backward compatibility
export type ServiceItem = SalonService;
export type Payment = PaymentTransaction;

export interface NotificationLog {
  id: string;
  timestamp: string;
  type: "WhatsApp";
  recipient: string;
  message: string;
  status: "Sent" | "Failed";
}

import express from "express";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// MongoDB connection management
let rawUri = process.env.MONGODB_URI || "mongodb://sentejaswi66_db_user:jaishreeram00@ac-jtvjtgx-shard-00-00.cr6nypu.mongodb.net:27017,ac-jtvjtgx-shard-00-01.cr6nypu.mongodb.net:27017,ac-jtvjtgx-shard-00-02.cr6nypu.mongodb.net:27017/salon-db?ssl=true&replicaSet=atlas-h1vdo4-shard-0&authSource=admin&retryWrites=true&w=majority&appName=salon-db";
if (rawUri.startsWith("MONGODB_URI=")) {
  rawUri = rawUri.substring("MONGODB_URI=".length);
}
const MONGODB_URI = rawUri;

let client: MongoClient | null = null;
let dbInstance: any = null;

const DEFAULT_SEED_BOOKINGS = [
  {
    id: "NEX-2045-01",
    bookingId: "NEX-2045-01",
    customerId: "c1",
    customerName: "Vikram Malhotra",
    customerPhone: "9123456789",
    mobile: "9123456789",
    services: ["Classic Haircut", "Beard Trim"],
    assignedSpecialist: "Prateek Sen",
    assignedEmployeeId: "emp1",
    assignedEmployeeName: "Prateek Sen",
    bookingDate: "2026-06-30",
    date: "2026-06-30",
    bookingTime: "12:00 PM",
    time: "12:00",
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    totalAmount: 698,
    amount: 698,
    status: "Completed",
    createdAt: "30 June 2026\n12:00:00 PM",
    sessionType: "regular",
    feedback: "Exceptional service from Prateek. Truly professional grooming.",
    rating: 5
  },
  {
    id: "NEX-2045-02",
    bookingId: "NEX-2045-02",
    customerId: "c2",
    customerName: "Ananya Kapoor",
    customerPhone: "9876543210",
    mobile: "9876543210",
    services: ["Women Haircut", "Classic Manicure"],
    assignedSpecialist: "Priya Nair",
    assignedEmployeeId: "emp-priya",
    assignedEmployeeName: "Priya Nair",
    bookingDate: "2026-06-30",
    date: "2026-06-30",
    bookingTime: "11:30 AM",
    time: "11:30",
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    totalAmount: 1398,
    amount: 1398,
    status: "Completed",
    createdAt: "30 June 2026\n11:30:00 AM",
    sessionType: "regular",
    feedback: "Exceptional hair sculpting! The director understood my hair perfectly.",
    rating: 5
  },
  {
    id: "NEX-2045-03",
    bookingId: "NEX-2045-03",
    customerId: "c3",
    customerName: "Devansh Mehta",
    customerPhone: "9988776655",
    mobile: "9988776655",
    services: ["Korean Glow Facial"],
    assignedSpecialist: "Aisha Mehra",
    assignedEmployeeId: "emp-aisha",
    assignedEmployeeName: "Aisha Mehra",
    bookingDate: "2026-06-30",
    date: "2026-06-30",
    bookingTime: "09:30 AM",
    time: "09:30",
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    totalAmount: 3499,
    amount: 3499,
    status: "Completed",
    createdAt: "30 June 2026\n09:30:00 AM",
    sessionType: "regular",
    feedback: "The Korean Glow Facial is unmatched. My skin looks completely rejuvenated.",
    rating: 5
  },
  {
    id: "NEX-2045-04",
    bookingId: "NEX-2045-04",
    customerId: "c4",
    customerName: "Sneha Roy",
    customerPhone: "9812345678",
    mobile: "9812345678",
    services: ["Airbrush Makeup"],
    assignedSpecialist: "Priya Nair",
    assignedEmployeeId: "emp-priya",
    assignedEmployeeName: "Priya Nair",
    bookingDate: "2026-06-25",
    date: "2026-06-25",
    bookingTime: "03:30 PM",
    time: "15:30",
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    totalAmount: 6999,
    amount: 6999,
    status: "Completed",
    createdAt: "25 June 2026\n03:30:00 PM",
    sessionType: "regular",
    feedback: "Excellent service!",
    rating: 5
  },
  {
    id: "NEX-2045-05",
    bookingId: "NEX-2045-05",
    customerId: "c5",
    customerName: "Rohan Sharma",
    customerPhone: "9712345678",
    mobile: "9712345678",
    services: ["Classic Beard Grooming", "Keratin Therapy"],
    assignedSpecialist: "Rohan Sharma",
    assignedEmployeeId: "emp-rohan",
    assignedEmployeeName: "Rohan Sharma",
    bookingDate: "2026-06-20",
    date: "2026-06-20",
    bookingTime: "02:30 PM",
    time: "14:30",
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    totalAmount: 4998,
    amount: 4998,
    status: "Completed",
    createdAt: "20 June 2026\n02:30:00 PM",
    sessionType: "regular",
    feedback: "Very professional grooming.",
    rating: 5
  },
  {
    id: "NEX-2045-06",
    bookingId: "NEX-2045-06",
    customerId: "c6",
    customerName: "Aanya Roy",
    customerPhone: "9900112233",
    mobile: "9900112233",
    services: ["Premium Haircut"],
    assignedSpecialist: "Kunal",
    assignedEmployeeId: "emp-kunal",
    assignedEmployeeName: "Kunal",
    bookingDate: "2026-07-01",
    date: "2026-07-01",
    bookingTime: "08:50 AM",
    time: "08:50",
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    totalAmount: 699,
    amount: 699,
    status: "Completed",
    createdAt: "01 July 2026\n08:50:00 AM",
    sessionType: "regular",
    feedback: "Outstanding layering by Kunal. Very elegant styling.",
    rating: 5
  },
  {
    id: "NEX-2045-07",
    bookingId: "NEX-2045-07",
    customerId: "c7",
    customerName: "Client 4",
    customerPhone: "9911223344",
    mobile: "9911223344",
    services: ["Premium Haircut"],
    assignedSpecialist: "megha sharma",
    assignedEmployeeId: "emp-megha",
    assignedEmployeeName: "megha sharma",
    bookingDate: "2026-07-01",
    date: "2026-07-01",
    bookingTime: "08:39 AM",
    time: "08:39",
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    totalAmount: 699,
    amount: 699,
    status: "Completed",
    createdAt: "01 July 2026\n08:39:00 AM",
    sessionType: "regular",
    feedback: "Extremely clean design and great style execution.",
    rating: 5
  },
  {
    id: "NEX-2045-08",
    bookingId: "NEX-2045-08",
    customerId: "c8",
    customerName: "Customer 2",
    customerPhone: "9922334455",
    mobile: "9922334455",
    services: ["Premium Haircut"],
    assignedSpecialist: "Kunal",
    assignedEmployeeId: "emp-kunal",
    assignedEmployeeName: "Kunal",
    bookingDate: "2026-07-01",
    date: "2026-07-01",
    bookingTime: "08:36 AM",
    time: "08:36",
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    totalAmount: 699,
    amount: 699,
    status: "Completed",
    createdAt: "01 July 2026\n08:36:00 AM",
    sessionType: "regular",
    feedback: "Kunal did an amazing job with my hair structure alignment.",
    rating: 5
  },
  {
    id: "NEX-2045-09",
    bookingId: "NEX-2045-09",
    customerId: "c9",
    customerName: "Customer 1",
    customerPhone: "9933445566",
    mobile: "9933445566",
    services: ["Premium Haircut"],
    assignedSpecialist: "Prateek Sen",
    assignedEmployeeId: "emp1",
    assignedEmployeeName: "Prateek Sen",
    bookingDate: "2026-07-01",
    date: "2026-07-01",
    bookingTime: "08:35 AM",
    time: "08:35",
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    totalAmount: 699,
    amount: 699,
    status: "Completed",
    createdAt: "01 July 2026\n08:35:00 AM",
    sessionType: "regular",
    feedback: "High speed, direct precision cuts. Exceptionally good.",
    rating: 5
  },
  {
    id: "NEX-2045-10",
    bookingId: "NEX-2045-10",
    customerId: "c10",
    customerName: "Customer 4",
    customerPhone: "9944556677",
    mobile: "9944556677",
    services: ["Hair Straightening"],
    assignedSpecialist: "megha sharma",
    assignedEmployeeId: "emp-megha",
    assignedEmployeeName: "megha sharma",
    bookingDate: "2026-07-01",
    date: "2026-07-01",
    bookingTime: "08:14 AM",
    time: "08:14",
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    totalAmount: 3499,
    amount: 3499,
    status: "Completed",
    createdAt: "01 July 2026\n08:14:00 AM",
    sessionType: "regular",
    feedback: "Perfect straight hair look. Highly professional chemical treatment.",
    rating: 5
  },
  {
    id: "NEX-2045-11",
    bookingId: "NEX-2045-11",
    customerId: "c11",
    customerName: "shakir khan",
    customerPhone: "9955667788",
    mobile: "9955667788",
    services: ["Beard Trim"],
    assignedSpecialist: "Kunal",
    assignedEmployeeId: "emp-kunal",
    assignedEmployeeName: "Kunal",
    bookingDate: "2026-07-01",
    date: "2026-07-01",
    bookingTime: "08:10 AM",
    time: "08:10",
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    totalAmount: 299,
    amount: 299,
    status: "Completed",
    createdAt: "01 July 2026\n08:10:00 AM",
    sessionType: "regular",
    feedback: "Super clean shave and precise sideburns styling.",
    rating: 5
  },
  {
    id: "NEX-2045-12",
    bookingId: "NEX-2045-12",
    customerId: "c12",
    customerName: "Client 1",
    customerPhone: "9966778899",
    mobile: "9966778899",
    services: ["Premium Haircut"],
    assignedSpecialist: "Prateek Sen",
    assignedEmployeeId: "emp1",
    assignedEmployeeName: "Prateek Sen",
    bookingDate: "2026-07-01",
    date: "2026-07-01",
    bookingTime: "07:54 AM",
    time: "07:54",
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    totalAmount: 699,
    amount: 699,
    status: "Completed",
    createdAt: "01 July 2026\n07:54:00 AM",
    sessionType: "regular",
    feedback: "Very stylish and dynamic look. Recommended to anyone.",
    rating: 5
  },
  {
    id: "NEX-2045-13",
    bookingId: "NEX-2045-13",
    customerId: "c13",
    customerName: "Customer 2",
    customerPhone: "9977889900",
    mobile: "9977889900",
    services: ["Classic Haircut"],
    assignedSpecialist: "megha sharma",
    assignedEmployeeId: "emp-megha",
    assignedEmployeeName: "megha sharma",
    bookingDate: "2026-07-01",
    date: "2026-07-01",
    bookingTime: "07:41 AM",
    time: "07:41",
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    totalAmount: 399,
    amount: 399,
    status: "Completed",
    createdAt: "01 July 2026\n07:41:00 AM",
    sessionType: "regular",
    feedback: "Great value and exceptional comfort. Thanks megha!",
    rating: 5
  },
  {
    id: "NEX-2045-14",
    bookingId: "NEX-2045-14",
    customerId: "c14",
    customerName: "rinku rawat",
    customerPhone: "9988990011",
    mobile: "9988990011",
    services: ["Classic Haircut"],
    assignedSpecialist: "Kunal",
    assignedEmployeeId: "emp-kunal",
    assignedEmployeeName: "Kunal",
    bookingDate: "2026-07-01",
    date: "2026-07-01",
    bookingTime: "06:17 AM",
    time: "06:17",
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    totalAmount: 399,
    amount: 399,
    status: "Completed",
    createdAt: "01 July 2026\n06:17:00 AM",
    sessionType: "regular",
    feedback: "Incredibly fast service, precise work by Kunal.",
    rating: 5
  },
  {
    id: "NEX-2045-15",
    bookingId: "NEX-2045-15",
    customerId: "c15",
    customerName: "Client 5",
    customerPhone: "9999000111",
    mobile: "9999000111",
    services: ["Classic Haircut", "Beard Trim"],
    assignedSpecialist: "megha sharma",
    assignedEmployeeId: "emp-megha",
    assignedEmployeeName: "megha sharma",
    bookingDate: "2026-07-01",
    date: "2026-07-01",
    bookingTime: "10:19 PM",
    time: "22:19",
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    totalAmount: 698,
    amount: 698,
    status: "Completed",
    createdAt: "01 July 2026\n10:19:00 PM",
    sessionType: "regular",
    feedback: "Brilliant overall grooming package. Perfect evening service.",
    rating: 5
  },
  {
    id: "NEX-2045-16",
    bookingId: "NEX-2045-16",
    customerId: "c16",
    customerName: "amrita gaur",
    customerPhone: "9900990099",
    mobile: "9900990099",
    services: ["Premium Haircut"],
    assignedSpecialist: "Prateek Sen",
    assignedEmployeeId: "emp1",
    assignedEmployeeName: "Prateek Sen",
    bookingDate: "2026-07-01",
    date: "2026-07-01",
    bookingTime: "10:16 PM",
    time: "22:16",
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    totalAmount: 699,
    amount: 699,
    status: "Completed",
    createdAt: "01 July 2026\n10:16:00 PM",
    sessionType: "regular",
    feedback: "Fabulous hair styling and luxury wash service. Extremely satisfied.",
    rating: 5
  }
];

async function getDb() {
  if (dbInstance) return dbInstance;
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB successfully");
    dbInstance = client.db("salon-db");
    
    // Seed database if it has less than 16 items to ensure all 16 requested bookings exist
    const collection = dbInstance.collection("bookings");
    const count = await collection.countDocuments();
    if (count < 16) {
      console.log("Seeding full 16 default bookings to MongoDB collection...");
      await collection.deleteMany({}); // clear any partial/stale default seed
      await collection.insertMany(DEFAULT_SEED_BOOKINGS);
    }
    
    return dbInstance;
  } catch (err) {
    console.error("Failed to connect to MongoDB, using lazy reconnection:", err);
    throw err;
  }
}

// REST API Endpoints

// GET /api/bookings - fetch all bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const db = await getDb();
    const collection = db.collection("bookings");
    const bookings = await collection.find({}).sort({ createdAt: -1 }).toArray();
    res.json(bookings);
  } catch (error: any) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ error: "Failed to retrieve bookings", details: error.message });
  }
});

// POST /api/bookings - create a new booking
app.post("/api/bookings", async (req, res) => {
  try {
    const db = await getDb();
    const collection = db.collection("bookings");
    
    const booking = req.body;
    
    // Format to store both schemas seamlessly
    const bookingDoc = {
      id: booking.id,
      bookingId: booking.id,
      customerId: booking.customerId,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      mobile: booking.customerPhone,
      services: booking.services,
      assignedSpecialist: booking.assignedEmployeeName,
      assignedEmployeeId: booking.assignedEmployeeId,
      assignedEmployeeName: booking.assignedEmployeeName,
      bookingDate: booking.date,
      date: booking.date,
      bookingTime: booking.time,
      time: booking.time,
      paymentMethod: booking.paymentMethod,
      paymentStatus: booking.paymentStatus,
      totalAmount: Number(booking.amount),
      amount: Number(booking.amount),
      status: booking.status,
      createdAt: booking.createdAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      sessionType: booking.sessionType || "regular"
    };

    const result = await collection.insertOne(bookingDoc);
    res.status(201).json({ ...bookingDoc, _id: result.insertedId });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking", details: error.message });
  }
});

// PUT /api/bookings/:id/status - update booking status
app.put("/api/bookings/:id/status", async (req, res) => {
  try {
    const db = await getDb();
    const collection = db.collection("bookings");
    const { id } = req.params;
    const { status, paymentStatus, feedback, rating, amount } = req.body;

    const updateFields: any = { status };
    if (paymentStatus) {
      updateFields.paymentStatus = paymentStatus;
    }
    if (feedback !== undefined) {
      updateFields.feedback = feedback;
    }
    if (rating !== undefined) {
      updateFields.rating = rating;
    }
    if (amount !== undefined) {
      updateFields.amount = Number(amount);
      updateFields.totalAmount = Number(amount);
    }

    const result = await collection.updateOne(
      { $or: [{ id: id }, { bookingId: id }] },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ success: true, updateFields });
  } catch (error: any) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Failed to update booking status" });
  }
});

// PUT /api/bookings/:id/reschedule - reschedule booking
app.put("/api/bookings/:id/reschedule", async (req, res) => {
  try {
    const db = await getDb();
    const collection = db.collection("bookings");
    const { id } = req.params;
    const { date, time } = req.body;

    const result = await collection.updateOne(
      { $or: [{ id: id }, { bookingId: id }] },
      { 
        $set: { 
          date: date, 
          bookingDate: date, 
          time: time, 
          bookingTime: time 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error("Error rescheduling booking:", error);
    res.status(500).json({ error: "Failed to reschedule booking" });
  }
});

// DELETE /api/bookings/:id - delete/cancel booking
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const db = await getDb();
    const collection = db.collection("bookings");
    const { id } = req.params;

    const result = await collection.deleteOne({ $or: [{ id: id }, { bookingId: id }] });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

// Start server with Vite middleware or static build assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

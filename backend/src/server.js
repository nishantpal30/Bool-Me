import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { serverConfig } from "./config/server.config.ts";
import { connectDB } from "./config/db.config.ts";
import authrouter from "./routers/auth.routes.js";
import serviceRoutes from "./routers/services.routes.js";
import availabilityRoutes from "./routers/availability.routes.js";
import calendarRoutes from "./routers/calendar.routes.js";
import bookingRoutes from "./routers/booking.routes.js";
import paymentRoutes from "./routers/payment.routes.js";
import publicBookingRoutes from "./routers/public.routes.js"

// Middleware 

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth",authrouter);
app.use("/api/service",serviceRoutes);
app.use("/api/availability",availabilityRoutes);
app.use("api/calendar",calendarRoutes);
app.use("api/booking",bookingRoutes);
app.use("api/payments",paymentRoutes);
app.use("/api/public", publicBookingRoutes);



// server confic
app.listen(serverConfig.PORT, async ()=>{

 console.log(`Server Running Sucessfully at PORT ${serverConfig.PORT}`);
 connectDB();
});

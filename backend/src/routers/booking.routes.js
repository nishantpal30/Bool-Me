import express from "express";
import isAuthenticated from "../middlewares/isauth.middleware.js";
import {
  listofBooking,
  rescheduleBooking,
  updateBookingStatus,
} from "../controllers/booking.controller.js";

const bookingRoutes = express.Router();

bookingRoutes.get("/", isAuthenticated, listofBooking);
bookingRoutes.post("/bookingstatus", isAuthenticated, updateBookingStatus);
bookingRoutes.post("/reschedulebooking", isAuthenticated, rescheduleBooking);
export default bookingRoutes;

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    customerAvatar: {
      type: String,
      default: "A1.png",
    },

    date: {
      type: String,
      required: true,
      index: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    // -------------------------
    // BOOKING STATUS
    // -------------------------

    status: {
      type: String,
      enum: [
        "pending",
        "pending_payment",
        "confirmed",
        "cancelled",
        "payment_failed",
      ],
      default: "confirmed",
    },

    // -------------------------
    // PAYMENT STATUS
    // -------------------------

    paymentStatus: {
      type: String,
      enum: ["not_required", "pending", "paid", "failed"],
      default: "not_required",
    },

    // -------------------------
    // RAZORPAY DETAILS
    // -------------------------

    razorpayOrderId: {
      type: String,
      default: "",
      index: true,
    },

    razorpayPaymentId: {
      type: String,
      default: "",
      index: true,
    },

    razorpaySignature: {
      type: String,
      default: "",
    },

    // -------------------------
    // MONEY
    // -------------------------

    amount: {
      type: Number,
      default: 0,
      min: 0,
    },

    platformFeeAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    providerPayoutAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    payoutStatus: {
      type: String,
      enum: [
        "not_required",
        "pending",
        "available",
        "withdrawn",
      ],
      default: "not_required",
    },

    currency: {
      type: String,
      default: "inr",
      lowercase: true,
    },

    // -------------------------
    // GOOGLE CALENDAR
    // -------------------------

    googleEventId: {
      type: String,
      default: "",
    },

    customerCalendarUrl: {
      type: String,
      default: "",
    },

    // -------------------------
    // OTHER DETAILS
    // -------------------------

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    reminderSent: {
      type: Boolean,
      default: false,
    },

    isRescheduled: {
      type: Boolean,
      default: false,
    },

    rescheduleCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },

  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
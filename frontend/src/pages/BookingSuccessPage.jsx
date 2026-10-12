import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPublicBookingStatus } from "../api/public";
import { ArrowLeft, BadgeCheck, Calendar, CalendarDays } from "lucide-react";
import { bookingSuccessPageStyles as s } from "../utils/dummystyle";

const BookingSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState(null);
  const [message, setMessage] = useState("Verifying your payment...");

  (useEffect(() => {
    const loadBooking = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setMessage(
          "We could not verify the payment . No booking will be created",
        );
        return;
      }
      try {
        const { data } = await getPublicBookingStatus({
          session_id: sessionId,
        });
        setBooking(data.booking);
        setMessage(
          data.booking.status === "confirmed" &&
            data.booking.paymentStatus === "paid"
            ? "Payment received . Your booking is confirmed"
            : "We could not verify the payment. No booking was created.",
        );
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "We could not verify the payment . No booking will be created",
        );
      }
    };
    loadBooking();
  }),
    [searchParams]);
  return (
    <div className={s.container}>
      <div className={s.card}>
        <div className={s.iconCircle}>
          <BadgeCheck className={s.checkIcon} />
        </div>
        <p className={s.statusLabel}>Payment verification</p>
        <h1 className={s.heading}>{message}</h1>

        {booking && (
          <div className={s.bookingDetails}>
            <div className={s.serviceRow}>
              <CalendarDays className={s.calendarDaysIcon} />
              <p className={s.serviceName}>
                {booking.serviceId?.name || "Appoinent"}
              </p>
            </div>
            <p className={s.detailText}>
              {booking.date} . {booking.startTime}.{booking.endTime}
            </p>
            <p className={s.statusText}>
              Status:{booking.status.replace("_", " ")}
            </p>
          </div>
        )}
        {booking?.customerCalendarUrl && (
          <a
            href={booking.customerCalendarUrl}
            target="_blank"
            className={s.addToCalendarLink}
          >
            <Calendar className={s.calendarIcon} />
            Add to Google Calendar
          </a>
        )}
        <Link
          to={
            searchParams.get("slug") ? `/book/${searchParams.get("slug")}` : "/"
          }
          className={s.backLink}
        >
          <ArrowLeft className={s.backIcon} /> Back To Booking Page
        </Link>
      </div>
    </div>
  );
};

export default BookingSuccessPage;

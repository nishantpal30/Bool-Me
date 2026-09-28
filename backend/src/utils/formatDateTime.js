const formatDateTime = (booking, timezone = 'Asia/Kolkata') => {
  const date = new Date(`${booking.date}T${booking.startTime}:00`);
  const displayDate = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeZone: timezone,
  }).format(date);

  return `${displayDate}, ${booking.startTime}-${booking.endTime}`;
};

export default formatDateTime;
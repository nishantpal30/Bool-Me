const buildSubject = (type, businessName, recipientType) => {
  if (recipientType === 'provider') {
    if (type === 'rescheduled') return `Booking rescheduled: ${businessName}`;
    if (type === 'cancelled') return `Booking cancelled: ${businessName}`;
    if (type === 'status') return `Booking status updated: ${businessName}`;
    return `New booking received: ${businessName}`;
  }

  if (type === 'rescheduled') return `Your booking with ${businessName} was rescheduled`;
  if (type === 'cancelled') return `Your booking with ${businessName} was cancelled`;
  if (type === 'status') return `Your booking with ${businessName} was updated`;
  return `Your booking with ${businessName} is confirmed`;
};


export default buildSubject;
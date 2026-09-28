const buildIntro = ({ type, serviceName, recipientType }) => {
  if (recipientType === 'provider') {
    if (type === 'rescheduled') return `A ${serviceName} booking has been rescheduled.`;
    if (type === 'cancelled') return `A ${serviceName} booking has been cancelled.`;
    if (type === 'status') return `A ${serviceName} booking status was updated.`;
    return `You received a new ${serviceName} booking.`;
  }

  if (type === 'rescheduled') return `Your ${serviceName} booking has been rescheduled.`;
  if (type === 'cancelled') return `Your ${serviceName} booking has been cancelled.`;
  if (type === 'status') return `Your ${serviceName} booking was updated.`;
  return `Your ${serviceName} booking is confirmed.`;
};
export default buildIntro;
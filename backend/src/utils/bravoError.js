const BravoError = (statusCode, parsed) => {
  const message = parsed.message || `Brevo email failed with status ${statusCode}`;
  const lowerMessage = String(message).toLowerCase();

  if (lowerMessage.includes('ip') && (lowerMessage.includes('unauthorized') || lowerMessage.includes('not authorized'))) {
    return [
      message,
      'Brevo rejected this server IP. For production, use one platform Brevo API key on the backend and either disable Brevo authorized IP restrictions or whitelist the production server outbound IP once.',
    ].join(' ');
  }

  return message;
};


export default BravoError;
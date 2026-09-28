const formatMoney = (amount = 0, currency = 'inr') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
};

export default formatMoney;
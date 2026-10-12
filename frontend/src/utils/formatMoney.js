export const formatMoney = (amount = 0, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount / 100);
};
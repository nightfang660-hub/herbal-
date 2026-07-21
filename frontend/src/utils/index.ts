/**
 * Formats a number into a standard Indian Rupee (INR) currency string.
 * Example: 2500 -> "₹2,500"
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculates the percentage discount between an original price and a discounted price.
 * Example: (1000, 800) -> 20
 */
export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice <= 0) return 0;
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount);
};

/**
 * Generates a mock Order ID for tracking purposes.
 * Example -> "ORD-7A3B9C"
 */
export const generateOrderId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'ORD-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Validates if a string is a properly formatted email address.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Returns a future delivery date formatted cleanly.
 * Example: 4 -> "12 Oct 2026"
 */
export const getEstimatedDeliveryDate = (daysFromNow: number = 5): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
};

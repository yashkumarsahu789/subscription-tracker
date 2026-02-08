const EXCHANGE_RATES: Record<string, number> = {
  'INR': 1,
  'USD': 83,
  'EUR': 90,
  'GBP': 104,
  'AUD': 54,
  'CAD': 61,
};

export type Currency = keyof typeof EXCHANGE_RATES;

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  'INR': '₹',
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'AUD': 'A$',
  'CAD': 'C$',
};

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string = 'INR'
): number {
  if (!EXCHANGE_RATES[fromCurrency as Currency]) {
    console.warn(`Unknown currency: ${fromCurrency}`);
    return amount;
  }
  
  if (!EXCHANGE_RATES[toCurrency as Currency]) {
    console.warn(`Unknown currency: ${toCurrency}`);
    return amount;
  }
  
  const amountInINR = amount * EXCHANGE_RATES[fromCurrency as Currency];
  const convertedAmount = amountInINR / EXCHANGE_RATES[toCurrency as Currency];
  
  return Math.round(convertedAmount * 100) / 100;
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  const symbol = CURRENCY_SYMBOLS[currency as Currency] || currency;
  
  if (currency === 'INR') {
    return `${symbol} ${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  } else {
    return `${symbol} ${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}

export function getSymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency as Currency] || currency;
}

export function calculateTotalInBaseCurrency(
  subscriptions: Array<{ amount: number; currency: string }>,
  baseCurrency: string = 'INR'
): number {
  return subscriptions.reduce((total, sub) => {
    const convertedAmount = convertCurrency(sub.amount, sub.currency, baseCurrency);
    return total + convertedAmount;
  }, 0);
}

export function calculateNormalizedMonthly(
  subscriptions: Array<{
    amount: number;
    currency: string;
    cycle: 'monthly' | 'quarterly' | 'yearly';
  }>,
  baseCurrency: string = 'INR'
): number {
  return subscriptions.reduce((total, sub) => {
    const convertedAmount = convertCurrency(sub.amount, sub.currency, baseCurrency);
    
    let monthlyEquivalent = 0;
    if (sub.cycle === 'monthly') {
      monthlyEquivalent = convertedAmount;
    } else if (sub.cycle === 'quarterly') {
      monthlyEquivalent = convertedAmount / 3;
    } else if (sub.cycle === 'yearly') {
      monthlyEquivalent = convertedAmount / 12;
    }
    
    return total + monthlyEquivalent;
  }, 0);
}

export function calculateAnnual(
  subscriptions: Array<{
    amount: number;
    currency: string;
    cycle: 'monthly' | 'quarterly' | 'yearly';
  }>,
  baseCurrency: string = 'INR'
): number {
  return calculateNormalizedMonthly(subscriptions, baseCurrency) * 12;
}

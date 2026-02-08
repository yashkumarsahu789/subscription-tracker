export interface Subscription {
  id: string;
  name: string;
  amount: number;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD';
  cycle: 'monthly' | 'quarterly' | 'yearly';
  status: 'active' | 'paused' | 'trial' | 'cancelled';
  category: 'entertainment' | 'productivity' | 'utilities' | 'health' | 'other';
  nextDate: string;
  billingMethod?: 'credit_card' | 'debit_card' | 'upi' | 'net_banking';
  cardLastFour?: string;
  trialEndsAt?: string;
  createdAt: string;
  lastPaidDate?: string;
  paymentHistory?: PaymentRecord[];
}

export interface PaymentRecord {
  id: string;
  paidDate: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
}

export type BillingCycle = Subscription['cycle'];
export type SubscriptionStatus = Subscription['status'];
export type SubscriptionCategory = Subscription['category'];
export type BillingMethod = Subscription['billingMethod'];

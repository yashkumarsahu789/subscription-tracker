import { addMonths, addQuarters, addYears, parseISO } from 'date-fns';
import { Subscription, PaymentRecord } from '../types/subscription';

export function calculateNextBillingDate(
  currentNextDate: string,
  cycle: 'monthly' | 'quarterly' | 'yearly'
): string {
  const parsedDate = parseISO(currentNextDate);
  
  let nextDate: Date;
  
  if (cycle === 'monthly') {
    nextDate = addMonths(parsedDate, 1);
  } else if (cycle === 'quarterly') {
    nextDate = addQuarters(parsedDate, 1);
  } else if (cycle === 'yearly') {
    nextDate = addYears(parsedDate, 1);
  } else {
    nextDate = parsedDate;
  }
  
  return nextDate.toISOString().split('T')[0];
}

export function handleMarkAsPaid(
  subscription: Subscription,
  paymentDate: string,
  paymentAmount: number
): {
  newPaymentRecord: PaymentRecord;
  newNextDate: string;
  updatedSubscription: Subscription;
} {
  const newNextDate = calculateNextBillingDate(subscription.nextDate, subscription.cycle);
  
  const paymentRecord: PaymentRecord = {
    id: crypto.randomUUID(),
    paidDate: paymentDate,
    amount: paymentAmount,
    currency: subscription.currency,
    status: 'completed',
  };
  
  const updatedSubscription: Subscription = {
    ...subscription,
    nextDate: newNextDate,
    lastPaidDate: paymentDate,
    paymentHistory: [...(subscription.paymentHistory || []), paymentRecord],
    status: 'active',
  };
  
  return {
    newPaymentRecord: paymentRecord,
    newNextDate,
    updatedSubscription,
  };
}

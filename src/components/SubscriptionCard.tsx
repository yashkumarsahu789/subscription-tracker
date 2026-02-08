import { useState } from 'react';
import { Subscription } from '../types/subscription';
import { format, parseISO, differenceInDays } from 'date-fns';
import { cn } from '../utils/cn';
import { SUBSCRIPTION_CATEGORIES, SUBSCRIPTION_STATUSES } from '../utils/constants';
import { formatCurrency } from '../utils/currency';

interface SubscriptionCardProps {
  subscription: Subscription;
  onDelete: (id: string) => void;
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  onMarkAsPaid?: (subscription: Subscription) => void;
}

export function SubscriptionCard({ subscription, onDelete, onPause, onResume, onMarkAsPaid }: SubscriptionCardProps) {
  const [showMarkPaid, setShowMarkPaid] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(subscription.amount.toString());
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  
  const nextDate = parseISO(subscription.nextDate);
  const daysUntilNext = differenceInDays(nextDate, new Date());
  
  const category = SUBSCRIPTION_CATEGORIES[subscription.category as keyof typeof SUBSCRIPTION_CATEGORIES] || SUBSCRIPTION_CATEGORIES.other;
  const statusInfo = subscription.status ? SUBSCRIPTION_STATUSES[subscription.status as keyof typeof SUBSCRIPTION_STATUSES] : null;

  const getStatusColor = () => {
    if (subscription.status === 'paused') return 'bg-gray-100 border-gray-200';
    if (subscription.status === 'trial') return 'bg-blue-100 border-blue-200';
    if (subscription.status === 'cancelled') return 'bg-red-100 border-red-200';
    if (daysUntilNext <= 0) return 'bg-red-100 border-red-200';
    if (daysUntilNext <= 7) return 'bg-amber-100 border-amber-200';
    return 'bg-green-50 border-green-200';
  };

  const getStatusText = () => {
    if (subscription.status === 'paused') return 'Paused';
    if (subscription.status === 'trial') return 'Trial';
    if (subscription.status === 'cancelled') return 'Cancelled';
    if (daysUntilNext <= 0) return 'Overdue';
    if (daysUntilNext === 1) return 'Tomorrow';
    if (daysUntilNext <= 7) return `In ${daysUntilNext} days`;
    return `In ${daysUntilNext} days`;
  };

  return (
    <div className={cn(
      'bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow',
      getStatusColor()
    )}>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl">{category.icon}</span>
            <h3 className="font-semibold text-slate-900">{subscription.name}</h3>
            <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
              {subscription.cycle}
            </span>
            {statusInfo && (
              <span className={cn('px-2 py-1 text-xs rounded-full', statusInfo.color, statusInfo.textColor)}>
                {statusInfo.label}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">{category.label}</p>
          <div className="text-2xl font-bold text-indigo-600">
            {formatCurrency(subscription.amount, subscription.currency || 'INR')}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-slate-500">Next:</span>
            <span className="font-medium">{format(nextDate, 'dd MMM yyyy')}</span>
            <span className="text-slate-500">({getStatusText()})</span>
          </div>
        </div>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          aria-label="Delete subscription"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
        {subscription.status === 'active' && (
          <>
            <button
              onClick={() => setShowMarkPaid(true)}
              className="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
            >
              ✓ Mark as Paid
            </button>
            {onPause && (
              <button
                onClick={() => onPause(subscription.id)}
                className="flex-1 px-3 py-2 text-sm bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors font-medium"
              >
                ⏸ Pause
              </button>
            )}
          </>
        )}
        
        {subscription.status === 'paused' && onResume && (
          <button
            onClick={() => onResume(subscription.id)}
            className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
          >
            ▶ Resume
          </button>
        )}
      </div>
      
      {/* Mark as Paid Modal */}
      {showMarkPaid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">{subscription.name} - Mark as Paid</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  step="0.01"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Date</label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                ✓ Next billing date will be auto-updated based on billing cycle
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (onMarkAsPaid) {
                    onMarkAsPaid({
                      ...subscription,
                      amount: parseFloat(paymentAmount),
                      lastPaidDate: paymentDate
                    });
                  }
                  setShowMarkPaid(false);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setShowMarkPaid(false)}
                className="flex-1 px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-lg font-semibold mb-2 text-red-600">Delete Subscription?</h2>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete <strong>{subscription.name}</strong>? This action cannot be undone.
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onDelete(subscription.id);
                  setShowDeleteConfirm(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                ✓ Confirm Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 font-medium"
              >
                ✕ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

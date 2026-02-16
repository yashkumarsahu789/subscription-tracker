import { useState, useEffect } from 'react';
import { Subscription, BillingCycle, SubscriptionStatus, SubscriptionCategory } from '../types/subscription';
import { cn } from '../utils/cn';
import { SUBSCRIPTION_CATEGORIES } from '../utils/constants';

interface SubscriptionFormProps {
  onSubmit: (subscription: Omit<Subscription, 'id' | 'createdAt'>) => void;
  user: any;
}

export function SubscriptionForm({ onSubmit, user }: SubscriptionFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<string>('INR');
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const [status, setStatus] = useState<string>('active');
  const [category, setCategory] = useState<string>('other');
  const [nextDate, setNextDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Load cached draft data on component mount
  useEffect(() => {
    const cachedDraft = localStorage.getItem('draftSubscription');
    if (cachedDraft) {
      try {
        const draft = JSON.parse(cachedDraft);
        setName(draft.name || '');
        setAmount(draft.amount?.toString() || '');
        setCurrency(draft.currency || 'INR');
        setCycle(draft.cycle || 'monthly');
        setStatus(draft.status || 'active');
        setCategory(draft.category || 'other');
        setNextDate(draft.nextDate || '');
      } catch (err) {
        console.error('Error loading cached draft:', err);
      }
    }
  }, []);

  // Save draft to cache when user types (without being logged in)
  useEffect(() => {
    if (!user && (name || amount || nextDate)) {
      const draft = {
        name,
        amount: amount ? parseFloat(amount) : 0,
        currency,
        cycle,
        status,
        category,
        nextDate,
      };
      localStorage.setItem('draftSubscription', JSON.stringify(draft));
      setShowSignupPrompt(true);
    }
  }, [name, amount, currency, cycle, status, category, nextDate, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!name || !amount || !nextDate) {
      setError('All fields are required.');
      return;
    }
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Amount must be a positive number.');
      return;
    }
    if (new Date(nextDate) < new Date()) {
      setError('Next billing date must be in the future.');
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Submitting subscription:', { name, amount, currency, cycle, status, category, nextDate });
      
      await onSubmit({
        name,
        amount: parseFloat(amount),
        currency: currency as any,
        cycle,
        status: status as SubscriptionStatus,
        category: category as SubscriptionCategory,
        nextDate,
      });
      
      console.log('Subscription submitted successfully, clearing form');
      
      // Clear form fields
      setName('');
      setAmount('');
      setCurrency('INR');
      setCycle('monthly');
      setStatus('active');
      setCategory('other');
      setNextDate('');
      setShowSignupPrompt(false);
    } catch (err) {
      console.error('Error submitting subscription:', err);
      setError(`Error: ${err instanceof Error ? err.message : 'Failed to save subscription'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Add New Subscription</h2>
      
      {/* Signup Prompt */}
      {!user && showSignupPrompt && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-900 mb-1">Sign up to save your data</p>
            <p className="text-xs text-amber-700">Your subscription details are being saved locally. Sign in to sync across devices and never lose your data.</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Subscription Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Netflix, Spotify, etc."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="999"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
              <option value="AUD">A$ AUD</option>
              <option value="CAD">C$ CAD</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Billing Cycle
            </label>
            <select
              value={cycle}
              onChange={(e) => setCycle(e.target.value as BillingCycle)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            >
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          >
            {Object.entries(SUBSCRIPTION_CATEGORIES).map(([key, val]) => (
              <option key={key} value={key}>
                {val.icon} {val.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Next Billing Date
          </label>
          <input
            type="date"
            value={nextDate}
            onChange={(e) => setNextDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2',
            isSubmitting
              ? 'bg-indigo-300 cursor-not-allowed'
              : !user
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          )}
        >
          {isSubmitting ? (
            'Adding...'
          ) : !user ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Sign up to save data
            </>
          ) : (
            'Add Subscription'
          )}
        </button>
      </form>
    </div>
  );
}

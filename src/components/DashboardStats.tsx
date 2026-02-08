import { Subscription } from '../types/subscription';
import { parseISO, differenceInDays } from 'date-fns';
import { formatCurrency } from '../utils/currency';

interface DashboardStatsProps {
  subscriptions: Subscription[];
}

export function DashboardStats({ subscriptions }: DashboardStatsProps) {
  const monthlyTotal = subscriptions.reduce((total, sub) => {
    if (sub.cycle === 'monthly') return total + sub.amount;
    if (sub.cycle === 'quarterly') return total + sub.amount / 3;
    if (sub.cycle === 'yearly') return total + sub.amount / 12;
    return total;
  }, 0);

  const upcomingCount = subscriptions.filter(
    (sub) => differenceInDays(parseISO(sub.nextDate), new Date()) <= 7 && differenceInDays(parseISO(sub.nextDate), new Date()) >= 0
  ).length;

  const overdueCount = subscriptions.filter(
    (sub) => differenceInDays(parseISO(sub.nextDate), new Date()) < 0
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="text-sm font-medium text-slate-500 mb-1">Monthly Estimate</div>
        <div className="text-3xl font-bold text-indigo-600">{formatCurrency(monthlyTotal, 'INR')}</div>
        <div className="text-xs text-slate-400 mt-1">{subscriptions.length} active</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="text-sm font-medium text-slate-500 mb-1">Upcoming (7 days)</div>
        <div className="text-3xl font-bold text-amber-600">{upcomingCount}</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="text-sm font-medium text-slate-500 mb-1">Overdue</div>
        <div className="text-3xl font-bold text-red-600">{overdueCount}</div>
      </div>
    </div>
  );
}

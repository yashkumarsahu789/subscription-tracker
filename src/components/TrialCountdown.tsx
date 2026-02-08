import { parseISO, differenceInDays } from 'date-fns';

interface TrialCountdownProps {
  trialEndsAt: string;
  subscriptionName: string;
}

export function TrialCountdown({
  trialEndsAt,
  subscriptionName,
}: TrialCountdownProps) {
  const daysLeft = differenceInDays(parseISO(trialEndsAt), new Date());
  const totalDays = 14;
  const percentageLeft = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{subscriptionName} Trial</span>
        <span className="text-amber-600 font-semibold">{daysLeft} days left</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-amber-500 h-2 rounded-full transition-all"
          style={{ width: `${percentageLeft}%` }}
        />
      </div>
    </div>
  );
}

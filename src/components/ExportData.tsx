import { Subscription } from '../types/subscription';

interface ExportDataProps {
  subscriptions: Subscription[];
}

export function ExportData({ subscriptions }: ExportDataProps) {
  
  const exportToCSV = () => {
    const headers = ['Name', 'Amount', 'Currency', 'Cycle', 'Next Date', 'Status', 'Category'];
    const rows = subscriptions.map(sub => [
      sub.name,
      sub.amount,
      sub.currency,
      sub.cycle,
      sub.nextDate,
      sub.status,
      sub.category,
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="flex gap-2">
      <button
        onClick={exportToCSV}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
      >
        📥 Export CSV
      </button>
    </div>
  );
}

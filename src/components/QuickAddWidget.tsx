import { useState } from 'react';

interface QuickAddWidgetProps {
  onQuickAdd: (name: string, amount: number) => void;
}

export function QuickAddWidget({ onQuickAdd }: QuickAddWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;
    
    onQuickAdd(name, parseFloat(amount));
    setName('');
    setAmount('');
    setIsOpen(false);
  };
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 text-2xl z-50"
      >
        +
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-t-2xl md:rounded-lg shadow-lg p-6 w-full md:max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Quick Add</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Netflix"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-lg"
                autoFocus
              />
              
              <input
                type="number"
                placeholder="₹599"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-lg"
              />
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold text-lg"
              >
                Add Quick →
              </button>
              
              <p className="text-xs text-slate-500 text-center">
                Full details can be added later
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

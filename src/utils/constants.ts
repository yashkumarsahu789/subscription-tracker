export const SUBSCRIPTION_STATUSES = {
  active: { 
    label: 'Active', 
    color: 'bg-green-100 border-green-200', 
    textColor: 'text-green-700',
    icon: '🟢'
  },
  paused: { 
    label: 'Paused', 
    color: 'bg-gray-100 border-gray-200', 
    textColor: 'text-gray-700',
    icon: '⚫'
  },
  trial: { 
    label: 'Trial', 
    color: 'bg-blue-100 border-blue-200', 
    textColor: 'text-blue-700',
    icon: '🔵'
  },
  cancelled: { 
    label: 'Cancelled', 
    color: 'bg-red-100 border-red-200', 
    textColor: 'text-red-700',
    icon: '❌'
  },
};

export const SUBSCRIPTION_CATEGORIES = {
  entertainment: { label: 'Entertainment', icon: '🎬', color: 'bg-purple-100' },
  productivity: { label: 'Productivity', icon: '💼', color: 'bg-blue-100' },
  utilities: { label: 'Utilities', icon: '⚙️', color: 'bg-orange-100' },
  health: { label: 'Health', icon: '🏥', color: 'bg-red-100' },
  other: { label: 'Other', icon: '📦', color: 'bg-gray-100' },
};

export const BILLING_METHODS = {
  credit_card: { label: 'Credit Card', icon: '💳' },
  debit_card: { label: 'Debit Card', icon: '💳' },
  upi: { label: 'UPI', icon: '📱' },
  net_banking: { label: 'Net Banking', icon: '🏦' },
};

import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function NotificationSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('notificationsEnabled', false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const handleToggleNotifications = async () => {
    if (!('Notification' in window)) {
      alert('Notifications are not supported by your browser');
      return;
    }

    if (permission === 'granted') {
      setNotificationsEnabled(false);
    } else {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        setNotificationsEnabled(true);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 md:p-6 w-full max-w-xs md:max-w-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex flex-col text-left">
          <span className="text-sm font-medium text-slate-700">Notifications</span>
          <span className="text-xs text-slate-500">Reminders for subscriptions</span>
        </div>
        <button
          onClick={handleToggleNotifications}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 ease-in-out ${
            notificationsEnabled ? 'bg-indigo-600' : 'bg-slate-300'
          }`}
          aria-label={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
              notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

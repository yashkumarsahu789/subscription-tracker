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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Notification Settings</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-700">Browser Notifications</p>
          <p className="text-sm text-slate-500">Get reminders for upcoming subscriptions</p>
        </div>
        <button
          onClick={handleToggleNotifications}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 ease-in-out ${
            notificationsEnabled ? 'bg-indigo-600' : 'bg-slate-300'
          }`}
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

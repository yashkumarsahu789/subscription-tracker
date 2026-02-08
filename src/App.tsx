import { useState, useEffect, useRef } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Custom Google Sign-in Modal (Professional style)
function FirebaseAuthModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo and branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Welcome Back</h2>
          <p className="text-slate-600 text-center mb-1">Sign in to manage your subscriptions</p>
          <p className="text-sm text-slate-500 text-center max-w-sm">Track all your recurring payments in one secure place. Free and always private.</p>
        </div>

        {/* Sign in button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base shadow-md border-2 border-slate-200 hover:border-slate-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            'Continue with Google'
          )}
        </button>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy. Your data is encrypted and secure.
          </p>
        </div>
      </div>
    </div>
  );
}
import { Subscription } from './types/subscription';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { SubscriptionForm } from './components/SubscriptionForm';
import { SubscriptionCard } from './components/SubscriptionCard';
import { DashboardStats } from './dashboard/DashboardStats';
import { ExportData } from './components/ExportData';
import { QuickAddWidget } from './components/QuickAddWidget';
import { FilterBar } from './components/FilterBar';
// import { NotificationSettings } from './dashboard/NotificationSettings';
import { parseISO, differenceInDays } from 'date-fns';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NotificationPrompt } from './components/NotificationPrompt';

export function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'overdue'>('all');
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignupMessage, setShowSignupMessage] = useState(false);
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState(false);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('App is online');
      // Sync pending subscriptions
      syncPendingSubscriptions();
    };
    const handleOffline = () => {
      setIsOnline(false);
      console.log('App is offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [user]);

  // Sync pending subscriptions from localStorage to Firestore
  const syncPendingSubscriptions = async () => {
    if (!user || !isOnline) return;
    
    const pending = localStorage.getItem('pendingSubscriptions');
    if (!pending) return;

    try {
      const pendingSubs: Subscription[] = JSON.parse(pending);
      if (pendingSubs.length === 0) return;

      console.log('Syncing pending subscriptions:', pendingSubs.length);
      setPendingSync(true);

      const docRef = doc(db, 'subscriptions', user.uid);
      const docSnap = await getDoc(docRef);
      const existing = docSnap.exists() ? (docSnap.data().subscriptions || []) : [];
      
      // Merge pending subscriptions with existing ones
      const updated = [...existing, ...pendingSubs];
      await setDoc(docRef, { subscriptions: updated }, { merge: true });
      
      setSubscriptions(updated);
      localStorage.removeItem('pendingSubscriptions');
      console.log('Sync complete!');
    } catch (error) {
      console.error('Error syncing pending subscriptions:', error);
    } finally {
      setPendingSync(false);
    }
  };

  // Auth state listener with auto-save cached data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        setShowSignup(false);
        
        // Auto-save cached draft subscription when user signs in
        const cachedDraft = localStorage.getItem('draftSubscription');
        if (cachedDraft) {
          try {
            const draftData = JSON.parse(cachedDraft);
            const newSubscription: Subscription = {
              ...draftData,
              id: crypto.randomUUID(),
            };
            const docRef = doc(db, 'subscriptions', currentUser.uid);
            const docSnap = await getDoc(docRef);
            const updated = docSnap.exists()
              ? [...(docSnap.data().subscriptions || []), newSubscription]
              : [newSubscription];
            await setDoc(docRef, { subscriptions: updated });
            localStorage.removeItem('draftSubscription');
            console.log('Cached subscription saved successfully!');
          } catch (err) {
            console.error('Error saving cached subscription:', err);
          }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch subscriptions from Firestore
  useEffect(() => {
    if (!user) {
      setSubscriptions([]);
      return;
    }

    const docRef = doc(db, 'subscriptions', user.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setSubscriptions(docSnap.data().subscriptions || []);
      } else {
        setSubscriptions([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Apply filters
  useEffect(() => {
    let filtered = subscriptions;

    // Search filter
    if (searchFilters.search) {
      filtered = filtered.filter((sub) =>
        sub.name.toLowerCase().includes(searchFilters.search.toLowerCase())
      );
    }

    // Category filter
    if (searchFilters.category !== 'all') {
      filtered = filtered.filter((sub) => sub.category === searchFilters.category);
    }

    // Status filter
    if (searchFilters.status !== 'all') {
      filtered = filtered.filter((sub) => sub.status === searchFilters.status);
    }

    // Date filter
    if (filter === 'upcoming') {
      filtered = filtered.filter((sub) => {
        const daysUntil = differenceInDays(parseISO(sub.nextDate), new Date());
        return daysUntil >= 0 && daysUntil <= 7;
      });
    } else if (filter === 'overdue') {
      filtered = filtered.filter((sub) => {
        const daysUntil = differenceInDays(parseISO(sub.nextDate), new Date());
        return daysUntil < 0;
      });
    }

    setFilteredSubscriptions(filtered);
  }, [subscriptions, filter, searchFilters]);

  // Notification reminders
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const checkReminders = () => {
        subscriptions.forEach((sub) => {
          const daysUntil = differenceInDays(parseISO(sub.nextDate), new Date());
          if (daysUntil === 1) {
            new Notification('Subscription Reminder', {
              body: `${sub.name} will be billed tomorrow for ₹${sub.amount.toLocaleString()}`,
              icon: '/logo.png',
            });
          } else if (daysUntil === 0) {
            new Notification('Subscription Due Today', {
              body: `${sub.name} is being billed today for ₹${sub.amount.toLocaleString()}`,
              icon: '/logo.png',
            });
          } else if (daysUntil < 0) {
            new Notification('Subscription Overdue', {
              body: `${sub.name} is overdue by ${Math.abs(daysUntil)} days (₹${sub.amount.toLocaleString()})`,
              icon: '/logo.png',
            });
          }
        });
      };

      checkReminders();
      const interval = setInterval(checkReminders, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [subscriptions]);

  // Request notification permissions
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        // Already granted
        new Notification('Notifications Enabled! 🎉', {
          body: 'You will now receive payment reminders for your subscriptions.',
          icon: '/logo.png',
        });
        setShowNotificationPrompt(false);
      } else if (Notification.permission !== 'denied') {
        try {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            new Notification('Notifications Enabled! 🎉', {
              body: 'You will now receive payment reminders for your subscriptions.',
              icon: '/logo.png',
            });
            setShowNotificationPrompt(false);
          }
        } catch (err) {
          console.error('Error requesting notification permission:', err);
        }
      }
    } else {
      alert('Your browser does not support notifications');
    }
  };

  // Handlers
  const handleAddSubscription = async (subscription: Omit<Subscription, 'id' | 'createdAt'>) => {
    try {
      if (!user) {
        // Cache the subscription data before showing signup
        localStorage.setItem('draftSubscription', JSON.stringify(subscription));
        setShowSignup(true);
        return;
      }

      const newSubscription: Subscription = {
        ...subscription,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };

      console.log('Adding subscription:', newSubscription);

      // Check if online
      if (!navigator.onLine) {
        console.log('Offline: Saving to localStorage for later sync');
        
        // Save to localStorage for later sync
        const pending = localStorage.getItem('pendingSubscriptions');
        const pendingList = pending ? JSON.parse(pending) : [];
        pendingList.push(newSubscription);
        localStorage.setItem('pendingSubscriptions', JSON.stringify(pendingList));
        
        // Update local state immediately
        const updated = [...subscriptions, newSubscription];
        setSubscriptions(updated);
        
        // Clear draft
        localStorage.removeItem('draftSubscription');
        
        // Saved offline; will sync when connection is restored (no blocking alert)
        console.log('Subscription saved offline; queued for sync.');
        return;
      }

      const docRef = doc(db, 'subscriptions', user.uid);
      const docSnap = await getDoc(docRef);
      const updated = docSnap.exists()
        ? [...(docSnap.data().subscriptions || []), newSubscription]
        : [newSubscription];

      await setDoc(docRef, { subscriptions: updated }, { merge: true });
      
      // Update local state immediately
      setSubscriptions(updated);
      
      // Clear any cached draft after successful save
      localStorage.removeItem('draftSubscription');
      
      console.log('Subscription added successfully');

      // Show notification prompt
      if ('Notification' in window && Notification.permission !== 'granted') {
        setShowNotificationPrompt(true);
      }
    } catch (error: any) {
      console.error('Error adding subscription:', error);
      
      // If offline error, save to localStorage
      if (error?.message?.includes('offline') || error?.code === 'unavailable') {
        console.log('Detected offline error, saving to localStorage');
        
        const newSubscription: Subscription = {
          ...subscription,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        
        // Save to localStorage for later sync
        const pending = localStorage.getItem('pendingSubscriptions');
        const pendingList = pending ? JSON.parse(pending) : [];
        pendingList.push(newSubscription);
        localStorage.setItem('pendingSubscriptions', JSON.stringify(pendingList));
        
        // Update local state immediately
        const updated = [...subscriptions, newSubscription];
        setSubscriptions(updated);
        
        // Clear draft
        localStorage.removeItem('draftSubscription');
        
        // Saved locally due to offline error; will sync when connection is restored
        console.log('Offline save: subscription queued for later sync.');
      } else {
        alert(`Error saving subscription: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const handleQuickAdd = async (name: string) => {
    try {
      if (!user) {
        setShowSignup(true);
        return;
      }
      const newSubscription: Subscription = {
        id: crypto.randomUUID(),
        name,
        amount: 0,
        currency: 'INR',
        cycle: 'monthly',
        nextDate: new Date().toISOString().split('T')[0],
        category: 'other',
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      const docRef = doc(db, 'subscriptions', user.uid);
      const docSnap = await getDoc(docRef);
      const updated = docSnap.exists()
        ? [...(docSnap.data().subscriptions || []), newSubscription]
        : [newSubscription];
      await setDoc(docRef, { subscriptions: updated }, { merge: true });
      setSubscriptions(updated);
      console.log('Quick added subscription:', newSubscription);
    } catch (error) {
      console.error('Error quick adding subscription:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to add subscription'}`);
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    try {
      if (!user) return;
      const docRef = doc(db, 'subscriptions', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const updated = (docSnap.data().subscriptions || []).filter(
          (sub: Subscription) => sub.id !== id
        );
        await setDoc(docRef, { subscriptions: updated }, { merge: true });
        setSubscriptions(updated);
        console.log('Subscription deleted:', id);
      }
    } catch (error) {
      console.error('Error deleting subscription:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to delete subscription'}`);
    }
  };

  const handlePauseSubscription = async (id: string) => {
    try {
      if (!user) return;
      const docRef = doc(db, 'subscriptions', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const updated = (docSnap.data().subscriptions || []).map((sub: Subscription) =>
          sub.id === id ? { ...sub, status: 'paused' } : sub
        );
        await setDoc(docRef, { subscriptions: updated }, { merge: true });
        setSubscriptions(updated);
        console.log('Subscription paused:', id);
      }
    } catch (error) {
      console.error('Error pausing subscription:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to pause subscription'}`);
    }
  };

  const handleResumeSubscription = async (id: string) => {
    try {
      if (!user) return;
      const docRef = doc(db, 'subscriptions', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const updated = (docSnap.data().subscriptions || []).map((sub: Subscription) =>
          sub.id === id ? { ...sub, status: 'active' } : sub
        );
        await setDoc(docRef, { subscriptions: updated }, { merge: true });
        setSubscriptions(updated);
        console.log('Subscription resumed:', id);
      }
    } catch (error) {
      console.error('Error resuming subscription:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to resume subscription'}`);
    }
  };

  const handleMarkAsPaid = async (subscription: Subscription) => {
    try {
      if (!user) return;
      const { calculateNextBillingDate } = await import('./utils/dateCalculations');
      const newNextDate = calculateNextBillingDate(subscription.nextDate, subscription.cycle);
      const updatedSub = {
        ...subscription,
        lastPaidDate: new Date().toISOString().split('T')[0],
        nextDate: newNextDate,
      };
      
      const docRef = doc(db, 'subscriptions', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const updated = (docSnap.data().subscriptions || []).map((sub: Subscription) =>
          sub.id === subscription.id ? updatedSub : sub
        );
        await setDoc(docRef, { subscriptions: updated }, { merge: true });
        setSubscriptions(updated);
        console.log('Subscription marked as paid:', subscription.id);
      }
    } catch (error) {
      console.error('Error marking subscription as paid:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to mark as paid'}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col from-slate-50 via-white to-zinc-100 p-4 md:p-8">
      {/* Google Sign-in Modal */}
      {showSignup && <FirebaseAuthModal onClose={() => setShowSignup(false)} />}
      {/* Notification Permission Prompt */}
      {showNotificationPrompt && (
        <NotificationPrompt 
          onEnable={requestNotificationPermission}
          onDismiss={() => setShowNotificationPrompt(false)}
        />
      )}
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <Header 
          user={user} 
          onLogout={async () => { await signOut(auth); }}
          onSignupClick={() => setShowSignup(true)}
          isOnline={isOnline}
          pendingSync={pendingSync}
        />
        <main className="flex-1">\n          {loading ? (
            <div className="text-center py-12 text-slate-500">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {user && (
                  <div className="lg:col-span-2 space-y-6">
                    <DashboardStats subscriptions={subscriptions} />
                    <FilterBar 
                      onFilterChange={setSearchFilters}
                    />
                    <div className="flex justify-end mb-4">
                      <ExportData subscriptions={subscriptions} />
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-slate-900">My Subscriptions</h2>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setFilter('all')}
                            className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            All
                          </button>
                          <button
                            onClick={() => setFilter('upcoming')}
                            className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              filter === 'upcoming' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            Upcoming
                          </button>
                          <button
                            onClick={() => setFilter('overdue')}
                            className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              filter === 'overdue' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            Overdue
                          </button>
                        </div>
                      </div>
                      {filteredSubscriptions.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                          <p className="text-lg">No subscriptions found</p>
                          <p className="text-sm mt-2">Add your first subscription to get started</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredSubscriptions.map((sub) => (
                            <SubscriptionCard
                              key={sub.id}
                              subscription={sub}
                              onDelete={handleDeleteSubscription}
                              onPause={handlePauseSubscription}
                              onResume={handleResumeSubscription}
                              onMarkAsPaid={handleMarkAsPaid}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className={user ? "space-y-6" : "lg:col-span-3 max-w-2xl mx-auto w-full space-y-6"}>
                  <SubscriptionForm onSubmit={handleAddSubscription} user={user} />
                </div>
              </div>
              {user && <QuickAddWidget onQuickAdd={handleQuickAdd} />}
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

# ⚠️ TUMHE YE KARNA PADEGA (Manual Steps)

## 1. FIREBASE CONSOLE SETUP (5 min)
**Link:** https://console.firebase.google.com/

### Firestore Rules Update:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /subscriptions/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 2. GOOGLE SEARCH CONSOLE (10 min)
**Link:** https://search.google.com/search-console

1. Add Property → Enter your domain
2. Verify ownership (HTML file upload ya meta tag)
3. Submit sitemap: `https://yoursite.com/sitemap.xml`

## 3. COMPONENTS UPDATE KARNA HAI
**Ye files manually update karo:**

### App.tsx mein add karo:
```typescript
import { ExportData } from './components/ExportData';
import { QuickAddWidget } from './components/QuickAddWidget';

// Use karo:
<ExportData subscriptions={subscriptions} />
<QuickAddWidget onQuickAdd={handleQuickAdd} />
```

### DashboardStats.tsx mein replace karo:
- Import: `import { calculateNormalizedMonthly, formatCurrency } from '../utils/currency';`
- Update calculations with new functions

### SubscriptionCard.tsx mein add karo:
- Import constants
- Show category icons
- Show currency symbols with `formatCurrency()`

## 4. DARK MODE (Optional)
Tailwind config mein add karo:
```js
darkMode: 'class'
```

## 5. BLOG/LANDING PAGES (SEO ke liye)
Create karo:
- `src/pages/Landing.tsx`
- `src/pages/blog/HowToCancelNetflix.tsx`

## 6. TESTING
```bash
npm run dev
```

Check karo:
- ✅ New subscription add ho rahi hai
- ✅ Export CSV kaam kar raha hai
- ✅ Quick Add button dikhai de raha hai
- ✅ Offline persistence check karo (network off karke)

## 7. DEPLOY
```bash
npm run build
firebase deploy
```

---

## IMPLEMENTED (Already Done ✅)
- ✅ Updated types (currency, status, category support)
- ✅ Currency converter utility
- ✅ Date calculations (mark as paid logic)
- ✅ Constants (statuses, categories)
- ✅ TrialCountdown component
- ✅ ExportData component (CSV)
- ✅ QuickAddWidget component
- ✅ Firebase offline persistence
- ✅ Updated robots.txt
- ✅ Updated sitemap.xml
- ✅ Package.json dependencies

## NOT DONE (Need Manual Work ❌)
- ❌ Firebase Console rules update
- ❌ Component integration in App.tsx
- ❌ DashboardStats calculations update
- ❌ SubscriptionForm new fields
- ❌ SubscriptionCard UI update
- ❌ Dark mode setup
- ❌ Blog/landing pages
- ❌ Google Search Console
- ❌ Meta tags in index.html

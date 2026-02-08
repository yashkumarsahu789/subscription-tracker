export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
      <div>
        &copy; {new Date().getFullYear()} Subscription Tracker. All rights reserved.
      </div>
      <div className="mt-2">
        <a href="/privacy-policy.html" className="hover:underline mr-4" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <a href="/terms-and-conditions.html" className="hover:underline" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
      </div>
    </footer>
  );
}

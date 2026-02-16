export function HomePage({ onSignupClick }: { onSignupClick: () => void }) {
  const features = [
    { icon: '💱', title: 'Multi-currency Support', desc: 'Track subscriptions in INR, USD, EUR, GBP, AUD, CAD' },
    { icon: '🔔', title: 'Smart Reminders', desc: 'Never miss a payment with automatic notifications' },
    { icon: '📤', title: 'Easy Export', desc: 'CSV and JSON export for budgeting & taxes' },
    { icon: '📊', title: 'Category Tracking', desc: 'Organize subscriptions by category & track spending' },
    { icon: '⏳', title: 'Trial Monitoring', desc: 'Track trial periods with countdown timers' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Google authentication, zero data selling' },
    { icon: '📱', title: 'Real-time Sync', desc: 'Seamless sync across all your devices' },
    { icon: '⚡', title: 'Offline Access', desc: 'Access your data even without internet' },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Never Miss a Payment Again
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
            Manage all your subscriptions, bills, and recurring payments in one secure place. Track, organize, and save money effortlessly.
          </p>
          <button
            onClick={onSignupClick}
            className="inline-block px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started Free
          </button>
          <p className="text-sm text-slate-500 mt-4">No credit card required • Takes 30 seconds</p>
        </div>
      </section>

      {/* Why Use Section */}
      <section className="py-12 md:py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Why Use Subscription Tracker?</h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-4">
            <p className="text-slate-700 leading-relaxed">
              Managing multiple subscriptions and recurring payments can be overwhelming. With the rise of streaming services like Netflix, Spotify, and Amazon Prime, as well as SaaS tools and utility bills, it's easy to lose track of what you're paying for each month.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Subscription Tracker</strong> is a free, easy-to-use app designed to help you organize, monitor, and optimize all your subscriptions in one place.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Track bills in multiple currencies, set up automatic payment reminders, and export your data for budgeting or tax purposes. Whether you're managing personal expenses or business SaaS subscriptions, Subscription Tracker ensures you never miss an auto-debit date or pay for services you no longer use.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Start Taking Control Today</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Never Miss a Payment</h3>
                <p className="text-slate-600">Get automatic reminders before each payment is due</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Identify Unused Services</h3>
                <p className="text-slate-600">Easily spot subscriptions you forgot about and cancel them</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Save Money</h3>
                <p className="text-slate-600">Track spending by category and find opportunities to save</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Complete Visibility</h3>
                <p className="text-slate-600">See all your recurring expenses at a glance, anytime, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Free Forever. No Hidden Fees.
          </h2>
          <p className="text-slate-600 mb-8">
            <strong>Subscription Tracker</strong> is your all-in-one solution for subscription management, bill tracking, and payment reminders. Start tracking your subscriptions today and take control of your finances.
          </p>
          <button
            onClick={onSignupClick}
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Tracking Now →
          </button>
          <p className="text-xs text-slate-500 mt-4">
            References: <a href="https://en.wikipedia.org/wiki/Subscription_business_model" target="_blank" rel="noopener nofollow" className="text-indigo-600 hover:underline">Subscription Business Model (Wikipedia)</a>
          </p>
        </div>
      </section>
    </div>
  );
}

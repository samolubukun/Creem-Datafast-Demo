'use client';

import { useState } from 'react';

const s = {
  main: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
    background: 'radial-gradient(circle at 0% 0%, rgba(16,185,129,0.05) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(99,102,241,0.05) 0%, transparent 50%)'
  },
  card: {
    maxWidth: 800, width: '100%', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '3rem', boxSizing: 'border-box' as const, textAlign: 'center' as const, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)',
    animation: 'fadeIn 0.8s ease-out'
  },
  h1: { fontSize: '3.5rem', fontWeight: 700, marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  desc: { fontSize: '1.25rem', color: '#9ca3af', marginBottom: '2.5rem', maxWidth: 600, marginInline: 'auto' },
  btn: (loading: boolean) => ({
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: loading ? '#4b5563' : '#10b981', color: '#fff', border: 'none', borderRadius: 12, padding: '1rem 2rem', fontSize: '1.125rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 14px rgba(16,185,129,0.39)'
  }),
  badge: { display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(16,185,129,0.1)', color: '#10b981', borderRadius: 100, fontSize: '0.875rem', marginBottom: '1.5rem', border: '1px solid rgba(16,185,129,0.2)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '3rem', textAlign: 'left' as const },
  item: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: 16 },
  itemTitle: { fontWeight: 600, marginBottom: '0.5rem', color: '#fff' },
  itemText: { fontSize: '0.875rem', color: '#9ca3af' },
  footer: { marginTop: '3rem', fontSize: '0.875rem', color: '#9ca3af', display: 'flex', gap: '2rem', justifyContent: 'center' },
  error: { marginTop: '1.5rem', color: '#ef4444', fontSize: '0.875rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid rgba(239, 68, 68, 0.2)' }
};

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const data = await resp.json();
      if (!resp.ok || !data.checkoutUrl) throw new Error(data.error ?? 'Failed to create checkout.');
      window.location.href = data.checkoutUrl;
    } catch (err) { setError(err instanceof Error ? err.message : 'Checkout error.'); } finally { setLoading(false); }
  }

  return (
    <main style={s.main}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div style={s.card}>
        <span style={s.badge}>New Integration Ready</span>
        <h1 style={s.h1}>Creem + DataFast</h1>
        <p style={s.desc}>Elevate your payment experience with seamless checkout sessions. Secure, fast, and attributed.</p>
        <button type="button" onClick={startCheckout} disabled={loading} style={s.btn(loading)}>{loading ? 'Processing...' : 'Buy with Creem'}</button>
        {error && <div style={s.error}>{error}</div>}
        <div style={s.grid}>
          <div style={s.item}><div style={s.itemTitle}>Fast Checkout</div><div style={s.itemText}>Redirect to a secure Creem checkout page in seconds.</div></div>
          <div style={s.item}><div style={s.itemTitle}>DataFast Attribution</div><div style={s.itemText}>Seamlessly track conversions with built-in attribution.</div></div>
          <div style={s.item}><div style={s.itemTitle}>Webhook Ready</div><div style={s.itemText}>Automated fulfillment via /api/webhook/creem.</div></div>
        </div>
        <div style={s.footer}><span>Success: /payment/success</span><span>Security: SSL Encrypted</span></div>
      </div>
    </main>
  );
}

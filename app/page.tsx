'use client';

import { useState } from 'react';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = (await response.json()) as { checkoutUrl?: string; error?: string };

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error ?? 'Failed to create checkout.');
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected checkout error.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main-container">
      <div className="bg-blur">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="hero-card">
        <span className="badge">New Integration Ready</span>
        <h1>Creem + DataFast</h1>
        <p className="description">
          Elevate your payment experience with seamless checkout sessions, 
          powered by <code>creem-datafast-integration</code>. Secure, fast, and attributed.
        </p>

        <button
          type="button"
          onClick={startCheckout}
          disabled={loading}
          className="checkout-button"
        >
          {loading ? 'Processing...' : 'Buy with Creem'}
        </button>

        {error ? <div className="error-msg">{error}</div> : null}

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-title">Fast Checkout</div>
            <div className="feature-text">Redirect to a secure Creem checkout page in seconds.</div>
          </div>
          <div className="feature-item">
            <div className="feature-title">DataFast Attribution</div>
            <div className="feature-text">Seamlessly track your conversions with built-in attribution.</div>
          </div>
          <div className="feature-item">
            <div className="feature-title">Webhook Ready</div>
            <div className="feature-text">Automated fulfillment via <code>/api/webhook/creem</code>.</div>
          </div>
        </div>

        <div className="footer-info">
          <span>Success: <code>/payment/success</code></span>
          <span>Security: SSL Encrypted</span>
        </div>
      </div>
    </main>
  );
}

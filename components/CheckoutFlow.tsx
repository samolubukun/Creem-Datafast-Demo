'use client';

import { useState, useEffect, useRef } from 'react';

interface TrackingData {
  visitorId: string | null;
  sessionId: string | null;
}

interface CheckoutTrace {
  visitor: 'pending' | 'captured' | 'confirmed';
  checkout: 'preparing' | 'ready' | 'success';
  webhook: 'waiting' | 'received' | 'processed';
  revenue: 'waiting' | 'attributed';
}

const styles = {
  container: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: '1.5rem',
    marginTop: '1.5rem',
  },
  header: {
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '0.25rem',
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#9ca3af',
  },
  checkoutCard: {
    background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(99,102,241,0.08) 100%)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: 16,
    padding: '2rem',
    textAlign: 'center' as const,
    marginBottom: '1.5rem',
  },
  productName: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '0.5rem',
  },
  price: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '1.5rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  primaryBtn: (loading: boolean) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    background: loading ? '#4b5563' : '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
  }),
  secondaryBtn: (loading: boolean) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    background: 'transparent',
    color: '#9ca3af',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: '1rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }),
  traceSection: {
    marginTop: '1.5rem',
  },
  traceTitle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '1rem',
  },
  traceSteps: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  traceStep: (active: boolean, status: string) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1rem',
    background: active ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${active ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 10,
    transition: 'all 0.3s ease',
  }),
  stepDot: (status: string) => {
    const colors: Record<string, string> = {
      pending: '#6b7280',
      captured: '#fbbf24',
      confirmed: '#10b981',
      preparing: '#6b7280',
      ready: '#fbbf24',
      success: '#10b981',
      waiting: '#6b7280',
      received: '#fbbf24',
      processed: '#10b981',
      attributed: '#10b981',
    };
    return {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: colors[status] || '#6b7280',
      flexShrink: 0,
    };
  },
  stepLabel: {
    flex: 1,
    fontSize: '0.875rem',
    color: '#fff',
  },
  stepStatus: (status: string) => {
    const statusColors: Record<string, { bg: string; color: string }> = {
      pending: { bg: 'rgba(107,114,128,0.15)', color: '#9ca3af' },
      captured: { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' },
      confirmed: { bg: 'rgba(16,185,129,0.15)', color: '#10b981' },
      preparing: { bg: 'rgba(107,114,128,0.15)', color: '#9ca3af' },
      ready: { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' },
      success: { bg: 'rgba(16,185,129,0.15)', color: '#10b981' },
      waiting: { bg: 'rgba(107,114,128,0.15)', color: '#9ca3af' },
      received: { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' },
      processed: { bg: 'rgba(16,185,129,0.15)', color: '#10b981' },
      attributed: { bg: 'rgba(16,185,129,0.15)', color: '#10b981' },
    };
    const style = statusColors[status] || statusColors.pending;
    return {
      padding: '0.25rem 0.625rem',
      borderRadius: 6,
      fontSize: '0.75rem',
      fontWeight: 500,
      background: style.bg,
      color: style.color,
      textTransform: 'capitalize' as const,
    };
  },
  error: {
    marginTop: '1rem',
    color: '#ef4444',
    fontSize: '0.875rem',
    background: 'rgba(239,68,68,0.1)',
    padding: '0.75rem 1rem',
    borderRadius: 8,
  },
};

function getTracking(): TrackingData {
  if (typeof document === 'undefined') return { visitorId: null, sessionId: null };
  const cookies = document.cookie.split(';');
  let visitorId: string | null = null;
  let sessionId: string | null = null;
  for (const cookie of cookies) {
    const [name, ...valueParts] = cookie.trim().split('=');
    if (name === 'datafast_visitor_id') visitorId = valueParts.join('=') || null;
    if (name === 'datafast_session_id') sessionId = valueParts.join('=') || null;
  }
  return { visitorId, sessionId };
}

export function CheckoutFlow() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trace, setTrace] = useState<CheckoutTrace>({
    visitor: 'pending',
    checkout: 'preparing',
    webhook: 'waiting',
    revenue: 'waiting',
  });
  const [tracking, setTracking] = useState<TrackingData>({ visitorId: null, sessionId: null });
  const checkInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateTracking = () => {
      const t = getTracking();
      setTracking(t);
      if (t.visitorId) {
        setTrace(prev => ({
          ...prev,
          visitor: 'confirmed',
          checkout: 'ready',
        }));
      }
    };

    updateTracking();
    checkInterval.current = setInterval(updateTracking, 500);

    return () => {
      if (checkInterval.current) clearInterval(checkInterval.current);
    };
  }, []);

  const handleServerCheckout = async () => {
    setLoading(true);
    setError(null);
    setTrace(prev => ({ ...prev, checkout: 'preparing' }));

    try {
      const resp = await fetch('/api/checkout', { method: 'POST' });
      const data = await resp.json();
      if (!resp.ok || !data.checkoutUrl) throw new Error(data.error || 'Checkout failed');
      
      setTrace(prev => ({ ...prev, checkout: 'ready' }));
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout error');
    } finally {
      setLoading(false);
    }
  };

  const handleHostedCheckout = () => {
    const { visitorId, sessionId } = tracking;
    const productId = 'prod_your_product_id'; 
    let url = 'https://creem.io/payment/' + productId;
    if (visitorId) url += `?datafast_visitor_id=${visitorId}`;
    if (sessionId) url += `&datafast_session_id=${sessionId}`;
    window.location.href = url;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>Checkout Flow</div>
        <div style={styles.subtitle}>Test DataFast attribution end-to-end</div>
      </div>

      <div style={styles.checkoutCard}>
        <div style={styles.productName}>Demo Product</div>
        <div style={styles.price}>$10.00</div>
        <div style={styles.buttonGroup}>
          <button
            onClick={handleServerCheckout}
            disabled={loading}
            style={styles.primaryBtn(loading)}
          >
            {loading ? 'Processing...' : 'Server Checkout'}
          </button>
          <button
            onClick={handleHostedCheckout}
            disabled={!tracking.visitorId}
            style={styles.secondaryBtn(!tracking.visitorId)}
          >
            Open Hosted Link
          </button>
        </div>
        {error && <div style={styles.error}>{error}</div>}
      </div>

      <div style={styles.traceSection}>
        <div style={styles.traceTitle}>Live Trace</div>
        <div style={styles.traceSteps}>
          <div style={styles.traceStep(!!tracking.visitorId, trace.visitor)}>
            <span style={styles.stepDot(trace.visitor)} />
            <span style={styles.stepLabel}>Visitor ID</span>
            <span style={styles.stepStatus(trace.visitor)}>
              {trace.visitor === 'confirmed' ? 'captured' : 'pending'}
            </span>
          </div>
          <div style={styles.traceStep(trace.checkout !== 'preparing', trace.checkout)}>
            <span style={styles.stepDot(trace.checkout)} />
            <span style={styles.stepLabel}>Checkout</span>
            <span style={styles.stepStatus(trace.checkout)}>{trace.checkout}</span>
          </div>
          <div style={styles.traceStep(trace.webhook !== 'waiting', trace.webhook)}>
            <span style={styles.stepDot(trace.webhook)} />
            <span style={styles.stepLabel}>Webhook</span>
            <span style={styles.stepStatus(trace.webhook)}>{trace.webhook}</span>
          </div>
          <div style={styles.traceStep(trace.revenue !== 'waiting', trace.revenue)}>
            <span style={styles.stepDot(trace.revenue)} />
            <span style={styles.stepLabel}>Revenue</span>
            <span style={styles.stepStatus(trace.revenue)}>{trace.revenue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
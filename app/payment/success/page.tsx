'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

export const dynamic = 'force-dynamic';

export default function PaymentSuccessPage() {
  const [tracking, setTracking] = useState<{ visitorId: string | null; sessionId: string | null }>({ visitorId: null, sessionId: null });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const vid = params.get('datafast_visitor_id');
    const sid = params.get('datafast_session_id');
    
    const cookies = document.cookie.split(';');
    let cookieVid: string | null = null;
    let cookieSid: string | null = null;
    for (const cookie of cookies) {
      const [name, ...valueParts] = cookie.trim().split('=');
      if (name === 'datafast_visitor_id') cookieVid = valueParts.join('=') || null;
      if (name === 'datafast_session_id') cookieSid = valueParts.join('=') || null;
    }
    
    setTracking({
      visitorId: vid || cookieVid,
      sessionId: sid || cookieSid,
    });
  }, []);

  const styles: Record<string, CSSProperties> = {
    main: { minHeight: '100vh', padding: '4rem 2rem', background: 'radial-gradient(circle at 0% 0%, rgba(16,185,129,0.08) 0%, transparent 40%), #030712' },
    card: { maxWidth: 600, margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '3rem' },
    icon: { width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '2.5rem' },
    title: { fontSize: '2rem', fontWeight: 700, color: '#fff', textAlign: 'center' },
    subtitle: { fontSize: '1.125rem', color: '#9ca3af', textAlign: 'center', marginBottom: '2rem' },
    attributionBox: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '1.5rem', marginTop: '1.5rem' },
    attributionTitle: { fontSize: '0.875rem', fontWeight: 600, color: '#fff', marginBottom: '1rem' },
    attributionItem: { display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    label: { color: '#9ca3af', fontSize: '0.875rem' },
    value: { color: '#fff', fontSize: '0.875rem', fontFamily: 'monospace' },
    backBtn: { display: 'block', marginTop: '2rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: 12, padding: '1rem 2rem', fontSize: '1rem', fontWeight: 600, textAlign: 'center', textDecoration: 'none' },
  };

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <div style={styles.icon}>✓</div>
        <h1 style={styles.title}>Payment Successful!</h1>
        <p style={styles.subtitle}>Thanks for your purchase. Your transaction has been recorded and attributed to your DataFast visitor profile.</p>
        {tracking.visitorId && (
          <div style={styles.attributionBox}>
            <div style={styles.attributionTitle}>Attribution Data</div>
            <div style={styles.attributionItem}><span style={styles.label}>Visitor ID</span><span style={styles.value}>{tracking.visitorId}</span></div>
            <div style={styles.attributionItem}><span style={styles.label}>Session ID</span><span style={styles.value}>{tracking.sessionId || 'N/A'}</span></div>
            <div style={styles.attributionItem}><span style={styles.label}>Status</span><span style={{...styles.value, color: '#10b981'}}>Attributed</span></div>
          </div>
        )}
        <a href="/" style={styles.backBtn}>Back to Demo</a>
      </div>
    </main>
  );
}
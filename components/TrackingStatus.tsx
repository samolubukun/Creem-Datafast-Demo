'use client';

import { useState, useEffect } from 'react';

interface TrackingData {
  visitorId: string | null;
  sessionId: string | null;
}

const styles = {
  container: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: '1.5rem',
    marginTop: '2rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#fff',
  },
  statusBadge: (ready: boolean) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '0.25rem 0.75rem',
    background: ready ? 'rgba(16,185,129,0.15)' : 'rgba(251,191,36,0.15)',
    color: ready ? '#10b981' : '#fbbf24',
    borderRadius: 100,
    fontSize: '0.75rem',
    fontWeight: 500,
  }),
  dot: (ready: boolean) => ({
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: ready ? '#10b981' : '#fbbf24',
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
  },
  item: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '1rem',
    borderRadius: 12,
  },
  label: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    marginBottom: '0.375rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  value: {
    fontSize: '0.875rem',
    color: '#fff',
    wordBreak: 'break-all' as const,
    fontFamily: 'monospace',
  },
  pending: {
    color: '#6b7280',
    fontStyle: 'italic',
    fontSize: '0.875rem',
  },
  meta: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap' as const,
  },
  metaItem: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
};

export function TrackingStatus() {
  const [tracking, setTracking] = useState<TrackingData>({ visitorId: null, sessionId: null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkTracking = () => {
      const cookies = document.cookie.split(';');
      let visitorId: string | null = null;
      let sessionId: string | null = null;

      for (const cookie of cookies) {
        const [name, ...valueParts] = cookie.trim().split('=');
        if (name === 'datafast_visitor_id') visitorId = valueParts.join('=') || null;
        if (name === 'datafast_session_id') sessionId = valueParts.join('=') || null;
      }

      setTracking({ visitorId, sessionId });
      setReady(!!visitorId);
    };

    checkTracking();
    const interval = setInterval(checkTracking, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>Live Tracking</span>
        <span style={styles.statusBadge(ready)}>
          <span style={styles.dot(ready)} />
          {ready ? 'Attribution Ready' : 'Warming Up'}
        </span>
      </div>
      <div style={styles.grid}>
        <div style={styles.item}>
          <div style={styles.label}>Visitor ID</div>
          <div style={tracking.visitorId ? styles.value : styles.pending}>
            {tracking.visitorId || 'Waiting for DataFast...'}
          </div>
        </div>
        <div style={styles.item}>
          <div style={styles.label}>Session ID</div>
          <div style={tracking.sessionId ? styles.value : styles.pending}>
            {tracking.sessionId || 'pending'}
          </div>
        </div>
      </div>
      <div style={styles.meta}>
        <span style={styles.metaItem}>Domain: {typeof window !== 'undefined' ? window.location.hostname : 'localhost'}</span>
        <span style={styles.metaItem}>Event Proxy: /api/events</span>
      </div>
    </div>
  );
}
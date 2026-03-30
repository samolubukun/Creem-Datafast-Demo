'use client';

import { useState, useEffect } from 'react';

interface PaymentEvent {
  id: string;
  datafast_visitor_id: string;
  datafast_session_id: string;
  amount: number;
  currency: string;
  transaction_id: string;
  timestamp: string;
  status: 'completed' | 'refunded';
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
  empty: {
    textAlign: 'center' as const,
    padding: '2rem 1rem',
    color: '#6b7280',
  },
  eventItem: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '1rem',
    borderRadius: 12,
    marginBottom: '0.75rem',
  },
  eventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  eventAmount: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#10b981',
  },
  eventStatus: (status: string) => ({
    padding: '0.125rem 0.5rem',
    borderRadius: 4,
    fontSize: '0.75rem',
    fontWeight: 500,
    background: status === 'completed' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
    color: status === 'completed' ? '#10b981' : '#ef4444',
  }),
  eventMeta: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem',
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
  label: {
    color: '#6b7280',
  },
};

export function RevenueFeed() {
  const [events, setEvents] = useState<PaymentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/payments')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setEvents(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>Revenue Feed</span>
        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
          {events.length} event{events.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {loading ? (
        <div style={styles.empty}>Loading...</div>
      ) : events.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ marginBottom: '0.5rem' }}>No payment events yet</p>
          <p style={{ fontSize: '0.875rem' }}>Complete a checkout to populate this feed</p>
        </div>
      ) : (
        events.map(event => (
          <div key={event.id} style={styles.eventItem}>
            <div style={styles.eventHeader}>
              <span style={styles.eventAmount}>
                {formatAmount(event.amount, event.currency)}
              </span>
              <span style={styles.eventStatus(event.status)}>
                {event.status}
              </span>
            </div>
            <div style={styles.eventMeta}>
              <div><span style={styles.label}>Visitor: </span>{event.datafast_visitor_id?.slice(0, 12)}...</div>
              <div><span style={styles.label}>Session: </span>{event.datafast_session_id?.slice(0, 12)}...</div>
              <div><span style={styles.label}>TX ID: </span>{event.transaction_id?.slice(0, 16)}...</div>
              <div><span style={styles.label}>Time: </span>{new Date(event.timestamp).toLocaleString()}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
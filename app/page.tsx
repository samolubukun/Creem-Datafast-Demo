'use client';

import { TrackingStatus } from '@/components/TrackingStatus';
import { CheckoutFlow } from '@/components/CheckoutFlow';
import { RevenueFeed } from '@/components/RevenueFeed';

const styles = {
  main: {
    minHeight: '100vh',
    padding: '2rem 1rem',
    background: 'radial-gradient(circle at 0% 0%, rgba(16,185,129,0.08) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(99,102,241,0.08) 0%, transparent 40%), #030712',
  },
  container: {
    maxWidth: 900,
    margin: '0 auto',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '3rem',
    animation: 'fadeIn 0.8s ease-out',
  },
  badge: {
    display: 'inline-block',
    padding: '0.375rem 1rem',
    background: 'rgba(16,185,129,0.12)',
    color: '#10b981',
    borderRadius: 100,
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '1rem',
    border: '1px solid rgba(16,185,129,0.25)',
  },
  title: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 700,
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #fff 0%, #a5b4fc 50%, #fff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% auto',
    animation: 'shimmer 3s linear infinite',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#9ca3af',
    maxWidth: 600,
    margin: '0 auto 2rem',
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  footer: {
    marginTop: '4rem',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap' as const,
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  link: {
    color: '#10b981',
    textDecoration: 'none',
  },
};

export default function HomePage() {
  return (
    <main style={styles.main}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { to { background-position: 200% center; } }
      `}</style>
      <div style={styles.container}>
        <header style={styles.header}>
          <span style={styles.badge}>Live Demo</span>
          <h1 style={styles.title}>CREEM × DataFast</h1>
          <p style={styles.subtitle}>
            Track revenue attribution automatically. No glue code. No manual tracking. 
            Just install and go.
          </p>
        </header>

        <div style={styles.grid}>
          <CheckoutFlow />
          <TrackingStatus />
          <RevenueFeed />
        </div>

        <footer style={styles.footer}>
          <span>Source: <a href="https://github.com/samolubukun/Creem-DataFast-Integration" target="_blank" rel="noopener" style={styles.link}>GitHub</a></span>
          <span>Success: /payment/success</span>
          <span>Webhook: /api/webhook/creem</span>
        </footer>
      </div>
    </main>
  );
}

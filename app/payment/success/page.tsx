export default function PaymentSuccessPage() {
  return (
    <main style={{ maxWidth: 720, margin: '64px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 34, marginBottom: 12 }}>Payment successful</h1>
      <p style={{ lineHeight: 1.6 }}>
        Thanks for your purchase. If webhooks are configured, this transaction will be forwarded to
        DataFast for attribution.
      </p>
      <p style={{ marginTop: 20 }}>
        <a href="/" style={{ color: '#0f766e' }}>
          Back to demo
        </a>
      </p>
    </main>
  );
}

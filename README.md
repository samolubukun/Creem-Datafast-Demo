# creem-datafast-demo

Next.js demo app for `creem-datafast-integration`.

## What it shows

- Create a Creem checkout with DataFast tracking attribution.
- Handle Creem webhooks and forward mapped payments to DataFast.
- End-to-end flow: product page -> checkout -> success page -> webhook.
- Live Tracking Inspector with visitor/session ID display.
- Checkout Flow with server checkout and hosted checkout options.
- Revenue Feed showing recent payment events.
- Same-origin `/api/events` proxy for DataFast tracking.

## Features

- **Live Tracking Status**: Real-time visitor ID and session ID display
- **Checkout Flow**: Server checkout and direct hosted checkout link support
- **Revenue Feed**: Live payment events from webhook processing
- **Attribution Ready**: Visual confirmation when DataFast tracking is active

## Environment variables

Create `.env.local` with:

```bash
CREEM_API_KEY=...
CREEM_WEBHOOK_SECRET=...
DATAFAST_API_KEY=...
CREEM_PRODUCT_ID=prod_xxx
NEXT_PUBLIC_DATAFAST_WEBSITE_ID=your_website_id
APP_URL=http://localhost:3000
```

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `POST /api/checkout` — creates checkout via `createCheckout`
- `POST /api/webhook/creem` — handles webhook via `createNextWebhookHandler`
- `POST /api/events` — DataFast events proxy (same-origin)
- `GET /api/payments` — Get stored payment events
- `POST /api/payments` — Store payment events (for demo)
- `GET /payment/success` — success landing page with attribution display

## Notes

- For local webhook testing, expose your app with ngrok and set the webhook URL in Creem.
- DataFast tracking script is automatically initialized in `app/layout.tsx`.
- The demo tracks payment events in memory for display in the Revenue Feed.

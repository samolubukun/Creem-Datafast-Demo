# creem-datafast-demo

Next.js demo app for `creem-datafast-integration`.

## What it shows

- Create a Creem checkout with DataFast tracking attribution.
- Handle Creem webhooks and forward mapped payments to DataFast.
- End-to-end flow: product page -> checkout -> success page -> webhook.

## Environment variables

Create `.env.local` with:

```bash
CREEM_API_KEY=...
CREEM_WEBHOOK_SECRET=...
DATAFAST_API_KEY=...
CREEM_PRODUCT_ID=...
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
- `GET /payment/success` — success landing page

## Notes

- For local webhook testing, expose your app with ngrok and set the webhook URL in Creem.
- DataFast tracking script is loaded in `app/layout.tsx`.

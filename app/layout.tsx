import type { Metadata } from 'next';
import Script from 'next/script';

import './globals.css';

export const metadata: Metadata = {
  title: 'Creem + DataFast Demo',
  description: 'Demo app for creem-datafast-integration checkout attribution and webhook forwarding.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteId = process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID;

  return (
    <html lang="en">
      <body>
        {websiteId && (
          <Script
            src={`https://cdn.datafa.st/tracking.js?id=${websiteId}`}
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}
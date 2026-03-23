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
  return (
    <html lang="en">
      <body>
        <Script src="https://cdn.datafa.st/tracking.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}

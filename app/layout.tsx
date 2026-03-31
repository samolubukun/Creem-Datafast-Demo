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
      <head>
        <Script
          defer
          data-website-id="dfid_K7bBs0D7GY2RF9K7Vm0o2"
          data-domain="creem-datafast-demo-wine.vercel.app"
          src="https://datafa.st/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
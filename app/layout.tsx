import type { Metadata } from 'next';

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src='https://cdn.datafa.st/tracking.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID || ''}');
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

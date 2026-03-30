import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    productId: process.env.CREEM_PRODUCT_ID || 'prod_xxx',
    datafastWebsiteId: process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID || '',
    datafastDomain: process.env.NEXT_PUBLIC_DATAFAST_DOMAIN || '',
  });
}
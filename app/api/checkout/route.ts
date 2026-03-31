import { NextResponse } from 'next/server';

import { getCreemDataFast } from '@/lib/creem-datafast';

export async function POST(request: Request) {
  try {
    const creemDataFast = getCreemDataFast();
    const url = request.url;
    const cookieHeader = request.headers.get('cookie') || '';
    
    const { checkoutUrl } = await creemDataFast.createCheckout(
      {
        productId: process.env.CREEM_PRODUCT_ID!,
        successUrl: `${process.env.APP_URL ?? new URL(url).origin}/payment/success`,
      },
      cookieHeader
    );

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create checkout.' },
      { status: 500 }
    );
  }
}